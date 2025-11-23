// backend/routes/GetPOCByClient.js
const express = require("express");
const router = express.Router();
const POC = require("../Models/POCModel"); 

router.post("/by-client", async (req, res) => {
  try {
    const { client_id } = req.body;

    if (!client_id) {
      return res.status(400).json({ message: "Client ID is required" });
    }

    const pocs = await POC.find({ client_id }).select("_id poc_name");

    res.status(200).json({ pocs });
  } catch (error) {
    console.error("Error fetching POCs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
