// const express = require("express");
// const router = express.Router();
// const pocModel = require("../Models/POCModel");

// router.post("/list", async (req, res) => {
//   try {
//     const { status } = req.body;

//     if (!status) {
//       return res.status(400).json({ message: "Status is required" });
//     }

//     const pocs = await pocModel
//       .find({ status })
//       .populate("client_id", "company_name") 
//       .lean();

//     return res.status(200).json({ pocs }); 
//   } catch (error) {
//     console.error("Error fetching POCs:", error);
//     return res.status(500).json({ error: "Failed to fetch POCs" });
//   }
// });

// module.exports = router;
// const express = require("express");
// const router = express.Router();
// const POC = require("../Models/POCModel");
// router.post("/list", async (req, res) => {
//   try {
//     const { status, client_id } = req.body;
//     if (!status && !client_id) {
//       return res.status(400).json({ message: "Status or client_id required" });
//     }

//     const filter = {};
//     if (status) filter.status = status;
//     if (client_id) filter.client_id = client_id;

//     const pocs = await POC.find(filter)
//       .populate("client_id", "company_name")
//       .lean();

//     return res.status(200).json({ pocs });
//   } catch (error) {
//     console.error("Error fetching POCs:", error);
//     return res.status(500).json({ error: "Failed to fetch POCs" });
//   }
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const pocModel = require("../Models/POCModel");
router.post("/list", async (req, res) => {
  try {
    const { client_id } = req.body;
    if (!client_id) return res.status(400).json({ message: "Client ID is required" });

    const pocs = await pocModel
      .find({ client_id: mongoose.Types.ObjectId(client_id) })
      .populate("client_id", "company_name")
      .lean();

    const formattedPocs = pocs.map((poc) => ({
      ...poc,
      _id: poc._id.toString(),
      client_id: poc.client_id ? { ...poc.client_id, _id: poc.client_id._id.toString() } : null,
    }));

    return res.status(200).json({ pocs: formattedPocs });
  } catch (error) {
    console.error("Error fetching POCs by client:", error);
    return res.status(500).json({ error: "Failed to fetch POCs" });
  }
});


router.post("/list", async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) return res.status(400).json({ message: "Status is required" });

    const pocs = await pocModel
      .find({ status })
      .populate("client_id", "company_name")
      .lean();

    const formattedPocs = pocs.map((poc) => ({
      ...poc,
      _id: poc._id.toString(),
      client_id: poc.client_id ? { ...poc.client_id, _id: poc.client_id._id.toString() } : null,
    }));

    return res.status(200).json({ pocs: formattedPocs });
  } catch (error) {
    console.error("Error fetching POCs by status:", error);
    return res.status(500).json({ error: "Failed to fetch POCs" });
  }
});

module.exports = router;
