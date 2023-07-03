const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const userValidation = require("../validations/user.validation");
const auth = require("../middleware/auth");
const {
  // Signin,
  Signup,
  forgotPassword,
  updateUser,
  getUser,
  changePassword,
  verifyOtp,
  verifyEmail,
  getUserProfilePic,
  getAllUser,
} = require("../controllers/authController");

const {
  smsInvitation,
  emailInvitation,
} = require("../controllers/invitationControllers");
// const { smsEmailInvitation } = require("../controllers/invitationControllers");

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const userUpload = upload.fields([{ name: "profile_image" }]);

/**
 * @swagger
 * tags:
 *   name: Users
 */

/**
 * @swagger
 * /auth/register:
 *  post:
 *     tags: [Users]
 *     parameters:
 *       - in: body
 *         name: Request body
 *         required: true
 *         description: Endpoint to register users, your can create 2 type of account "register_type" of supplier, farmer.
 *         schema:
 *           $ref: '#/components/schemas/CreateUserInput'
 *         produces: application/json
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Registration failed
 */
router.post(
  "/register",
  upload.none(),
  validate(userValidation.createUser),
  Signup
);

/**
 * @swagger
 * /auth/login:
 *  post:
 *     tags: [Users]
 *     parameters:
 *       - in: body
 *         name: Request body
 *         required: true
 *         description: Endpoint responsible for the login
 *         schema:
 *           $ref: '#/components/schemas/LoginUserInput'
 *         produces: application/json
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: NotFound
 */
// router.post(
//   "/login",
//   upload.none(),
//   validate(userValidation.loginUser),
//   Signin
// );

/**
 * @swagger
 * /auth/login-with-number:
 *  post:
 *     tags: [Users]
 *     parameters:
 *       - in: body
 *         name: Request body
 *         required: true
 *         description: Endpoint responsible for the login with number
 *         schema:
 *           $ref: '#/components/schemas/LoginWithNumber'
 *         produces: application/json
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: NotFound
 */
router.post(
  "/login-with-number",
  upload.none(),
  validate(userValidation.loginWithNumber),
  smsInvitation
);

/**
 * @swagger
 * /auth/login-with-email:
 *  post:
 *     tags: [Users]
 *     parameters:
 *       - in: body
 *         name: Request body
 *         required: true
 *         description: Endpoint responsible for the login with email
 *         schema:
 *           $ref: '#/components/schemas/EmailInvitation'
 *         produces: application/json
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: NotFound
 */
router.post(
  "/login-with-email",
  upload.none(),
  validate(userValidation.emailInvitation),
  emailInvitation
);

/**
 * @swagger
 * /auth/otp-verify:
 *  post:
 *     tags: [Users]
 *     parameters:
 *       - in: body
 *         name: Request body
 *         required: true
 *         description: Endpoint responsible for the login
 *         schema:
 *           $ref: '#/components/schemas/VerifyOTP'
 *         produces: application/json
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: NotFound
 */
router.post(
  "/otp-verify",
  upload.none(),
  validate(userValidation.verifyOTP),
  verifyOtp
);

router.post("/email-login-verify", upload.none(), verifyEmail);

/**
 * @swagger
 * /auth/forgot-password:
 *  post:
 *     tags: [Users]
 *     parameters:
 *       - in: body
 *         name: Request body
 *         required: true
 *         description: User can request the forgot password either by "email" or "number".
 *         schema:
 *           $ref: '#/components/schemas/ForgotPasswordInput'
 *         produces: application/json
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: NotFound
 */
router.post(
  "/forgot-password",
  upload.none(),
  validate(userValidation.forgotUser),
  forgotPassword
);

/**
 * @swagger
 * /auth/change-password:
 *  post:
 *     tags: [Users]
 *     parameters:
 *       - in: body
 *         name: Request body
 *         required: true
 *         description: User can change password using email, with a minimum of 8 characters, and at least one number and one special character.
 *         schema:
 *           $ref: '#/components/schemas/ChangePasswordInput'
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
  "/change-password",
  auth(),
  upload.none(),
  validate(userValidation.chagnePasswordUser),
  changePassword
);

/**
 * @swagger
 * /auth/user/update:
 *  patch:
 *     tags: [Users]
 *     parameters:
 *       - name: first_name
 *         description: User first name
 *         in: formData
 *         type: string
 *         required: true
 *         default: test1
 *       - name: last_name
 *         description: User last name
 *         in: formData
 *         type: string
 *         required: true
 *         default: test2
 *       - name: country
 *         description: User country
 *         in: formData
 *         type: string
 *         required: true
 *         default: test
 *       - name: city
 *         description: User city
 *         in: formData
 *         type: string
 *         required: true
 *         default: test
 *       - name: number
 *         description: User contact number
 *         in: formData
 *         type: number
 *         required: true
 *         default: +919999999999
 *       - name: zip_code
 *         description: User zip code
 *         in: formData
 *         type: string
 *         required: true
 *         default: 321654
 *       - name: address
 *         description: User address
 *         in: formData
 *         type: string
 *         required: true
 *         default: test of the day
 *       - name: profile_image
 *         description: User company logo
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
router.patch(
  "/user/update",
  auth(),
  validate(userValidation.updateUser),
  userUpload,
  updateUser
);

/**
 * @swagger
 * /auth/user/get:
 *   get:
 *     tags: [Users]
 *     description: Get user
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: NotFound
 */
router.get("/user/get", auth(), getUser);
router.get("/get/:profile_image", upload.none(), getUserProfilePic);
router.get("/user/get-all", auth(), getAllUser);

module.exports = {
  routes: router,
};
