// const path = require("path");
// const fs = require("fs");

// const productsJSON = fs.readFileSync('./data/products.json', {encoding: 'utf-8'})
// const products = JSON.parse(productsJSON);

// const middlewares = {
//     fixImageSources: (req, res, next) => {
//         products.forEach( product => {
//             product.main_picture = path.join("/img/products/", product.main_picture);
//         });
//         next();
//     }
// }

// module.exports = middlewares;