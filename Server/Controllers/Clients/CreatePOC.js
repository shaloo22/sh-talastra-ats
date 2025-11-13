const pocModel = require("../../Models/POCModel");

const createPOC = async (req, res) => {
  try {
    const { client_id, location, email, poc_name, poc_contact_number, designation } = req.body;

    if (!client_id || !location || !email || !poc_name || !poc_contact_number || !designation)
      return res.status(400).json({ error: "All fields are required." });

    const existingPOC = await pocModel.findOne({
      $or: [{ poc_name }, { email }],
    });
    if (existingPOC)
      return res.status(409).json({ error: "POC Name or Email already exists." });

    const poc = new pocModel({
      client_id,
      location,
      email,
      poc_name,
      poc_contact_number,
      designation,
    });

    await poc.save();
    return res.status(200).json({ message: "POC Created Successfully!" });
  } catch (error) {
    console.error("Error creating POC:", error);
    return res.status(500).json({ error: "An error occurred while saving the POC." });
  }
};

module.exports = createPOC;
