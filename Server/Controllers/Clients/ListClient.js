const Client = require("../../Models/ClientModel");

const listClient = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status)
      return res.status(400).json({ message: "Status required" });

    const clients = await Client.find({ status });

    return res.status(200).json({ clients });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = listClient;
