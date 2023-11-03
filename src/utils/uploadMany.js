const path = require('path');
const DatauriParser = require('datauri/parser');

const cloudinary = require('../config/cloudinary');

const dUri = new DatauriParser();

function uploadMany(req) {
    return new Promise((resolve, reject) => {
        const files = req.files;
        console.log(typeof files);
        const urls = [];

        files.forEach(file => {
            let image = dUri.format(path.extname(file.originalname).toString(), file.buffer);

            cloudinary.uploader.upload(image.content, (err, url) => {
                if (err) return reject(err);
                urls.push(url);
            })
            urls.forEach(url => {
                console.log(url);
            })

            resolve(urls);
            
        });
    })
};

module.exports = uploadMany;
