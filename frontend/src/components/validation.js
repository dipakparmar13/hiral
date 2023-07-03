import { getLocalText } from "../localate/i18nextInit";

const valid = /^\+?\d{0,2}\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
export const validateInvitationModal = (user, flag) => {
  const { mobile_number, customer_account, organization_type, email } = user;
  const errors = {};
  if (!customer_account) {
    errors.customer_account = getLocalText(
      "InvitationModal.Validation.customerAccount"
    );
  }
  if (flag) {
    if (!email.match(regEx)) {
      errors.email = getLocalText("AddressCard.Validation.email");
    }
  } else {
    if (!valid.test(mobile_number)) {
      errors.mobile_number = getLocalText(
        "InvitationModal.Validation.phoneNumber"
      );
    }
  }
  if (!organization_type) {
    errors.organization_type = getLocalText("InvitationModal.Validation.typeOforganization");
  }
  return errors;
};
export const validateEditModal = (user) => {
  const { accountNumber, company, typeOfOrganization, address, phoneNumber } = user;
  const errors = {};
  if (!accountNumber) {
    errors.accountNumber = getLocalText("EditModal.Validation.accountNumber");
  }
  if (!valid.test(phoneNumber)) {
    errors.phoneNumber = getLocalText("InvitationModal.Validation.phoneNumber");
  }
  if (!company) {
    errors.company = getLocalText("EditModal.Validation.company");
  }
  if (!typeOfOrganization) {
    errors.typeOfOrganization = getLocalText("EditModal.Validation.typeOfOrganization");
  }
  if (!address) {
    errors.address = getLocalText("EditModal.Validation.address");
  }
  return errors;
};
export const validateProfile = (user) => {
  const { first_name, last_name, number, company_logo } = user;
  const errors = {};
  if (!first_name || !isNaN(first_name)) {
    errors.first_name = getLocalText("Profile.Validation.firstName");
  }
  if (!valid.test(number)) {
    errors.number = getLocalText("InvitationModal.Validation.phoneNumber");
  }
  if (!last_name || !isNaN(last_name)) {
    errors.last_name = getLocalText("Profile.Validation.surname");
  }
  if (!company_logo || !isNaN(company_logo)) {
    errors.company_logo = getLocalText("Profile.Validation.profile_pic");
  }
  return errors;
};
export const validateAddressCard = (user) => {
  const {
    email,
    address,
    tax_number,
    city,
    country,
    postal_code,
    phone_number,
  } = user;
  const errors = {};
  if (!email.match(regEx)) {
    errors.email = getLocalText("AddressCard.Validation.email");
  }
  if (!valid.test(phone_number)) {
    errors.phone_number = getLocalText(
      "InvitationModal.Validation.phoneNumber"
    );
  }
  if (!address) {
    errors.address = getLocalText("AddressCard.Validation.addres");
  }
  if (!tax_number) {
    errors.tax_number = getLocalText("AddressCard.Validation.taxNumber");
  }
  if (!city) {
    errors.city = getLocalText("AddressCard.Validation.city");
  }
  if (!country) {
    errors.country = getLocalText("AddressCard.Validation.country");
  }
  if (!postal_code) {
    errors.postal_code = getLocalText("AddressCard.Validation.postalCode");
  }
  return errors;
};
export const validateEditMember = (user) => {
  const { name, email, role } = user;
  const errors = {};
  if (!name) {
    errors.name = getLocalText("InviteMemberModal.Validation.email");
  } if (!email.match(regEx)) {
    errors.email = getLocalText("InviteMemberModal.Validation.email");
  }
  if (!role) {
    errors.role = getLocalText("InviteMemberModal.Validation.role");
  }
  return errors;
};
export const validateInviteMemberModal = (user) => {
  const [{ email, role }] = user;
  const errors = {};
  if (!email.match(regEx)) {
    ;
    errors.email = getLocalText("InviteMemberModal.Validation.email");
  }
  if (!role) {
    errors.role = getLocalText("InviteMemberModal.Validation.role");
  }
  return errors;
};