const express = require('express');
const CreateClientRouter = require('../Controllers/Clients/CreateClient');
const ListClientRouter = require('../Controllers/Clients/ListClient');
const CreatePOCRouter = require('../Controllers/Clients/CreatePOC');
const ListPOCRouter = require('../Controllers/Clients/ListPOC');
const { getAllClients } = require('../Controllers/Clients/ClientController'); // your getAllClients function

const ClientRouter = express.Router(); // <-- declare the router first

// Routes
ClientRouter.post("/", CreateClientRouter);
ClientRouter.post("/list", ListClientRouter);
ClientRouter.post("/poc", CreatePOCRouter);
ClientRouter.post("/poc/list", ListPOCRouter);
ClientRouter.get("/all", getAllClients); // <-- use after declaration

module.exports = ClientRouter;
