const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const orderValidation = require("../validations/order.validation");
const auth = require("../middleware/auth");
const multer = require("multer");
const upload = multer();

const {
  addOrder,
  getOrderAll,
  getOrder,
  updateOrder,
  pushNotification,
  getOrderByDays,
} = require("../controllers/orderController");

/**
 * @swagger
 * tags:
 *   name: Order
 */

/**
 * @swagger
 * /order/add:
 *  post:
 *     tags: [Order]
 *     parameters:
 *       - in: body
 *         name: Request body
 *         required: true
 *         description: Add order
 *         schema:
 *           $ref: '#/components/schemas/createOrderInput'
 *         produces: application/json
 *     responses:
 *      200:
 *        description: Successfull order
 *      401:
 *         description: Unauthorized
 *      400:
 *        description: Unsuccessfull order
 */
router.post(
  "/add",
  auth(),
  upload.none(),
  validate(orderValidation.createOrder),
  addOrder
);

/**
 * @swagger
 * /order/update:
 *  patch:
 *     tags: [Order]
 *     parameters:
 *       - in: body
 *         name: Request body
 *         required: true
 *         description: Update order
 *         schema:
 *           $ref: '#/components/schemas/UpdateOrderInput'
 *         produces: application/json
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: NotFound
 */
router.patch(
  "/update",
  upload.none(),
  auth(),
  validate(orderValidation.updateOrder),
  updateOrder
);

/**
 * @swagger
 * /order/get:
 *   get:
 *     tags: [Order]
 *     description: User who is logged in will get the order
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: NotFound
 */
router.get("/get", auth(), getOrderAll);

router.get("/get/:order_id", auth(), getOrder);

router.get("/get-filter-wise", auth(), getOrderByDays);

// send push notification using device token
/**
 * @swagger
 * /order/pushNotification:
 *  patch:
 *     tags:
 *     - pushNotification
 *     parameters:
 *       - in: body
 *         name: Request body
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/pushNotificationInput'
 *         produces: application/json
 *     responses:
 *      200:
 *        description: Successfull order
 *      401:
 *         description: Unauthorized
 *      400:
 *        description: Unsuccessfull order
 */
router.patch(
  "/pushNotification",
  auth(),
  validate(orderValidation.pushNotification),
  pushNotification
);

module.exports = {
  routes: router,
};
