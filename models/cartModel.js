const fs = require("fs").promises;
const path = require("path");
const rootDir = require("../utils/path");

const p = path.join(rootDir, "dataStoreFile", "cartData.json");

const readCartFromFile = async () => {
  const data = await fs.readFile(p);
  return JSON.parse(data);
};

class Cart {
  static async addProduct(id, productPrice) {
    // Fetch previous cart.
    let cart = { products: [], totalPrice: 0 };
    cart = await readCartFromFile();
    // Analyze the cart => Find existing product
    const existingProductIndex = cart.products.findIndex(
      (product) => product.id === id
    );
    // If product does not exist in cart, add new product to cart.
    if (existingProductIndex === -1) {
      cart.products.push({ id: id, quantity: 1 });
    }
    // If product does exist in cart, increase quantity by 1.
    else {
      cart.products[existingProductIndex].quantity += 1;
    }
    // Increase the total price of cart,
    cart.totalPrice += Number(productPrice);
    // Write to file.
    fs.writeFile(p, JSON.stringify(cart), (err) => console.log(err));
  }
  static async deleteProductById(id, productPrice) {
    let cart = { products: [], totalPrice: 0 };
    cart = await readCartFromFile();
    // Analyze the cart => Find existing product
    const product = cart.products.find((product) => product.id === id);
    if (!product) {
      return;
    }
    // Get the quantity for the product found in the cart to update the total price.
    const quantity = product.quantity;

    // Update the total price of the cart.
    const updateCartPrice = cart.totalPrice - quantity * productPrice;

    // Filter out the product to be removed.
    const updatedCartProducts = cart.products.filter(
      (product) => product.id !== id
    );

    let updatedCart;
    // Update the cart.

    if (updatedCartProducts.length === 0) {
      updatedCart = {
        products: [],
        totalPrice: 0,
      };
    } else {
      updatedCart = {
        products: updatedCartProducts,
        totalPrice: updateCartPrice,
      };
    }

    // Write to the cart file datastore.
    fs.writeFile(p, JSON.stringify(updatedCart), (err) => console.log(err));
  }

  static async getCart() {
    return await readCartFromFile();
  }
}

module.exports = Cart;
