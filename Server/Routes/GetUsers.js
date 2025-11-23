const express = require("express");
const userModel = require("../Models/User_Model.js");

const UserRouter = express.Router();
UserRouter.get("/users", async (req, res) => {
  try {
    const { designation } = req.query;
    let filter = {};
    if (designation) filter.designation = designation; 

    const users = await userModel.find(filter)
      .select("f_name last_name email designation isVerified manager")
      .populate("manager", "f_name last_name email");

    res.status(200).json({ users });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Server error" });
  }
});

UserRouter.get("/users/managers", async (req, res) => {
  try {
    const recruiters = await userModel.find({ designation: "Recruiter" });
    console.log("Recruiters in DB:", recruiters);
    res.status(200).json({ recruiters });
  } catch (err) {
    console.error("Error fetching recruiters:", err);
    res.status(500).json({ error: err.message });
  }
});