const fs = require('fs')
const Datauri = require('datauri');
const DatauriParser = require('datauri/parser');

const path = require('path');
const cloudinary = require('../config/cloudinary');

const dUri = new DatauriParser();

function uploadOne(req) {

    return new Promise((resolve, reject) => {
        // const dUri = new Datauri();
        let image = dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

        // let image = dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);
        // console.log(Object.keys(dUri));
        // const parser = new DatauriParser();
        // const buffer = fs.readFileSync(req.file.originalname);
        // const image = parser.format(path.extname(req.file.originalname), buffer)
        cloudinary.uploader.upload(image.content, (err, url) => {
            if (err) return reject(err);
            return resolve(url);
        })
    });
}



module.exports = uploadOne;