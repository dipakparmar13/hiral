// const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");

const auth = () => async (req, res, next) => {
  const headerToken = req.headers.authorization;
  if (!headerToken) {
    return res.status(400).json({
      status: 401,
      message: "No token provided.",
    });
  }
  if (headerToken && headerToken.split(" ")[0] !== "Bearer") {
    return res.status(400).json({
      status: 401,
      message: "Invalid token.",
    });
  }
  const token = headerToken && headerToken.split(" ")[1];
  jwt.verify(token, config.jwtSecret, async (err, user) => {
    if (user) {
      req.user = { email: user.email, id: user.id, number: user.number };
      next();
    } else {
      return res.status(400).json({
        status: 401,
        message: "Unauthorized",
      });
    }
  });
};
module.exports = auth;
