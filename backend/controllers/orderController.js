const Order = require("../models/Order");
const FCM = require("fcm-node");
const moment = require("moment");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.addOrder = async (req, res, next) => {
  try {
    const { id } = req.user;
    const order = new Order({
      buyer_id: id,
      buyer_paid_fees: req.body.user_paid_fees,
      supplier_id: req.body.supplier_id,
      quantity: req.body.quantity,
      total_price: req.body.total_price,
      order_name: req.body.order_name,
      order_number: req.body.order_number,
      additional_info: req.body.additional_info,
      shipment_order: req.body.shipment_order, //in array
      product: req.body.product, //in array
      title: req.body.title,
      tags: req.body.tags,
      is_from_app: req.body.is_from_app,
      order_at: new Date(req.body.order_at),
    });
    order.save(order).then((data) => {
      res.json({
        success: 200,
        message: "Order successfully created!",
        data,
      });
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
exports.getOrderAll = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};

    if (endIndex < (await Order.countDocuments().exec())) {
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
      (await Order.countDocuments().exec()) / limit
    );

    results.currentPage = page;
    results.totalOrders = await Order.countDocuments().exec();

    results.orders = await Order.find()
      .populate("buyer_id")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(startIndex)
      .exec();

    res.status(200).json({
      status: 200,
      message: "Fetch orders successfully",
      results,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
exports.getOrder = async (req, res, next) => {
  try {
    const { order_id } = req.params;
    const order = await Order.findOne({ _id: order_id }).populate("buyer_id");

    if (order) {
      res.status(200).json({
        status: 200,
        message: "Fetch order successfully",
        order,
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
exports.getOrderByDays = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};

    if (endIndex < (await Order.countDocuments().exec())) {
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
    results.currentPage = page;
    const { order_status, start_date, end_date, search_name } = req.query;

    const list1 = ["see_everything"],
      list2 = order_status,
      result = list2
        .split(",")
        .filter((n) => list1.includes(n))
        .join(",");

    let order_filter = [];
    if (order_status && result !== "see_everything") {
      const orderStatus = order_status ? order_status.split(",") : [];
      order_filter.push({
        $match: { order_status: { $in: orderStatus } },
      });
    }
    if (search_name) {
      order_filter.push({
        $match: { order_name: { $regex: new RegExp(search_name, "i") } },
      });
    }

    if (start_date && end_date) {
      order_filter.push({
        $match: {
          order_at: {
            $gte: new Date(start_date),
            $lte: new Date(end_date),
          },
        },
      });
    }    
    order_filter.push({ $match: { supplier_id: new ObjectId(req.user.id) } });
    order_filter.push({ $sort: { order_at: -1 } });
    order_filter.push({
      $lookup: {
        from: "users",
        localField: "buyer_id",
        foreignField: "_id",
        as: "buyer_id",
      },
    });    
    const ordersTotal = await Order.aggregate(order_filter).exec();
    results.totalPages = Math.ceil(ordersTotal.length / limit);
    results.totalOrders = await Order.countDocuments().exec();
    results.orders = await Order.aggregate(order_filter)
      .skip(startIndex)
      .limit(limit)
      .exec();
    res.status(200).json({
      status: 200,
      message: "Fetch orders successfully",
      results,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
exports.updateOrder = async (req, res, next) => {
  try {
    const { order_id } = req.body;
    let updateData = req.body;
    await Order.findByIdAndUpdate({ _id: order_id }, updateData, {
      useFindAndModify: false,
    }).then((order) => {
      if (!order) {
        res.status(404).send({
          message: `Not updated`,
        });
      } else {
        res.json({
          success: 200,
          message: "Order updated successfully.",
          data: order,
        });
      }
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
exports.pushNotification = async (req, res, next) => {
  try {
    let updateData = req.body;
    await Order.findByIdAndUpdate({ _id: req.body.order_id }, updateData, {
      useFindAndModify: false,
    }).then((order) => {
      if (!order) {
        res.status(404).send({
          message: `Not updated`,
        });
      } else {
        const serverKey = "FCM_SERVER_KEY";
        const fcm = new FCM(serverKey);
        const message = {
          to: updateData.device_token,
          collapse_key: "test",
          notification: {
            title: req.body.title,
            body: req.body.message,
          },
          data: {
            order_number: req.body.order_number,
          },
        };
        fcm.send(message, (err, response) => {
          if (err) {
            res.status(500).json({ msg: "error:", err, success: false });
          } else {
            res.status(200).json({
              msg: "Successfully sent message:",
              response,
              success: true,
            });
          }
        });
      }
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
