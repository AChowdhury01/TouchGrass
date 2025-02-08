const { hashPassword } = require("../helpers/authHelper");
const User = require("../models/user.model");

const registerController = async (req, res) => {
  try {
    const { email, password, name, phone } = req.body;

    if (!email) {
      return res.status(400).send({
        success: false,
        message: "email is required",
      });
    }

    if (!name) {
      return res.status(400).send({
        success: false,
        message: "name is required",
      });
    }

    if (!phone) {
      return res.status(400).send({
        success: false,
        message: "phone is required",
      });
    }

    if (!password || password.length < 6) {
      return res.status(400).send({
        success: false,
        message: "password is required and 6 chararctes long",
      });
    }

    //existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(500).send({
        success: false,
        message: "User already exists",
      });
    }

    //hash password

    const hashedPassword = await hashPassword(password);

    //save user

    const user = await User({
      name,
      email,
      phone,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "Registration is successful. Please login",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Register API",
      error,
    });
  }
};

module.exports = { registerController };
