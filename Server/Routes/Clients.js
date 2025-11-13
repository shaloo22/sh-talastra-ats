const express = require('express');
const CreateClient = require('../Controllers/Clients/CreateClient');
const ListClient = require('../Controllers/Clients/ListClient');
const CreatePOC = require('../Controllers/Clients/CreatePOC');
const ListPOC = require('../Controllers/Clients/ListPOC');
const { getAllClients } = require('../Controllers/Clients/ClientController'); 

const ClientRouter = express.Router(); 

// Clients
ClientRouter.post("/", CreateClient);      // create client
ClientRouter.post("/list", ListClient);    // list clients with filter
ClientRouter.get("/all", getAllClients);   // get all clients for dropdown

// POCs
ClientRouter.post("/poc", CreatePOC);      // create POC
ClientRouter.post("/poc/list", ListPOC);   // list POCs with filter

module.exports = ClientRouter;
