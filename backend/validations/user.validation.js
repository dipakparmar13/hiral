const Joi = require("joi");
const {
  emailId,
  password,
  validatePhoneNumber,
} = require("./custom.validation");

/**
 * @swagger
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - first_name
 *        - last_name
 *        - device_token
 *        - device_type
 *      properties:
 *        first_name:
 *          type: string
 *          default: test1
 *        last_name:
 *          type: string
 *          default: test2
 *        number:
 *          type: string
 *          default: +919093578956
 *        device_type:
 *          type: string
 *          default: web
 *        device_token:
 *          type: string
 *          default: asdkajskldjalsd
 *        register_type:
 *          type: string
 *          default: supplier
 *        login_type:
 *          type: string
 *          default: email
 */
const createUser = {
  body: Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string(),
    company_name: Joi.string(),
    number: Joi.string().required().custom(validatePhoneNumber),
    address: Joi.string().required(),
    device_token: Joi.string().required(),
    device_type: Joi.string().required(),
    register_type: Joi.string().required(),
    login_type: Joi.string().required(),
    user_type: Joi.string().required(),
  }),
};

/**
 * @swagger
 * components:
 *  schemas:
 *    LoginUserInput:
 *      type: object
 *      required:
 *        - email
 *        - password
 *        - device_token
 *        - register_type
 *        - device_type
 *      properties:
 *        email:
 *          type: string
 *          default: test@yopmail.com
 *        password:
 *          type: string
 *          default: Test@123
 *        device_token:
 *          type: string
 *          default: tokenwerlkwjrlkwerlk23klkjrler
 *        register_type:
 *            type: string
 *            default: supplier
 *        device_type:
 *            type: string
 *            default: web
 */
const loginUser = {
  body: Joi.object().keys({
    email: Joi.string().required().custom(emailId),
    password: Joi.string().required().custom(password),
    device_token: Joi.string(),
    device_type: Joi.string(),
    register_type: Joi.string().required(),
  }),
};

/**
 * @swagger
 * components:
 *  schemas:
 *    LoginWithNumber:
 *      type: object
 *      required:
 *        - number
 *        - type
 *      properties:
 *        number:
 *          type: string
 *          default: +919908569854
 *        type:
 *          type: string
 *          default: buyer
 */
const loginWithNumber = {
  body: Joi.object().keys({
    number: Joi.string().required().custom(validatePhoneNumber),
  }),
};

/**
 * @swagger
 * components:
 *  schemas:
 *    VerifyOTP:
 *      type: object
 *      required:
 *        - otp
 *        - number
 *      properties:
 *        number:
 *          type: string
 *          default: +919638527418
 *        otp:
 *          type: string
 *          default: 65498
 */
const verifyOTP = {
  number: Joi.string().required().custom(validatePhoneNumber),
  otp: Joi.string().required().min(5).max(5),
};

/**
 * @swagger
 * components:
 *  schemas:
 *    ForgotPasswordInput:
 *      type: object
 *      required:
 *        - email
 *        - number
 *      properties:
 *        email:
 *          type: string
 *          default: test@yopmail.com
 *        number:
 *          type: number
 *          default: +919875421360
 */
const forgotUser = {
  body: Joi.object().keys({
    email: Joi.string().custom(emailId),
    number: Joi.string().required().custom(validatePhoneNumber),
  }),
};

/**
 * @swagger
 * components:
 *  schemas:
 *    EmailInvitation:
 *      type: object
 *      required:
 *        - email
 *      properties:
 *        email:
 *          type: string
 *          default: test@yopmail.com
 */
const emailInvitation = {
  body: Joi.object().keys({
    email: Joi.string().custom(emailId),
    token: Joi.string(),
  }),
};

/**
 * @swagger
 * components:
 *  schemas:
 *    ChangePasswordInput:
 *      type: object
 *      required:
 *        - email
 *        - number
 *      properties:
 *        email:
 *          type: string
 *          default: test@yopmail.com
 *        password:
 *          type: string
 *          default: test@123
 */
const chagnePasswordUser = {
  user: Joi.object().keys({
    id: Joi.string().required(),
  }),
  body: Joi.object().keys({
    email: Joi.string().required().custom(emailId),
    password: Joi.string().required().custom(password),
  }),
};

const updateUser = {
  user: Joi.object().keys({
    id: Joi.string().required(),
  }),
  files: Joi.object().keys({
    profile_image: Joi.string(),
  }),
  body: Joi.object().keys({
    first_name: Joi.string(),
    last_name: Joi.string(),
    email: Joi.string(),
    number: Joi.string().custom(validatePhoneNumber),
    // address: Joi.string(),
  }),
};

module.exports = {
  createUser,
  loginUser,
  forgotUser,
  updateUser,
  chagnePasswordUser,
  loginWithNumber,
  verifyOTP,
  emailInvitation,
};
