const Joi = require("joi");

/**
 * @swagger
 * components:
 *  schemas:
 *    CreateIntegrationInput:
 *      type: object
 *      required:
 *        - supplier_id
 *        - store
 *        - supplier_stores
 *      properties:
 *        supplier_id:
 *          type: string
 *          default: "63ce2cc973f184a4059ca057"
 *        store:
 *           type: array
 *           items:
 *              type: object
 *              properties:
 *                 store_key:
 *                    type: string
 *                    default: "63ce2cc973f184a4059ca057lsdfkjslkf"
 *                 platform_name:
 *                    type: string
 *                    default: "shopify"
 *        supplier_stores:
 *           type: string
 *           default: "desk"
 */
const createIntegration = {
  body: Joi.object().keys({
    supplier_id: Joi.string().required(),
    store: Joi.array().items(
      Joi.object({
        store_key: Joi.string().required(),
        platform_name: Joi.string().required(),
      })
    ),
    supplier_stores: Joi.string().required(),
  }),
};

// const updateIntegration = {
//   body: Joi.object().keys({
//     id: Joi.string().required(),
//     supplier_id: Joi.string().required(),
//     store: Joi.array().items(
//       Joi.object({
//         store_key: Joi.string().required(),
//         platform_name: Joi.string().required(),
//       })
//     ),
//     supplier_stores: Joi.string().required(),
//   }),
// };

module.exports = {
  createIntegration,
  // updateIntegration,
};
