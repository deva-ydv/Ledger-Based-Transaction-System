const {registerSchema, loginSchema} = require("../middlewares/zod");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const emailService = require('../services/emailService');
const tokenBlackListModel = require("../models/blackListModel");

//  User Register controller
//  POST /api/auth/register
const userRegister = async (req, res) => {
  try {
    const { name, email, password } = registerSchema.parse(req.body);

    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(422).json({
        message: "User exists already",
      });
    }

    const user = await userModel.create({ name, email, password });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });

    await emailService.sendRegistrationEmail(user.email, user.name)

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

//  User login controller
//  POST /api/auth/login

const userLogin = async (req, res) => {
    const { email, password } = loginSchema.parse(req.body)
    const user = await userModel.findOne({email}).select("+password")

    if(!user){
        return res.status(401).json({
            message: 'Email or Passoword is INVALID',
        })
    }

    const isValidPass = await user.isPasswordCorrect(password)

    if(!isValidPass){
        return res.status(401).json({
            message: 'Email or Passoword is INVALID',
        })
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });

};


const userLogout = async (req, res) =>{
  const token = req.cookies.token || req.headers.authorization?.split(" ")[ 1 ]

    if (!token) {
        return res.status(200).json({
            message: "User logged out successfully"
        })
    }

    await tokenBlackListModel.create({
        token: token
    })

    res.clearCookie("token")

    res.status(200).json({
        message: "User logged out successfully"
    })
}
module.exports = {
  userRegister,
  userLogin,
  userLogout
};
