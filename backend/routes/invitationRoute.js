const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const auth = require("../middleware/auth");
const invitationValidation = require("../validations/invitation.validation");

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const invitationUpload = upload.fields([{ name: "logo" }]);

const {
  getInvitation,
  addInvitation,
  invitationSend,
  updateInvitation,
  smsInvitation,
  getStatusWiseInvitation,
  deleteInvitation,
  verifyInvitation,
} = require("../controllers/invitationControllers");

/**
 * @swagger
 * tags:
 *   name: Invitation
 */

/**
 * @swagger
 *  /invitation/add:
 *  post:
 *     tags: [Invitation]
 *     parameters:
 *       - name: customer_account
 *         description: customer_account of invitation
 *         in: formData
 *         type: string
 *         required: true
 *         default: test
 *       - name: email
 *         description: email of invitation
 *         in: formData
 *         type: string
 *         required: true
 *         default: test@yopmail.com
 *       - name: invitation_code
 *         description: invitation_code of invitation
 *         in: formData
 *         type: number
 *         required: true
 *         default: 123456
 *       - name: is_used
 *         description: is_used of invitation
 *         in: formData
 *         type: boolean
 *         required: true
 *         default: false
 *       - name: organization_type
 *         description: organization_type of invitation
 *         in: formData
 *         type: string
 *         required: true
 *         default: test
 *       - name: supplier_long
 *         description: supplier_long of invitation
 *         in: formData
 *         type: number
 *         required: true
 *         default: 321.12
 *       - name: supplier_lat
 *         description: supplier_lat of invitation
 *         in: formData
 *         type: number
 *         required: true
 *         default: 15.12
 *       - name: supplier_phone
 *         description: supplier_phone of invitation
 *         in: formData
 *         type: number
 *         required: true
 *         default: 932587410
 *       - name: logo
 *         description: logo of invitation
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
  invitationUpload,
  validate(invitationValidation.createInvitation),
  addInvitation
);
router.post(
  "/send",
  auth(),
  upload.
  none(),
  validate(invitationValidation.invitationSend),
  invitationSend
);

/**
 * @swagger
 *  /invitation/update:
 *  patch:
 *     tags: [Invitation]
 *     parameters:
 *       - name: invitation_id
 *         description: invitation_id of invitation
 *         in: formData
 *         type: string
 *         required: true
 *         default: 63cfc4ccc22c7bd709cf0658
 *       - name: is_used
 *         description: is_used of invitation
 *         in: formData
 *         type: boolean
 *         required: true
 *         default: false
 *       - name: logo
 *         description: logo of invitation
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
  upload.none(),
  validate(invitationValidation.verifyInvitation),
  verifyInvitation
);

/**
 * @swagger
 * /invitation/get:
 *   get:
 *     tags: [Invitation]
 *     description: Get all invitation code for login user
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: NotFound
 */
router.get("/get", auth(), getInvitation);

/**
 * @swagger
 * /invitation/sms:
 *  post:
 *     tags: [Invitation]
 *     parameters:
 *       - in: body
 *         name: Request body
 *         required: true
 *         description: Send SMS to the mobile number.
 *         schema:
 *           $ref: '#/components/schemas/SendSMSInput'
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
  "/sms",
  upload.none(),
  auth(),
  validate(invitationValidation.SMS),
  smsInvitation
);

router.get(
  "/get-user-supplier-list",
  auth(),
  validate(invitationValidation.getInvitationByStatus),
  getStatusWiseInvitation
);

router.delete("/delete/:id", auth(), deleteInvitation);

router.patch(
  "/update-organization",
  auth(),
  upload.none(),
  validate(invitationValidation.updateInvitation),
  updateInvitation
);
module.exports = {
  routes: router,
};
