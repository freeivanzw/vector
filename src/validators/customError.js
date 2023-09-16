class CustomError extends Error {
  constructor(status, message) {
    super(message);

    this.statusCode = status;
  }
}

class BadRequestError extends CustomError {
  constructor(message = 'Bad request') {

    super(400, message);
  }
}

class NotFoundError extends CustomError {
  constructor(message = 'Not Found') {
    super(404, message);
  }
}

module.exports = {
  CustomError,
  BadRequestError,
  NotFoundError,
};