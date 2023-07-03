const Joi = require("joi");

/**
 * @swagger
 * components:
 *  schemas:
 *    createOrderInput:
 *      type: object
 *      required:
 *        - user_paid_fees
 *        - user_name
 *        - buyer_id
 *        - buyer_name
 *        - buyer_phone
 *        - quantity
 *        - total_price
 *        - order_name
 *        - order_number
 *        - order_status
 *        - additional_info
 *        - product
 *      properties:
 *        user_paid_fees:
 *          type: number
 *          default: 0
 *        user_name:
 *          type: string
 *          default: test
 *        buyer_id:
 *          type: string
 *          default: 63ce2cc973f184a4059ca057
 *        buyer_name:
 *          type: string
 *          default: test
 *        buyer_phone:
 *          type: number
 *          default: 9879541230
 *        quantity:
 *          type: nubmer
 *          default: 2
 *        total_price:
 *          type: number
 *          default: 123
 *        order_name:
 *          type: string
 *          default: test
 *        order_number:
 *          type: number
 *          default: 12
 *        order_status:
 *          type: string
 *          default: Processing
 *        additional_info:
 *          type: string
 *          default: no of this
 *        product:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              product_id:
 *                type: string
 *                default: 63c65bf8822b703d82e099f1
 *              product_name:
 *                type: string
 *                default: test
 *              product_price:
 *                type: number
 *                default: 235
 *        title:
 *          type: string
 *          default: no of this
 *        tags:
 *          type: string
 *          default: best order
 *        is_from_app:
 *          type: boolean
 *          default: false
 *        order_at:
 *          type: date
 *          default: 11/2/2023
 *        deliver_at:
 *          type: date
 *          default: 11/2/2023
 */
const createOrder = {
  user: Joi.object().keys({
    id: Joi.string().required(),
  }),
  body: Joi.object().keys({
    buyer_paid_fees: Joi.number().required(),
    // user_name: Joi.string().required(),
    supplier_id: Joi.string().required(),
    // supplier_name: Joi.string().required(),
    // supplier_phone: Joi.number().required(),
    quantity: Joi.number().required(),
    total_price: Joi.number().required(),
    order_name: Joi.string().required(),
    order_number: Joi.number().required(),
    order_status: Joi.string().required(),
    additional_info: Joi.string(),
    shipment_order: Joi.array().items(
      Joi.object({
        lat: Joi.number(),
        long: Joi.number(),
        address: Joi.string(),
        arrival_time: Joi.number(),
        statusCode: Joi.number(),
        order_id: Joi.string(),
        label: Joi.string(),
        value: Joi.string(),
        color: Joi.string(),
        bgcolor: Joi.string(),
      })
    ),
    product: Joi.array().items(
      Joi.object({
        product_id: Joi.string().required(),
        product_name: Joi.string().required(),
        product_price: Joi.number().required(),
        product_quantity: Joi.number().required(),
      })
    ),
    title: Joi.string(),
    tags: Joi.string(),
    is_from_app: Joi.boolean(),
    order_at: Joi.date(),
    deliver_at: Joi.date(),
  }),
};

/**
 * @swagger
 * components:
 *  schemas:
 *    UpdateOrderInput:
 *      type: object
 *      required:
 *        - user_paid_fees
 *        - order_id
 *        - order_status
 *      properties:
 *        user_paid_fees:
 *          type: number
 *          default: 0
 *        order_id:
 *          type: string
 *          default: 63c65bf8822b703d82e099f1
 *        order_status:
 *          type: string
 *          default: Processing
 *        shipment_order:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              lat:
 *                type: number
 *                default: 12.6
 *              long:
 *                type: number
 *                default: 23.4
 *              address:
 *                type: string
 *                default: near by post
 *              arrival_time:
 *                type: number
 *                default: 23
 *              statusCode:
 *                type: number
 *                default: 0
 *              order_id:
 *                type: string
 *                default: 63c65bf8822b703d82e099f1
 *              label:
 *                type: string
 *                default: Processing
 *              value:
 *                type: string
 *                default: Processing
 *              color:
 *                type: string
 *                default: 0085FF
 *              bgcolor:
 *                type: string
 *                default: E085F0
 *        is_favorite:
 *          type: boolean
 *          default: false
 *        deliver_at:
 *          type: date
 *          default: 15/2/2023
 */
const updateOrder = {
  user: Joi.object().keys({
    id: Joi.string().required(),
  }),
  body: Joi.object().keys({
    user_paid_fees: Joi.number(),
    order_id: Joi.string().required(),
    order_status: Joi.string(),
    shipment_order: Joi.array().items(
      Joi.object({
        lat: Joi.number(),
        long: Joi.number(),
        address: Joi.string(),
        arrival_time: Joi.number(),
        statusCode: Joi.number(),
        order_id: Joi.string(),
        label: Joi.string(),
        value: Joi.string(),
        color: Joi.string(),
        bgcolor: Joi.string(),
      })
    ),
    is_favorite: Joi.boolean(),
    deliver_at: Joi.date(),
  }),
};

/**
 * @swagger
 * components:
 *  schemas:
 *    pushNotificationInput:
 *      type: object
 *      required:
 *        - order_id
 *        - title
 *        - order_number
 *        - message
 *        - device_token
 *      properties:
 *        order_id:
 *          type: string
 *          default: 63c7ea5b5ef1ddce7df5a714
 *        title:
 *          type: string
 *          default: test
 *        order_number:
 *          type: number
 *          default: 12
 *        message:
 *          type: string
 *          default: Processing
 *        device_token:
 *          type: string
 *          default: asdhkahkdjhakjsdjkjasd↵a5sd646a5sd798a79r7sd564f65s4fd54as
 */
const pushNotification = {
  user: Joi.object().keys({
    id: Joi.string().required(),
  }),
  body: Joi.object().keys({
    order_id: Joi.string().required(),
    title: Joi.string().required(),
    order_number: Joi.number().required(),
    message: Joi.string().required(),
    device_token: Joi.string().required(),
  }),
};
module.exports = {
  createOrder,
  updateOrder,
  pushNotification,
};
