const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const integrationValidation = require("../validations/integration.validation");
const auth = require("../middleware/auth");
const multer = require("multer");
const upload = multer();

const {
  addIntegration,
  getIntegration,
  // updateIntegration,
  deleteIntegration,
} = require("../controllers/integrationController");

/**
 * @swagger
 * tags:
 *   name: Integration
 */

/**
 * @swagger
 * /integration/add:
 *  post:
 *     tags: [Integration]
 *     parameters:
 *       - in: body
 *         name: Request body
 *         required: true
 *         description: Create Integration
 *         schema:
 *           $ref: '#/components/schemas/CreateIntegrationInput'
 *         produces: application/json
 *     responses:
 *       200:
 *         description: Success.
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: NotFound
 */
router.post(
  "/add",
  upload.none(),
  auth(),
  validate(integrationValidation.createIntegration),
  addIntegration
);

// router.patch(
//   "/update",
//   upload.none(),
//   auth(),
//   validate(integrationValidation.updateIntegration),
//   updateIntegration
// );

/**
 * @swagger
 * /integration/get:
 *   get:
 *     tags: [Integration]
 *     description: Get all Integration using user id
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: NotFound
 */
router.get("/get", auth(), getIntegration);

/**
 * @swagger
 * /integration/delete/{id}:
 *   delete:
 *     tags: [Integration]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Delete Integration using Integration id
 *         produces: application/json
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: NotFound
 */
router.delete("/delete/:id", auth(), deleteIntegration);

module.exports = {
  routes: router,
};
