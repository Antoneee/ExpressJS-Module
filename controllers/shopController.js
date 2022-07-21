const Product = require("../models/productModel");
const Cart = require("../models/cartModel");

module.exports = {
  getProducts: async (req, res) => {
    const products = await Product.fetchAllProducts();
    res.render("shop/product-list", {
      prods: products,
      docTitle: "Products",
      path: "/products",
    });
  },
  getProductById: async (req, res) => {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    res.render("shop/product-detail", {
      prod: product,
      docTitle: product.title,
      path: "/products",
    });
  },
  getProductByIndex: async (req, res, next) => {
    const products = await Product.fetchAllProducts();
    res.render("shop/index", {
      prods: products,
      docTitle: "Shop",
      path: "/",
    });
  },
  getCart: async (req, res, next) => {
    const cart = await Cart.getCart();
    const products = await Product.fetchAllProducts();
    let cartProducts = [];
    for (product of products) {
      for (cartProduct of cart.products) {
        if (product.id === cartProduct.id) {
          cartProducts.push({
            productData: product,
            quantity: cartProduct.quantity,
          });
        }
      }
    }
    res.render("shop/cart", {
      products: cartProducts,
      docTitle: "Your Cart",
      path: "/cart",
    });
  },
  postCart: async (req, res, next) => {
    const productId = req.body.productId;
    const product = await Product.findById(productId);
    Cart.addProduct(productId, product.price);
    res.redirect("/cart");
  },
  postDeleteCartProduct: async (req, res, next) => {
    const productId = req.params.productId;
    const { price } = await Product.findById(productId);
    Cart.deleteProductById(productId, price);
    res.redirect("/cart");
  },
  getCheckout: (req, res, next) => {
    res.render("shop/checkout", { docTitle: "Checkout", path: "/checkout" });
  },
  getOrders: (req, res) => {
    res.render("shop/orders", { docTitle: "Your Orders", path: "/orders" });
  },
};
