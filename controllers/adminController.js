const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

module.exports = {
  getAddProduct: (req, res) => {
    res.render("admin/edit-product", {
      docTitle: "Add Product",
      path: "/admin/add-product",
      editing: false,
    });
  },
  postAddProduct: (req, res) => {
    const title = req.body.title;
    const imgUrl = req.body.imgUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(null, title, imgUrl, price, description);
    product.save();
    res.redirect("/");
  },
  getEditProduct: async (req, res) => {
    const editMode = req.query.edit;
    if (!editMode) {
      res.redirect("/");
    }
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      prod: product,
      docTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
    });
  },
  postEditProduct: async (req, res) => {
    const id = req.body.productId;
    const title = req.body.title;
    const imgUrl = req.body.imgUrl;
    const price = req.body.price;
    const description = req.body.description;
    const updatedProduct = new Product(id, title, imgUrl, price, description);
    console.log(
      req.body.productId,
      req.body.title,
      req.body.imgUrl,
      req.body.price,
      req.body.description
    );
    updatedProduct.save();
    res.redirect("/admin/products");
  },
  postDeleteProduct: async (req, res) => {
    const productId = req.params.productId;
    const { price } = await Product.findById(productId);
    Product.deleteProductById(productId);
    Cart.deleteProductById(productId, price);
    res.redirect("/");
  },
  getAdminProducts: async (req, res) => {
    const products = await Product.fetchAllProducts();
    res.render("admin/product-list-admin", {
      prods: products,
      docTitle: "Admin Products",
      path: "/admin/products",
    });
  },
};
