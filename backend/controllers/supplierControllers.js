const Supplier = require("../models/Supplier");
const { profilePhoto } = require("../service");

const addSupplier = async (req, res, next) => {
  try {
    const { id } = req.user;
    const supplier_profile = await profilePhoto.profilePhoto(
      req.files.supplier_logo[0],
      "supplier"
    );

    let updateData = { ...req.body, supplier_logo: supplier_profile };
    const supplier = new Supplier({
      user_id: id,
      ...updateData,
    });
    supplier.save(supplier).then((data) => {
      res.json({
        success: 200,
        message: "supplier successfully created!",
      });
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const getAllSupplier = async (req, res, next) => {
  try {
    const { id } = req.user;
    const supplier = await Supplier.find({ user_id: id });
    if (supplier) {
      res.status(200).json({
        status: 200,
        message: "fetch supplier successfully",
        supplier,
      });
    } else {
      res.status(400).json({
        status: 400,
        message: "Something Went wrong with Retrieving data",
      });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const getSupplier = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { supplier_id } = req.params;
    const supplier = await Supplier.findOne({ user_id: id, _id: supplier_id });
    if (supplier) {
      res.status(200).json({
        status: 200,
        message: "fetch supplier successfully",
        supplier,
      });
    } else {
      res.status(400).json({
        status: 400,
        message: "Something Went wrong with Retrieving data",
      });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const updateSupplier = async (req, res, next) => {
  try {
    const { supplier_id } = req.body;
    const { id } = req.user;
    let supplier_profile;
    if (!!req.files.supplier_logo) {
      supplier_profile = await profilePhoto.profilePhoto(
        req.files.supplier_logo[0],
        "supplier"
      );
    }
    let updateData = { ...req.body, supplier_logo: supplier_profile };
    await Supplier.findByIdAndUpdate(
      { user_id: id, _id: supplier_id },
      updateData,
      {
        useFindAndModify: false,
      }
    ).then((supplier) => {
      if (!supplier) {
        res.status(404).send({
          message: `not updated`,
        });
      } else {
        res.json({
          success: 200,
          message: "supplier updated successfully.",
        });
      }
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const deleteSupplier = async (req, res, next) => {
  try {
    const { supplier_id } = req.params;
    await Supplier.findByIdAndDelete({ _id: supplier_id }).then((supplier) => {
      if (!supplier) {
        res.status(404).send({
          message: `not found`,
        });
      } else {
        res.json({
          success: 200,
          message: "supplier delete successfully.",
        });
      }
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
module.exports = {
  addSupplier,
  getAllSupplier,
  getSupplier,
  updateSupplier,
  deleteSupplier,
};
