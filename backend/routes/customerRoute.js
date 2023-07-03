const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const customerValidation = require("../validations/customer.validation");
const auth = require("../middleware/auth");

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const customerUpload = upload.fields([{ name: "supplier_logo" }]);

const customerController = require("../controllers/customerController");

/**
 * @swagger
 * tags:
 *   name: Customer
 */

/**
 * @swagger
 * /customer/add:
 *  post:
 *     tags: [Customer]
 *     parameters:
 *       - in: body
 *         name: Request body
 *         required: true
 *         description: Endpoint to create a customer
 *         schema:
 *           $ref: '#/components/schemas/CreateCustomerInput'
 *         produces: application/json
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: NotFound
 */
router.post(
  "/add",
  auth(),
  customerUpload,
  validate(customerValidation.createCustomer),
  customerController.addCustomer
);

/**
 * @swagger
 * /customer/update:
 *  patch:
 *     tags: [Customer]
 *     parameters:
 *       - in: body
 *         name: Request body
 *         required: true
 *         description: Update customer
 *         schema:
 *           $ref: '#/components/schemas/UpdateCustomerInput'
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
  auth(),
  customerUpload,
  validate(customerValidation.updateCustomer),
  customerController.updateCustomer
);

/**
 * @swagger
 * /customer/get/{customer_id}:
 *  get:
 *     tags: [Customer]
 *     parameters:
 *       - in: path
 *         name: customer_id
 *         required: true
 *         description: Get customer using customer Id
 *         schema:
 *           $ref: '#/components/schemas/getCustomerById'
 *         produces: application/json
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: NotFound
 */
router.get("/get", auth(), customerController.getCustomer);

/**
 * @swagger
 * /customer/get-all:
 *   get:
 *     tags: [Customer]
 *     description: Get all customers
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: NotFound
 */
router.get("/get-all", auth(), customerController.getAllCustomer);

/**
 * @swagger
 * /customer/delete/{customer_id}:
 *   delete:
 *     tags: [Customer]
 *     parameters:
 *       - in: path
 *         name: customer_id
 *         required: true
 *         description: Delete customer using customer id
 *         schema:
 *           $ref: '#/components/schemas/deleteCustomerById'
 *         produces: application/json
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: NotFound
 */
router.delete(
  "/delete/:customer_id",
  auth(),
  validate(customerValidation.deleteCustomerById),
  customerController.deleteCustomer
);

module.exports = {
  routes: router,
};
