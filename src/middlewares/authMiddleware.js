const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized access or token is missing",
    });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decode.userId);
    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }
    req.user = user;

    return next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized access or token is invalid",
    });
  }
}

async function authSystemUserMiddleware(req, res, next) {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Token missing" });
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        // 1. Find the user
        const user = await userModel.findById(decode.userId).select('+systemUser');
        
        // 2. Check if user exists AND is a system user 
        if (!user || !user.systemUser) {
            return res.status(401).json({
                message: "system user not found",
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

module.exports = {authMiddleware, authSystemUserMiddleware};
