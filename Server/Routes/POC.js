const express = require("express");
const router = express.Router();
const pocModel = require("../Models/POCModel");

router.post("/list", async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const pocs = await pocModel.find({ status }).lean();

    return res.status(200).json({ clients: pocs }); 
  } catch (error) {
    console.error("Error fetching POCs:", error);
    return res.status(500).json({ error: "Failed to fetch POCs" });
  }
  
});

module.exports = router;

