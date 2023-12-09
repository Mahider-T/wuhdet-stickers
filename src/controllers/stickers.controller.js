const Sticker = require('../models/sticker.js');
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

}

const getAllStickers = async (req, res) => {
    
    try{
        const allTheLinks = await Sticker.find({})
        return res.json({success: "True", data: allTheLinks});
    }catch(error) {
        return res.json({success: "False", error: error.message});
    }

};


const getStickersByTag = async (req, res) =>{
    try{

        const tag = req.params.tag;
        const stickersWithTag = await Sticker.find({tag: {$in: tag}});
        return res.render("eachGenre", { tag, stickersWithTag });

    }catch(error) {

        return res.json({success: "False", error: error.message});
    }
}

const getStickerById = async (req, res) => {
    try{

        const id = req.params.id;
        const result = await Sticker.findOne({_id: id})
        res.render('eachItem', {result: result, stickerParam : id});

    }catch(error){

        console.log(error)
        res.status(500).json({success: "False", error: error.message});
    }
}

// In the homepage
    //4 stickers from each tag should be displayed (featured)
    //below each region(divided by tag) there should be a see more button that shows 
    //the paginated list of all stickers in that given type or genre
//Get the most recent 4 stickers from each tag

const getFeaturedStickers = async(req, res) => {

    try{
        // const stickersWithTag = await Sticker.find({tag: {$in: tag}}, 'link');

        const fromComedy = await Sticker.find({tag: {$in: 'Comedy'}})
        .sort({createdAt: -1})
        .limit(4)

        const fromMusic = await Sticker.find({tag: {$in: 'Music'}})
        .sort({createdAt: -1})
        .limit(4)

        const fromQuote = await Sticker.find({tag: {$in: 'Quote'}})
        .sort({createdAt: -1})
        .limit(4)

        const fromReligion = await Sticker.find({tag: {$in: 'Religion'}})
        .sort({createdAt: -1})
        .limit(4)

        const fromCelebrity = await Sticker.find({tag: {$in: 'Celebrity'}})
        .sort({createdAt: -1})
        .limit(4)
        
        const fromTech = await Sticker.find({tag: {$in: 'Tech'}})
        .sort({createdAt: -1})
        .limit(4)

         res.render('home', {fromMusic, fromCelebrity, fromQuote, fromReligion, fromComedy, fromTech});

    }catch(error) {

        res.status(500).json({success: "Fasle", error: error.message})
    }
}


module.exports = {uploadSticker, getAllStickers, getFeaturedStickers, getStickerById, getStickersByTag};