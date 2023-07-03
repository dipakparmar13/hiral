const Order = require("../models/Order");

exports.etaFunction = async (req, res, next) => {
  try {
    // plateform == "Woocommerce" ? "wc-completed" : "Closed"
    const { order_id, time, plateform, key } = req.body;

    await Order.findOne({ _id: order_id }).then(async (order) => {
      var updated = order.shipment_order[0];
      (updated.label = "Processed"),
        (updated.bgcolor = "lightgray"),
        (updated.color = "black"),
        (updated.statusCode = 2),
        (updated.address = req.body.address),
        (updated.value = "Processed");

      if (order.shipment_order.length > 1 && order.shipment_order[1].statusCode !== 2) {
        await Order.findByIdAndUpdate(
          { _id: order_id },
          { shipment_order: [...order.shipment_order, updated] },
          {
            useFindAndModify: false,
          }
        ).then((order) => {
          if (!order) {
            res.status(404).send({
              message: `not updated`,
            });
          } else {
            res.json({
              success: 200,
              message: "order updated successfully.",
            });
          }
        });
      }
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
