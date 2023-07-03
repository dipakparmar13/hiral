const dotenv = require("dotenv");
dotenv.config();
const Products = require("../models/Products");
const Category = require("../models/Category");
const XLSX = require("xlsx");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const addProduct = async (req, res, next) => {
  try {
    if (!req.file || Object.keys(req.file).length === 0) {
      return res.status(400).send("No files uploaded");
    }
    const file = req.file;
    const buffer = file.buffer;
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    if (sheetData.length > 0) {
      sheetData.forEach(async (element) => {
        const product = await Products.findOne({
          product_id: element.Produit_ID,
        });
        const productData = {
          category_id: Number(element.Catégories.split(".")[0]),
          user_id: req.user.id,
          name: element.Nom_du_produit,
          product_id: element.Produit_ID,
          qty: Number(element.Lots),
          price: element.Prix_de_base,
          discript: element.Description,
          unit: element.Unité,
          image: element.Image,
          user_id: req.user.id,
        };
        if (product) {
          productData.updated_date = new Date();
          await Products.findByIdAndUpdate(
            { _id: new ObjectId(product._id) },
            productData,
            {
              useFindAndModify: false,
            }
          );
        } else {
          productData.created_date = new Date();
          const add_product = new Products(productData);
          await add_product.save();
        }
      });
      res.status(200).json({
        message: "CSV file uploaded successfully!",
      });
    } else {
      res.status(400).json({
        message: "please enter valid file",
      });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllProduct = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = req.query.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};

    if (endIndex < (await Products.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    results.totalPages = Math.ceil(
      (await Products.countDocuments().exec()) / limit
    );
    results.currentPage = page;
    results.totalProducts = await Products.countDocuments().exec();

    await Products.find({ user_id: req.user.id })
      .populate("category_id", "name image color")
      .populate("user_id", "_id first_name last_name profile_image")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(startIndex)
      .exec()
      .then((product) => {
        if (product) {
          results.products = product;
          res.status(200).json({
            message: "fetch data successfully",
            results,
          });
        } else {
          res.status(400).json({
            message: "Something Went wrong with Retrieving data",
          });
        }
      });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getCategoryWiseProduct = async (req, res, next) => {
  try {
    const products = await Products.find({
      category_id: req.params.id,
    }).populate("category_id", "name image");

    res.status(200).json([...products]);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const getAllCategory = async (req, res, next) => {
  try {
    const category = await Category.find({});

    res.status(200).json(category);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = {
  addProduct,
  getAllProduct,
  getCategoryWiseProduct,
  getAllCategory,
};
