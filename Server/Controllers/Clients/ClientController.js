const Client = require("../../Models/ClientModel");
const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find({}, "_id company_name");

    const formattedClients = clients.map(client => ({
      client_id: client._id,        
      company_name: client.company_name
    }));
    res.status(200).json({ clients: formattedClients });
  } catch (error) {
    console.error("Error fetching clients:", error);
    res.status(500).json({ error: "Could not fetch clients" });
  }
};
module.exports = { getAllClients };
