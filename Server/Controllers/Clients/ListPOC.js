// const express = require("express");
// const router = express.Router();
// const createPOC = require("../Controllers/Clients/createPOC");
// const pocModel = require("../Models/POCModel");

// // Create POC
// router.post("/poc", createPOC);

// // Get all POCs for a client
// router.get("/:clientId/pocs", async (req, res) => {
//   try {
//     const clientId = req.params.clientId;
//     const pocs = await pocModel.find({ client_id: clientId }).lean();
//     res.status(200).json({ pocs });
//   } catch (error) {
//     console.error("Error fetching POCs:", error);
//     res.status(500).json({ error: "Failed to fetch POCs" });
//   }
// });

// module.exports = router;

const POC = require("../../Models/POCModel");

const listPOC = async (req, res) => {
  try {
    const { status, client_id } = req.body; 

    let query = {};
    if (status) query.status = status;
    if (client_id) query.client_id = client_id; 

    const pocs = await POC.find(query)
      .populate("client_id", "company_name")  // give actual client document
      .lean(); //plain JavaScript objects convert

    return res.status(200).json({ pocs });
  } catch (error) {
    console.error("Error fetching POCs:", error);
    return res.status(500).json({ error: "Could not fetch POCs" });
  }
};

module.exports = listPOC;

