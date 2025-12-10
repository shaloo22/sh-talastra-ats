const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const pocModel = require("../Models/POCModel"); 


router.post("/by-client", async (req, res) => {
  try {
    let { client_id } = req.body;

    if (!client_id) return res.status(400).json({ message: "Client ID is required" });

    if (typeof client_id === "object") client_id = client_id._id || client_id.client_id;

    if (!mongoose.Types.ObjectId.isValid(client_id)) return res.status(400).json({ message: "Invalid Client ID" });

    const pocs = await pocModel.find({ client_id }).select("_id poc_name");
    res.status(200).json({ pocs });
  } catch (error) {
    console.error("Error fetching POCs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.post("/list-by-status", async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) return res.status(400).json({ message: "Status is required" });

    const pocs = await pocModel.find({ status }).populate("client_id", "company_name").lean();

    const formattedPocs = pocs.map(poc => ({
      ...poc,
      _id: poc._id.toString(),
      client_id: poc.client_id ? { ...poc.client_id, _id: poc.client_id._id.toString() } : null,
    }));

    res.status(200).json({ pocs: formattedPocs });
  } catch (error) {
    console.error("Error fetching POCs by status:", error);
    res.status(500).json({ error: "Failed to fetch POCs" });
  }
});




module.exports = router;
