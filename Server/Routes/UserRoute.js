// const express = require('express');
// const GetProfilePicture = require('../Controllers/Dashboard/GetProfilePic.js');
// const Home = require('../Controllers/Dashboard/Home.js');
// const forget_password = require('../Controllers/UserController/ForgetPassword.js');
// const login = require('../Controllers/UserController/Login.js');
// const register = require('../Controllers/UserController/Register.js');
// const updatePassword = require('../Controllers/UserController/UpdatePassword.js');
// const verifyForgetPwd = require('../Controllers/UserController/verifyForgetpwd.js');
// const VerifyMail = require('../Controllers/UserController/VerifyMail.js');
// const AuthMiddleware = require('../Middleware/AuthMiddleware.js');
// const VerifyToken = require('../Middleware/VerifyToken.js');

// const UserRouter = express.Router();

// // ------------------ AUTH ROUTES ------------------ //

// // Login Route
// UserRouter.post("/login", login);

// // Register Route
// UserRouter.post("/register", register);

// // Verify Email
// UserRouter.get("/verify", VerifyMail);

// // Forget Password
// UserRouter.post("/forget-password", forget_password);

// // Verify Forget Password Token
// UserRouter.post("/verify-forget-pwd", verifyForgetPwd);

// // Update Password
// UserRouter.post("/new-password", updatePassword);

// // ------------------ DASHBOARD / HOME ROUTES ------------------ //

// // Secure route with AuthMiddleware + VerifyToken
// UserRouter.post("/home", AuthMiddleware, VerifyToken);

// // Dashboard home data
// UserRouter.post("/dashboard", Home);

// // Get Profile Picture
// UserRouter.post("/getProfilePic", GetProfilePicture);

// module.exports = UserRouter;


const express = require("express");
const userModel = require("../Models/User_Model.js");
const register = require('../Controllers/UserController/Register.js');
 const login = require('../Controllers/UserController/Login.js');

const UserRouter = express.Router();

UserRouter.post("/register", register);
UserRouter.post("/login", login);

UserRouter.get("/users", async (req, res) => {
  try {
    const { designation } = req.query;
    const filter = designation ? { designation } : {};

    const users = await userModel
      .find(filter)
      .select("f_name last_name email designation isVerified manager")
      .populate("manager", "f_name last_name email");

    res.status(200).json({ success: true, users });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ success: false, error: "Server error while fetching users" });
  }
});

UserRouter.get("/users/managers", async (req, res) => {
  try {
    const managers = await userModel.find({ designation: "Manager" })
      .select("f_name last_name email designation");

    res.status(200).json({ success: true, managers });
  } catch (err) {
    console.error("Error fetching managers:", err);
    res.status(500).json({ success: false, error: "Server error while fetching managers" });
  }
});

UserRouter.get("/users/recruiters", async (req, res) => {
  try {
    const recruiters = await userModel.find({ designation: "Recruiter", isVerified: true })
      .select("f_name last_name email designation manager")
      .populate("manager", "f_name last_name email");

    res.status(200).json({ success: true, recruiters });
  } catch (err) {
    console.error("Error fetching recruiters:", err);
    res.status(500).json({ success: false, error: "Server error while fetching recruiters" });
  }
});

module.exports = UserRouter;