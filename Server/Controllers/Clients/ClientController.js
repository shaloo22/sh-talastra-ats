const Client = require("../../Models/ClientModel");

// GET all clients with their MongoDB ID and company name
const getAllClients = async (req, res) => {
  try {
    // Find all clients and select only _id and company_name fields
    const clients = await Client.find({}, "_id company_name");

    // Format the response: rename _id to client_id
    const formattedClients = clients.map(client => ({
      client_id: client._id,         // MongoDB-generated ID
      company_name: client.company_name
    }));

    res.status(200).json({ clients: formattedClients });
  } catch (error) {
    console.error("Error fetching clients:", error);
    res.status(500).json({ error: "Could not fetch clients" });
  }
};

module.exports = { getAllClients };
