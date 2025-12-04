
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

router.get("/:id", async (req, res) => {
  try {
    const poc = await POC.findById(req.params.id).populate("client_id", "company_name");
    if (!poc) return res.status(404).json({ message: "POC not found" });
    res.status(200).json({ poc });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { client_id, poc_name, designation, email, location, poc_contact_number } = req.body;

    const existingPOC = await POC.findOne({
      $or: [{ email }, { poc_name }],
      _id: { $ne: id },
    });
    if (existingPOC) {
      return res.status(409).json({ message: "POC Name or Email already exists." });
    }

    const updatedPOC = await POC.findByIdAndUpdate(
      id,
      { client_id, poc_name, designation, email, location, poc_contact_number },
      { new: true }
    );

    if (!updatedPOC) return res.status(404).json({ message: "POC not found" });

    res.status(200).json({ message: "POC updated successfully", poc: updatedPOC });
  } catch (error) {
    console.error("Error updating POC:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});



module.exports = router;
