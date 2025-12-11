const express = require("express");
const userModel = require("../Models/User_Model.js");

const UserRouter = express.Router();

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
