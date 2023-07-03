const { User } = require("../models");
const Customer = require("../models/Customer");
const { profilePhoto } = require("../service");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const addCustomer = async (req, res, next) => {
  try {
    const { id } = req.user;
    const customer = new Customer({
      user_id: id,
      ...req.body,
    });
    customer.save(customer).then((data) => {
      res.json({
        success: 200,
        message: "customer successfully created!",
      });
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const getAllCustomer = async (req, res, next) => {
  try {
    const { id } = req.user;
    const customer = await Customer.find({ user_id: id });
    if (customer) {
      res.status(200).json({
        status: 200,
        message: "fetch customer successfully",
        customer,
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
const getCustomer = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { name } = req.query;
    const cus = await Customer.findOne({ supplier_id: id });

    let customer_filter = [];
    if (name) {
      customer_filter.push({
        $match: {
          customer_account: { $regex: `^${name}`, $options: "i" },
        },
      });
    }
    let customer_id = [];
    for (let index = 0; index < cus.customer_id.length; index++) {
      const element = cus.customer_id[index];
      customer_id.push(ObjectId(element));
    }
    customer_filter.push({
      $match: { _id: { $in: customer_id } },
    });

    const invite_user = await User.aggregate(customer_filter);
    if (invite_user) {
      res.status(200).json({
        status: 200,
        message: "fetch customer successfully",
        invite_user,
      });
    } else {
      res.status(400).json({
        status: 400,
        message: "Something Went wrong with Retrieving data",
      });
    }
    // const { customer_id } = req.params;
    // const customer = await Customer.findOne({ user_id: id, _id: customer_id });
    // if (customer) {
    //   res.status(200).json({
    //     status: 200,
    //     message: "fetch customer successfully",
    //     customer,
    //   });
    // } else {
    //   res.status(400).json({
    //     status: 400,
    //     message: "Something Went wrong with Retrieving data",
    //   });
    // }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateCustomer = async (req, res, next) => {
  try {
    const { id } = req.user;
    let body = { ...req.body };
    await Customer.findByIdAndUpdate(
      { user_id: id, _id: req.body.customer_id },
      body,
      {
        useFindAndModify: false,
      }
    ).then((customer) => {
      if (!customer) {
        res.status(404).send({
          message: `not updated`,
        });
      } else {
        res.json({
          success: 200,
          message: "customer updated successfully.",
        });
      }
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const deleteCustomer = async (req, res, next) => {
  try {
    const { customer_id } = req.params;

    const { id } = req.user;
    const cus = await Customer.findOne({ supplier_id: id });

    let filter_customer_id = cus.customer_id.filter(function (item) {
      return item !== customer_id;
    });

    await Customer.findOneAndUpdate(
      { supplier_id: id },
      { customer_id: filter_customer_id },
      {
        useFindAndModify: false,
      }
    ).then((customer) => {
      if (!customer) {
        res.status(404).send({
          message: `not updated`,
        });
      } else {
        res.json({
          success: 200,
          message: "customer delete successfully.",
        });
      }
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
module.exports = {
  addCustomer,
  getAllCustomer,
  getCustomer,
  updateCustomer,
  deleteCustomer,
};
