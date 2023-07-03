const Joi = require("joi");
const { emailId } = require("./custom.validation");

const createOrganization = {
  user: Joi.object().keys({
    id: Joi.string().required(),
  }),
  files: Joi.object().keys({
    logo: Joi.string().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().custom(emailId),
    phone_number: Joi.number().required(),
    address: Joi.string().required(),
    tax_number: Joi.number().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    postal_code: Joi.number().required(),
  }),
};
const createFirstPartOrganization = {
  user: Joi.object().keys({
    id: Joi.string().required(),
  }),
  files: Joi.object().keys({
    logo: Joi.string().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};
const createSecoundPartOrganization = {
  user: Joi.object().keys({
    id: Joi.string().required(),
  }),
  body: Joi.object().keys({
    email: Joi.string().required().custom(emailId),
    phone_number: Joi.number().required(),
    address: Joi.string().required(),
    tax_number: Joi.number().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    postal_code: Joi.number().required(),
  }),
};

const updateOrganization = {
  user: Joi.object().keys({
    id: Joi.string().required(),
  }),
  files: Joi.object().keys({
    logo: Joi.string(),
  }),
  body: Joi.object().keys({
    id: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().required().custom(emailId),
    phone_number: Joi.number().required(),
    address: Joi.string().required(),
    tax_number: Joi.number().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    postal_code: Joi.number().required(),
  }),
};
const deleteOrganization = {
  query: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

module.exports = {
  // createOrganization,
  updateOrganization,
  deleteOrganization,
};
