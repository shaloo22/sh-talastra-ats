const pocModel = require("../../Models/POCModel");
const express = require("express");
const app = express();

const createPOC = async (req, res, next) => {
  try {
    const { client_id, location, email, poc_name, poc_contact_number, designation } = req.body;

    console.log(" Received POC Data:", req.body);

    
    if (!client_id || !location || !email || !poc_name || !poc_contact_number || !designation) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Enter email in proper format (abc@domain.com)" });
    }

   
    const numStr = String(poc_contact_number);
    if (!/^\d{10}$/.test(numStr)) {
      return res.status(400).json({ error: "Contact Number must be 10 digits" });
    }
    const existingPOC = await pocModel.findOne({
      $or: [{ poc_name }, { email }],
    });
    if (existingPOC) {
      return res.status(409).json({ error: "POC Name or Email already exists." });
    }
    const poc = new pocModel({
      client_id,
      location,
      email,
      poc_name,
      poc_contact_number: Number(poc_contact_number),
      designation, 
    });

    await poc.save();

    console.log(" POC Created Successfully:", poc);
    return res.status(200).json({ message: "POC Created Successfully!" });

  } catch (error) {
    console.error(" Error creating POC:", error);
    return res.status(500).json({ error: "An error occurred while saving the POC." });
  }
};
module.exports = createPOC;



