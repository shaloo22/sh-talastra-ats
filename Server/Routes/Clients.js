const express = require('express');
const CreateClientRouter = require('../Controllers/Clients/CreateClient');
const ListClientRouter = require('../Controllers/Clients/ListClient');
const CreatePOCRouter = require('../Controllers/Clients/CreatePOC');
const ListPOCRouter = require('../Controllers/Clients/ListPOC');
const multer = require('multer');


const ClientRouter = express.Router();

ClientRouter.post("/", CreateClientRouter)

ClientRouter.post("/list", ListClientRouter)

ClientRouter.post("/poc", CreatePOCRouter)

ClientRouter.post("/poc/list", ListPOCRouter)

module.exports = ClientRouter;