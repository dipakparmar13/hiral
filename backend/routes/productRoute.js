const express = require("express");
const {
  addProduct,
  getAllProduct,
  getCategoryWiseProduct,
  getAllCategory,
} = require("../controllers/productController");

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();
const auth = require("../middleware/auth");

router
  .post("", upload.single("product_data"), auth(), addProduct)
  .get("/categories", auth(), getAllCategory)
  .get("/get-all", auth(), getAllProduct)
  .get("/:id", auth(), getCategoryWiseProduct);

module.exports = {
  routes: router,
};
