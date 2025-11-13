const clientModel = require("../../Models/ClientModel");

const createClient = async (req, res, next) => {
  const { company_name, location, website, brief } = req.body;

  if (!company_name || !location || !website) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const existingUser = await clientModel.findOne({
    $or: [{ company_name }, { website }],
  });

  if (existingUser) {
    return res.status(409).json({ error: "Client Name or Website already exists." });
  }

  const client = new clientModel({
    company_name,
    location,
    website,
    brief: brief || "", // optional
  });

  try {
    await client.save();
    return res.status(200).json({ message: "Client Registered Successfully!", client });
  } catch (error) {
    console.log("An error occurred:", error);
    return res.status(500).json({ error: "An error occurred while saving the client." });
  }
};

module.exports = createClient;
