const path = require('path');
const DatauriParser = require('datauri/parser');

const cloudinary = require('../config/cloudinary');

const dUri = new DatauriParser();

// function uploadMany(req) {
//     return new Promise((resolve, reject) => {

//         const files = req.files;
//         console.log(files);
//         const urls = [];

//         files.forEach(file => {
//             let image = dUri.format(path.extname(file.originalname).toString(), file.buffer);

//             cloudinary.uploader.upload(image.content, (err, url) => {
//                 if (err) return reject(err);
//                 urls.push(url);
//             })
//             urls.forEach(url => {
//                 console.log(`the urls are ${url}`);
//             })

//             resolve(urls);
            
//         });
//     })
// };

function uploadMany(req) {
    return new Promise(async (resolve, reject) => {
      const files = req.files;
      const urls = [];
  
      // Create an array of promises for the uploads
      const uploadPromises = files.map(file => {
        return new Promise((uploadResolve, uploadReject) => {
          let image = dUri.format(path.extname(file.originalname).toString(), file.buffer);
  
          cloudinary.uploader.upload(image.content, (err, data) => {
            if (err) {
              uploadReject(err);
            } else {
                console.log(`pushed url is ${data.url}`);
              urls.push(data.url);
              uploadResolve();
            }
          });
        });
      });
  
      try {
        // Wait for all the upload promises to complete
        await Promise.all(uploadPromises);
        // console.log(`Resolved promise is ${urls}`)
        resolve(urls);
      } catch (error) {
        reject(error);
      }
    });
  }

module.exports = uploadMany;
