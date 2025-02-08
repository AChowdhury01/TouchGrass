const express = require("express");
const { registerController } = require("../controllers/register.controller");
const { loginController } = require("../controllers/login.controller");

//router object
const router = express.Router();

//routes
//register
router.post("/register", registerController);
//signup
router.post("/login", loginController);

module.exports = router;
