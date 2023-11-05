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
        await uploadMany(req)
            .then((data) => {
                data.data.foreach(imageLink => {
                    console.log(imageLink);
                })
                return res.json({success: "True", data: data})
            })
            .catch((error) => {
                return res.json({success: "False", message: error.message});
            })
        // return res.json({files: req.files});

    } catch(error) {
        return res.json({error: error.message});
    }
    // console.log(req.user);
    
} 

const addStickerForm = async (req, res) =>{
    res.render('addSticker');
}

module.exports = {addStickersToDatabase, addStickerForm};

