const express = require('express');
const CreateClient = require('../Controllers/Clients/CreateClient');
const ListClient = require('../Controllers/Clients/ListClient');
const CreatePOC = require('../Controllers/Clients/CreatePOC');
const ListPOC = require('../Controllers/Clients/ListPOC');
const { getAllClients } = require('../Controllers/Clients/ClientController'); 

const ClientRouter = express.Router(); 

// Clients
ClientRouter.post("/", CreateClient);      
ClientRouter.post("/list", ListClient);    
ClientRouter.get("/all", getAllClients);   

// POCs
ClientRouter.post("/poc", CreatePOC);      
ClientRouter.post("/poc/list", ListPOC);   

module.exports = ClientRouter;
