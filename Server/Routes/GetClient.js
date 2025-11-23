const express = require("express");
const router = express.Router();
const ClientModel = require("../Models/ClientModel"); 

router.get("/all", async (req, res) => {
  try {
    const clients = await ClientModel.find({}); 
    res.status(200).json({ clients }); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch clients" });
  }
});

module.exports = router;
