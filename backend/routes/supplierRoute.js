const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const SupplierValidation = require("../validations/supplier.validation");
const auth = require("../middleware/auth");

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const supplierUpload = upload.fields([{ name: "supplier_logo" }]);

const SupplierController = require("../controllers/supplierControllers");

/**
 * @swagger
 * tags:
 *   name: Supplier
 */

/**
 * @swagger
 * /supplier/add:
 *  post:
 *     tags: [Supplier]
 *     parameters:
 *       - name: supplier_name
 *         description: Supplier name
 *         in: formData
 *         type: string
 *         required: true
 *         default: test
 *       - name: supplier_long
 *         description: Supplier longitude
 *         in: formData
 *         type: number
 *         required: true
 *         default: 22.152
 *       - name: supplier_lat
 *         description: Supplier latitude
 *         in: formData
 *         type: number
 *         required: true
 *         default: 112.22
 *       - name: supplier_phone
 *         description: Supplier phone number
 *         in: formData
 *         type: number
 *         required: true
 *         default: 9879541230
 *       - name: supplier_logo
 *         description: Supplier logo
 *         in: formData
 *         type: file
 *         required: true
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
  supplierUpload,
  validate(SupplierValidation.createSupplier),
  SupplierController.addSupplier
);

/**
 * @swagger
 * /supplier/update:
 *  patch:
 *     tags: [Supplier]
 *     parameters:
 *       - name: supplier_id
 *         description: Supplier Id
 *         in: formData
 *         type: string
 *         required: true
 *         default: 63cfe36a356e7380ec7edf70
 *       - name: supplier_name
 *         description: Supplier name
 *         in: formData
 *         type: string
 *         required: true
 *         default: test
 *       - name: supplier_long
 *         description: Supplier longitude
 *         in: formData
 *         type: number
 *         required: true
 *         default: 22.152
 *       - name: supplier_lat
 *         description: Supplier latitude
 *         in: formData
 *         type: number
 *         required: true
 *         default: 112.22
 *       - name: supplier_phone
 *         description: Supplier phone number
 *         in: formData
 *         type: number
 *         required: true
 *         default: 9879541230
 *       - name: supplier_logo
 *         description: Supplier logo
 *         in: formData
 *         type: file
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
  supplierUpload,
  validate(SupplierValidation.updateSupplier),
  SupplierController.updateSupplier
);

/**
 * @swagger
 * /supplier/get/{supplier_id}:
 *  get:
 *     tags: [Supplier]
 *     parameters:
 *       - in: path
 *         name: supplier_id
 *         required: true
 *         description: Get supplier using supplier_id
 *         schema:
 *           $ref: '#/components/schemas/getSupplierById'
 *         produces: application/json
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: NotFound
 */
router.get("/get/:supplier_id", auth(), validate(SupplierValidation.getSupplierById), SupplierController.getSupplier);

/**
 * @swagger
 * /supplier/get-all:
 *   get:
 *     tags: [Supplier]
 *     description: Get all suppliers
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: NotFound
 */
router.get("/get-all", auth(), SupplierController.getAllSupplier);

/**
 * @swagger
 * /supplier/delete/{supplier_id}:
 *   delete:
 *     tags: [Supplier]
 *     parameters:
 *       - in: path
 *         name: supplier_id
 *         required: true
 *         description: Delete supplier using supplier_id
 *         schema:
 *           $ref: '#/components/schemas/deleteSupplierById'
 *         produces: application/json
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: NotFound
 */
router.delete("/delete/:supplier_id", auth(), validate(SupplierValidation.deleteSupplierById), SupplierController.deleteSupplier);

module.exports = {
  routes: router,
};
