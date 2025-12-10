const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const POC = require("../Models/POCModel");

router.post("/by-client", async (req, res) => {
  try {
    let { client_id } = req.body;

    if (!client_id) {
      return res.status(400).json({ message: "Client ID is required" });
    }

    if (typeof client_id === "object") {
      client_id = client_id._id || client_id.client_id;
    }

    if (!mongoose.Types.ObjectId.isValid(client_id)) {
      return res.status(400).json({ message: "Invalid Client ID" });
    }

    const pocs = await POC.find({ client_id }).populate("client_id", "company_name").lean();
    const formatted = pocs.map((poc) => ({
      ...poc,
      client_id: {
        client_id: poc.client_id?._id || client_id, 
        company_name: poc.client_id?.company_name || "",
      },
    }));

    res.status(200).json({ pocs: formatted });
  } catch (error) {
    console.error("Error fetching POCs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid POC ID" });
    }

    const poc = await POC.findById(id).populate("client_id", "company_name").lean();

    if (!poc) {
      return res.status(404).json({ message: "POC not found" });
    }

    res.status(200).json({ poc });
  } catch (error) {
    console.error("Error fetching POC:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { poc_name, designation, email, location, poc_contact_number } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid POC ID" });

    const existing = await POC.findOne({
      $or: [{ poc_name }, { email }],
      _id: { $ne: id },
    });
    if (existing) return res.status(409).json({ message: "POC Name or Email already exists." });

    const updatedPOC = await POC.findByIdAndUpdate(
      id,
      { poc_name, designation, email, location, poc_contact_number },
      { new: true } 
    );

    if (!updatedPOC) return res.status(404).json({ message: "POC not found" });

    res.status(200).json({ message: "POC updated successfully", poc: updatedPOC });
  } catch (err) {
    console.error("Error updating POC:", err);
    res.status(500).json({ message: "Failed to update POC" });
  }
});


module.exports = router;
