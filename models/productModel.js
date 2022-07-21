const db = require("../utils/database");

class Product {
  constructor(id, title, imgUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imgUrl = imgUrl;
    this.price = price;
    this.description = description;
  }

  async save() {
    return db.execute(
      "INSERT INTO products (title, price, imgUrl, description) VALUES (?, ?, ?, ?)",
      [this.title, this.price, this.imgUrl, this.description]
    );
  }

  static fetchAllProducts() {
    return db.execute("SELECT * FROM products");
  }

  static findById(id) {
    return db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
  }

  static async deleteProductById(id) {}
}

module.exports = Product;
