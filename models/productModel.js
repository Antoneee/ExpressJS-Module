const fs = require("fs").promises;
const path = require("path");
const rootDir = require("../utils/path");

const p = path.join(rootDir, "dataStoreFile", "productsData.json");

const readProductsFromFile = async () => {
  const data = await fs.readFile(p);
  return JSON.parse(data);
};

class Product {
  constructor(id, title, imgUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imgUrl = imgUrl;
    this.price = price;
    this.description = description;
  }

  async save() {
    // Fetch the products from a file and store them into an array so that we can add our new product in that array and write it back into the file.
    let products = [];
    products = await readProductsFromFile();
    if (this.id) {
      const existingProductIndex = products.findIndex(
        (product) => product.id === this.id
      );
      const updatedProducts = [...products];
      updatedProducts[existingProductIndex] = this;
      console.log(updatedProducts);
      fs.writeFile(p, JSON.stringify(updatedProducts), (err) =>
        console.log(err)
      );
    } else {
      this.id = Math.random().toString();
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => console.log(err));
    }
  }

  static async fetchAllProducts() {
    return await readProductsFromFile();
  }

  static async findById(id) {
    return readProductsFromFile().then((products) =>
      products.find((product) => product.id === id)
    );
  }

  static async deleteProductById(id) {
    const products = await readProductsFromFile();
    const deletedProducts = products.filter((product) => product.id !== id);
    fs.writeFile(p, JSON.stringify(deletedProducts), (err) => console.log(err));
  }
}

module.exports = Product;
