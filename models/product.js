const fs = require('fs');
const path = require('path');

const basePath = require('../util/path');

const productPath = path.join(basePath, 'data', 'products.json');

const getProductsFromFile = callback => {
    fs.readFile(productPath, (err, fileContent) => {
        if (err) {
            return callback([]);
        }
        callback(JSON.parse(fileContent));
    });
}

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
      this.title = title;
      this.imageUrl = imageUrl;
      this.description = description;
      this.price = price;
  }

  save() {
      this.id = Math.random().toString();
      getProductsFromFile(products => {
          products.push(this);
          fs.writeFile(productPath, JSON.stringify(products), err => console.log(err));
      });
  }

  static fetchAll(callback) {
      getProductsFromFile(callback);
  }

  static findById(id, callback) {
      getProductsFromFile(products => {
         const product = products.find(product => product.id === id);
         callback(product);
      });
  }
};