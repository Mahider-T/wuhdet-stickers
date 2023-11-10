const Order = require('../models/order');
const uploader = require('../utils/uploadOne');

const uploadmany = require('../utils/uploadMany');
const uploadMany = require('../utils/uploadMany');

const addStickersToDatabase = async (req, res) => {

    try {

        console.log(Object.keys(req.files));
        console.log(!req.files) // req.files returns true even when no image is uploaded! Why?
        if (req.files.length === 0) {
            return res.json({success: "False", message: "Please upload an image"})
        }

        let images = req.files;

        for (const image of images) {
            if (!image.mimetype.startsWith('image/')) {
              return res.json({ success: "False", message: "Only images are allowed" });
            }
          }
        let imageLinks = [];

        await uploadMany(req)
            .then((data) => {
                // console.log(data.length);
                // console.log(imageLinks.length);
                imageLinks = data;
                console.log(imageLinks.length);
                return res.json({success: "True", data: data})
            })
            .catch((error) => {
                return res.json({success: "False", message: error.message});
            });
        const {agentId} = req.body;
        const customerId = req.user.id;

        const newOrder = new Order ({
            customerId,
            agentId,
            stickers: imageLinks
        })

        newOrder.save();
        
        // return res.json({files: req.files});

    } catch(error) {
        return res.json({error: error.message});
    }
    // console.log(req.user);
    
} 

const addStickerForm = async (req, res) =>{
    res.render('addSticker');
}

const createOrder = async (req, res) => {
    try{
          // const customerId = req.user.Id; 
        let {customerId, agentId, stickers} = req.body;

        const newOrder = new Order({
            customerId,
            agentId,
            stickers
        });

        await newOrder.save();
        return res.status(200).json({success: 'True', data: newOrder});
    // let {stickers} = req.body;
    }catch(error) {
        res.status(500).json({
            error: error.message
        })
    }
  


}

module.exports = {addStickersToDatabase, addStickerForm, createOrder};

