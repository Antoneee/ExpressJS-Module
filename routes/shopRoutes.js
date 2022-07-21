const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shopController");

// /products => GET
router.get("/products", shopController.getProducts);

// /products/:id => GET (PUT THIS ROUTE LAST FOR PRODUCTS)
router.get("/products/:productId", shopController.getProductById);

// /cart => GET
router.get("/cart", shopController.getCart);

// /cart => GET
router.post("/cart", shopController.postCart);

// /cart => GET
router.post(
  "/cart/delete-product/:productId",
  shopController.postDeleteCartProduct
);

// /checkout => GET
router.get("/checkout", shopController.getCheckout);

// /orders => GET
router.get("/orders", shopController.getOrders);

// / => GET
router.get("/", shopController.getProductByIndex);

module.exports = router;
