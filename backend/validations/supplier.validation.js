const Joi = require("joi");

const createSupplier = {
  files: Joi.object().keys({
    supplier_logo: Joi.string().required(),
  }),
  body: Joi.object().keys({
    supplier_name: Joi.string().required(),
    supplier_long: Joi.number().required(),
    supplier_lat: Joi.number().required(),
    supplier_phone: Joi.number().required(),
  }),
};
const updateSupplier = {
  files: Joi.object().keys({
    supplier_logo: Joi.string(),
  }),
  body: Joi.object().keys({
    supplier_id: Joi.string().required(),
    supplier_name: Joi.string().required(),
    supplier_long: Joi.number().required(),
    supplier_lat: Joi.number().required(),
    supplier_phone: Joi.number().required(),
  }),
};

/**
 * @swagger
 * components:
 *  schemas:
 *    getSupplierById:
 *      type: ObjectId
 *      required:
 *        - supplier_id
 *      properties:
 *        supplier_id:
 *          type: string
 *          default: "63cfe36a356e7380ec7edf70"
 */
const getSupplierById = {
  params: Joi.object().keys({
    supplier_id: Joi.string().required(),
  }),
};

/**
 * @swagger
 * components:
 *  schemas:
 *    deleteSupplier:
 *      type: ObjectId
 *      required:
 *        - supplier_id
 *      properties:
 *        supplier_id:
 *          type: string
 *          default: "63cfe36a356e7380ec7edf70"
 */
const deleteSupplierById = {
  params: Joi.object().keys({
    supplier_id: Joi.string().required(),
  }),
};

module.exports = {
  createSupplier,
  updateSupplier,
  getSupplierById,
  deleteSupplierById,
};
