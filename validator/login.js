const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email should not be empty";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email format is wrong";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password should not be empty";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
