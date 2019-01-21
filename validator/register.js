const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 to 30";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name should not be empty";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email format is wrong";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password should not be empty";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password = "Confirm Password should be empty";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 12 })) {
    errors.password = "Password should be between 6 to 12";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Password not match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
