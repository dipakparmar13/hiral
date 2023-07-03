const emailId = (value, helpers) => {
  if (
    !value.match(
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    )
  ) {
    return helpers.message("Email is invalid.");
  }
  return value;
};

const password = (value, helpers) => {
  if (!value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[^a-zA-Z0-9])(?!.*\s).{7,15}$/)) {
    return helpers.message(
      "Password min 8 characters that contain at least one number and one special character."
    );
  }
  return value;
};
const validatePhoneNumber = (phoneNumber, helpers) => {
  if (phoneNumber.length >= 12) {
    var pattern = new RegExp("^\\d{10}$");
    if (pattern.test(phoneNumber.slice(phoneNumber.length - 10))) {
      return phoneNumber;
    } else {
      return helpers.message("Please enter valide number");
    }
  } else {
    return helpers.message("Please enter valide number");
  }
};

module.exports = {
  emailId,
  password,
  validatePhoneNumber,
};
