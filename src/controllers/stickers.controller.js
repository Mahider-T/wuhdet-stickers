const sticker = require('../models/sticker.js');
const Sticker = require('../models/sticker.js');
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
                tag : req.body.tag
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
        const allTheLinks = await Sticker.find({}, 'link')
        return res.json({success: "True", data: allTheLinks});
    }catch(error) {
        return res.json({success: "False", error: error.message});
    }


}

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

module.exports = {uploadSticker, getAllStickers, getStickersByTag};