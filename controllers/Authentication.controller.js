const AuthRouter = require("express").Router();
const UserModel = require("../model/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

// 1. Create Account
AuthRouter.post("/create", async (req, res, next) => {
  try {
    if (!req.body.password || !req.body.email || !req.body.name) {
      return res.status(401).json({
        success: false,
        message: "Bad credentials",
      });
    } else {
      const hash = bcrypt.hashSync(req.body.password, salt);
      req.body.password = hash;
      const NEW_USER = new UserModel(req.body);
      if (NEW_USER) {
        const response = await NEW_USER.save();
        if (response) {
          return res.status(201).json({
            success: true,
            message: "Account creation successful",
            user: response,
          });
        } else {
          throw new Error("Account creation failed");
        }
      }
    }
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: `${getDuplicateElementKey(error.keyPattern)} already taken`,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
});

// 2. SIGN IN
AuthRouter.post("/login", async (req, res, next) => {
  try {
    if (!req.body.password || !req.body.email) {
      return res.status(401).json({
        success: false,
        message: "Bad credentials",
      });
    } else {
      const saved_User = await UserModel.findOne({ email: req.body.email });
      if (saved_User && saved_User._id) {
        if (bcrypt.compareSync(req.body.password, saved_User.password)) {
          const JWT_TOKEN = jwt.sign(
            { uid: saved_User._id },
            process.env.JWT_SECRET_KEY,
            {
              expiresIn: 60 * 2,
              issuer: "APP_SERVER",
              subject: "Token for session",
            }
          );
          res.cookie("1h", JWT_TOKEN, "/");
          return res.status(200).json({
            success: true,
            message: "Login successful",
          });
        } else {
          return res.status(401).json({
            success: false,
            message: "Bad credentials",
          });
        }
      } else {
        return res.status(404).json({
          success: false,
          message: "Account does not exists",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

function getDuplicateElementKey(data = {}) {
  let keys = [];
  if (data) {
    keys = Object.keys(data);
  }
  return keys[0];
}

module.exports = AuthRouter;
