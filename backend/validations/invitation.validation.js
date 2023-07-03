const Joi = require("joi");
const { emailId, validatePhoneNumber } = require("./custom.validation");

const createInvitation = {
  user: Joi.object().keys({
    id: Joi.string().required(),
  }),
  files: Joi.object().keys({
    logo: Joi.string().required(),
  }),
  body: Joi.object().keys({
    customer_account: Joi.string().required(),
    email: Joi.string().required().custom(emailId),
    invitation_code: Joi.number().required(),
    status: Joi.number().required(),
    organization_type: Joi.string().required(),
    supplier_id: Joi.string().required(),
    mobile_number: Joi.string().required().custom(validatePhoneNumber),
    supplier_long: Joi.number().required(),
    supplier_lat: Joi.number().required(),
    supplier_phone: Joi.number().required(),
  }),
};

const invitationSend = {
  user: Joi.object().keys({
    id: Joi.string().required(),
  }),
  body: Joi.object().keys({
    customer_account: Joi.string().required(),
    mobile_number: Joi.string().custom(validatePhoneNumber),
    email: Joi.string().custom(emailId),
    organization_type: Joi.string().required(),
    organization_id: Joi.string().required(),
  }),
};

const verifyInvitation = {
  user: Joi.object().keys({
    id: Joi.string().required(),
  }),
  body: Joi.object().keys({
    invitation_code: Joi.string().required(),
  }),
};
const updateInvitation = {
  body: Joi.object().keys({
    id: Joi.string().required(),
    organization_type: Joi.string().required(),
  }),
};

/**
 * @swagger
 * components:
 *  schemas:
 *    SendSMSInput:
 *      type: object
 *      required:
 *        - message
 *        - number
 *      properties:
 *        message:
 *          type: string
 *          default: I have send invitation code --> 13546879
 *        number:
 *          type: string
 *          default: 9865743215
 */
const SMS = {
  body: Joi.object().keys({
    message: Joi.string().required(),
    number: Joi.string().required().custom(validatePhoneNumber),
  }),
};

const getInvitationByStatus = {
  query: Joi.object().keys({
    email: Joi.string(),
    mobile_number: Joi.number(),
    status: Joi.number().required(),
    page: Joi.number().required(),
    limit: Joi.number().required(),
    search_name: Joi.string(),
  }),
};

module.exports = {
  createInvitation,
  invitationSend,
  verifyInvitation,
  updateInvitation,
  SMS,
  getInvitationByStatus,
};
