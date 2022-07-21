const express = require("express");

const adminController = require("../controllers/adminController");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", adminController.getAddProduct);

// /admin/products => GET
router.get("/products", adminController.getAdminProducts);

// /admin/add-product => POST
router.post("/add-product", adminController.postAddProduct);

// /admin/edit-product/:productId => GET
router.get("/edit-product/:productId", adminController.getEditProduct);

// /admin/edit-product => POST
router.post("/edit-product", adminController.postEditProduct);

// /admin/edit-product/:productId => POST
router.post("/delete-product/:productId", adminController.postDeleteProduct);

module.exports = router;
