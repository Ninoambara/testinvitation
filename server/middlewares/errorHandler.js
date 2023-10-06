function errorHandler(err, req, res, next) {
  let status = 500;
  let message = "Internal Server Error";

  if (err.name === "unauthenticated" || err.name === "JsonWebTokenError") {
    status = 401;
    message = "Invalid Token";
  } else if (err.name === "Invalid username/password") {
    status = 401;
    message = "Invalid username/password";
  } else if (err.name === "username cannot empty") {
    status = 400;
    message = "username cannot empty";
  } else if (err.name === "password cannot empty") {
    status = 400;
    message = "password cannot empty";
  } else if (err.name === "Failed Add New User") {
    status = 400;
    message = "Failed Add New User";
  } else if (err.name === "Job not found") {
    status = 404;
    message = "Job not found";
  } else if (err.name === "user not found") {
    status = 400;
    message = "user not found";
  }

  res.status(status).json({ message });
}

module.exports = errorHandler;
