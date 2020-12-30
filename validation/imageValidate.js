const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = validateImageUpload = (data) => {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';

  if (!Validator.isLength(data.name, { min: 3, max: 15 })) {
    errors.name = 'Name must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
