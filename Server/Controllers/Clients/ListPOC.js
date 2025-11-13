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

const listPOC = async (req, res, next) => {
  try {
    // status can be optional
    const { status } = req.body; // destructure status from body
    let query = {};
    if (status) {
      query.status = status; // only filter if status provided
    }

    const pocs = await POC.find(query).populate("client_id", "company_name"); 
    // populate client_id to get company_name for frontend

    if (pocs.length > 0) {
      return res.status(200).json({ pocs });
    } else {
      return res.status(404).json({ message: "No POCs found" });
    }
  } catch (error) {
    console.error("Error fetching POCs:", error);
    return res.status(500).json({ error: "Could not fetch POCs" });
  }
};

module.exports = listPOC;

