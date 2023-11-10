const sticker = require('../models/sticker.js');
const Sticker = require('../models/sticker.js');
const { get } = require('../routes/stickers.router.js');
const uploadMany = require('../utils/uploadMany');

const uploadOne = require('../utils/uploadOne');


//Upload sticker to database
//stickers/uploadSticker
//admin

const uploadSticker = async(req,res) => {

    try{
        await uploadOne(req).then( async (url) => {

            // console.log(`The url is ${url.url}`);
            const newSticker = new Sticker({
                link : url.url,
                tag : req.body.tag,
                name: req.body.name
            })

            await newSticker.save();

            res.json({success: "True", data: newSticker});
        }).catch((error)=> {
            res.json({success: "False", error: error.message});
        })
    }catch(error) {
        res.json({error: error.message});
    }

    // let stickerUrls = [];

    // uploadMany(req).then((data) => {
    //     stickerUrls = data;

    //     return res.json({success: "True", data: data});
    // }).catch((error) => {
    //     return res.json({success: "False", error: error.message});
    // })



    // stickerUrls.forEach(sticker => {

    //     const newSticker = new Sticker({
    //         link: sticker,
    //         tag: req.body.tag,            
    //     })
        
    // }); 

}

//Get all stickers from database
//basic

const getAllStickers = async (req, res) => {
    
    try{
        const allTheLinks = await Sticker.find({})
        return res.render('home', {allTheLinks});
        return allTheLinks;
        // return res.json({success: "True", data: allTheLinks});
    }catch(error) {
        return res.json({success: "False", error: error.message});
        // return error;
    }

};

//Get stickers by tag
//basic

const getStickersByTag = async (req, res) =>{
    try{

        const {tag} = req.body;

        const stickersWithTag = await sticker.find({tag: {$in: tag}}, 'link');

        // console.log(stickersWithTag.length);

        return res.json({success: "True", data: stickersWithTag});
    }catch(error) {
        return res.json({success: "False", error: error.message});
    }
}

const getStickerById = async (req, res) => {
    try{
        const id = req.params.id;
        const result = await Sticker.findOne({_id: id})
        console.log(result)
        res.render('eachItem', {result: result});
    }catch(error){
        console.log(error)
        res.status(500).json({success: "False", error: error.message});
    }
}


// const homePage = (req, res) => {
//     return res.render('home', { getAllStickers })
// }

module.exports = {uploadSticker, getAllStickers, getStickersByTag, getStickerById};