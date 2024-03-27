const jwt = require("jsonwebtoken");

function LoginShield(req, res, next) {
  console.log(req.headers.cookie);
  try {
    if (req.headers.cookie) {
      const token = req.headers.cookie.split("=")[1];
      const isTokenValid = jwt.verify(token, process.env.JWT_SECRET_KEY, {
        complete: true,
      });
      if (isTokenValid) {
        next();
      }
    } else {
      return res.status(401).json({ message: "Login to continue" });
    }
  } catch (error) {
    return res.status(401).json({
      message: "Token expired",
    });
  }
}

module.exports = LoginShield;
