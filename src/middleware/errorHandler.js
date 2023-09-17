const { CustomError } = require('../validators/customError');

module.exports = (err, req, res, next) => {

  if (err instanceof CustomError) {

    return res.status(err.statusCode).json({
      success: false,
      message: err.message
    });
  }

  return res.status(500).json({ message: err.message });
};