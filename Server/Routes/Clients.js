const express = require('express');
const CreateClient = require('../Controllers/Clients/CreateClient');
const ListClient = require('../Controllers/Clients/ListClient');
const CreatePOC = require('../Controllers/Clients/CreatePOC');
const ListPOC = require('../Controllers/Clients/ListPOC');
const { getAllClients } = require('../Controllers/Clients/ClientController'); 
const ClientModel = require('../Models/ClientModel'); // Add this
const ClientRouter = express.Router(); 

// Clients
ClientRouter.post("/", CreateClient);      
ClientRouter.post("/list", ListClient);    
ClientRouter.get("/all", getAllClients);   

ClientRouter.get("/:id", async (req, res) => {
  try {
    const client = await ClientModel.findById(req.params.id);
    if (!client) return res.status(404).json({ message: "Client not found" });
    res.status(200).json({ client });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

ClientRouter.put("/update/:id", async (req, res) => {
  try {
    const client = await ClientModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!client) return res.status(404).json({ message: "Client not found" });
    res.status(200).json({ client });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// POCs
ClientRouter.post("/poc", CreatePOC);      
ClientRouter.post("/poc/list", ListPOC);  

module.exports = ClientRouter;
