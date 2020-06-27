const { validationResult } = require('express-validator');

exports.runValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errMessages = [];
    errors.array().forEach((error) => {
      console.log(error.msg);
      errMessages.push(error.msg);
    });
    return res.status(422).json({ error: errMessages });
  }
  next();
};
