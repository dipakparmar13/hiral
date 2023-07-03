const Joi = require("joi");

/**
 * @swagger
 * components:
 *  schemas:
 *    CreateCustomerInput:
 *      type: object
 *      required:
 *        - supplier_ids
 *        - store_customer_id
 *        - invitation_code
 *        - organization_type
 *      properties:
 *        supplier_ids:
 *          type: array
 *          default: ["63ce2d8b0e0aee9783d283f1", "63ce2d8b0e0aee9783d283f2"]
 *        store_customer_id:
 *           type: string
 *           default: 63c65bf8822b703d82e099f1
 *        invitation_code:
 *           type: numer
 *           default: 123
 *        organization_type:
 *           type: string
 *           default: Restaurants
 */
const createCustomer = {
  body: Joi.object().keys({
    supplier_ids: Joi.array().required(),
    store_customer_id: Joi.string(),
    invitation_code: Joi.number(),
    organization_type: Joi.string(),
  }),
};

/**
 * @swagger
 * components:
 *  schemas:
 *    UpdateCustomerInput:
 *      type: object
 *      required:
 *        - customer_id
 *        - supplier_ids
 *        - store_customer_id
 *        - organization_type
 *      properties:
 *        customer_id:
 *          type: string
 *          default: 63ce97e4aae351be7b666732
 *        supplier_ids:
 *          type: array
 *          default: ["63ce2d8b0e0aee9783d283f1", "63ce2d8b0e0aee9783d283f2"]
 *        store_customer_id:
 *           type: string
 *           default: 63c65bf8822b703d82e099f1
 *        organization_type:
 *           type: string
 *           default: Restaurants
 */
const updateCustomer = {
  body: Joi.object().keys({
    customer_id: Joi.string().required(),
    supplier_ids: Joi.array().required(),
    store_customer_id: Joi.string().required(),
    organization_type: Joi.string().required(),
  }),
};

/**
 * @swagger
 * components:
 *  schemas:
 *    getCustomerById:
 *      type: ObjectId
 *      required:
 *        - customer_id
 *      properties:
 *        customer_id:
 *          type: string
 *          default: "63ce2d8b0e0aee9783d283f1"
 */
const getCustomerById = {
  params: Joi.object().keys({
    customer_id: Joi.string().required(),
  }),
};
const searchCustomerByName = {
  params: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

/**
 * @swagger
 * components:
 *  schemas:
 *    deleteCustomerById:
 *      type: ObjectId
 *      required:
 *        - customer_id
 *      properties:
 *        customer_id:
 *          type: string
 *          default: "63ce2d8b0e0aee9783d283f1"
 */
const deleteCustomerById = {
  params: Joi.object().keys({
    customer_id: Joi.string().required(),
  }),
};

module.exports = {
  createCustomer,
  updateCustomer,
  getCustomerById,
  searchCustomerByName,
  deleteCustomerById,
};
