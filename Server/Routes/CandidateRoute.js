// const express = require("express");
// const router = express.Router();

// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });

// const CreateCandidate = require("../Controllers/Candidate/CreateCandidate");
// const GetAllCandidates = require("../Controllers/Candidate/GetAllCandidates");
// const GetCandidateById = require("../Controllers/Candidate/GetCandidateById");
// const UpdateCandidate = require("../Controllers/Candidate/UpdateCandidate");

// router.post(
//   "/create",
//   upload.fields([
//     { name: "cv_attachment", maxCount: 1 },
//     { name: "jd_attachments", maxCount: 5 },
//   ]),
//   CreateCandidate
// );

// router.put(
//   "/update/:id",
//   upload.single("cv_attachment"),
//   UpdateCandidate
// );

// router.get("/get-all", GetAllCandidates);

// router.get("/:id", GetCandidateById);

// router.post("/get-single", GetCandidateById);

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const Candidate = require("../../Models/CandidateModel");

// // Multer setup for file uploads
// const upload = multer({ dest: "uploads/" });


// // ----------------------------
// // Create Candidate
// // ----------------------------
// router.post(
//   "/create",
//   upload.fields([
//     { name: "cv_attachment", maxCount: 1 },
//     { name: "jd_attachments", maxCount: 5 },
//   ]),
//   async (req, res) => {
//     try {
//       const data = req.body;

//       // Add file paths if uploaded
//       if (req.files["cv_attachment"]) {
//         data.cv_attachment = req.files["cv_attachment"][0].path;
//       }
//       if (req.files["jd_attachments"]) {
//         data.jd_attachments = req.files["jd_attachments"].map(f => f.path);
//       }

//       const candidate = await Candidate.create(data);
//       res.status(201).json(candidate);
//     } catch (err) {
//       console.error("Create candidate error:", err);
//       res.status(500).json({ message: err.message });
//     }
//   }
// );

// // ----------------------------
// // Update Candidate
// // ----------------------------
// router.put(
//   "/update/:id",
//   upload.single("cv_attachment"),
//   async (req, res) => {
//     try {
//       const data = req.body;
//       if (req.file) {
//         data.cv_attachment = req.file.path;
//       }

//       const candidate = await Candidate.findByIdAndUpdate(req.params.id, data, { new: true });
//       res.status(200).json(candidate);
//     } catch (err) {
//       console.error("Update candidate error:", err);
//       res.status(500).json({ message: err.message });
//     }
//   }
// );

// // ----------------------------
// // Get all candidates
// // ----------------------------
// router.get("/get-all", async (req, res) => {
//   try {
//     const candidates = await Candidate.find()
//       .populate({
//         path: "job_id",
//         populate: [
//           { path: "client", select: "company_name" },
//           { path: "poc", select: "poc_name" }
//         ]
//       })
//       .lean();

//     res.status(200).json(candidates);
//   } catch (err) {
//     console.error("Get all candidates error:", err);
//     res.status(500).json({ message: err.message });
//   }
// });

// // ----------------------------
// // Get candidate by ID
// // ----------------------------
// router.post("/get-single", async (req, res) => {
//   try {
//     const { _id } = req.body;
//     if (!_id) return res.status(400).json({ message: "Candidate ID required" });

//     const candidate = await Candidate.findById(_id)
//       .populate({
//         path: "job_id",
//         populate: [
//           { path: "client", select: "company_name" },
//           { path: "poc", select: "poc_name" }
//         ]
//       })
//       .lean();

//     if (!candidate) return res.status(404).json({ message: "Candidate not found" });

//     res.status(200).json(candidate);
//   } catch (err) {
//     console.error("Get candidate by ID error:", err);
//     res.status(500).json({ message: err.message });
//   }
// });

// // ----------------------------
// // Filter candidates (Job → Client → POC)
// // ----------------------------
// router.post("/filter", async (req, res) => {
//   try {
//     const { job_id, client_id, poc_id } = req.body;
//     let query = {};

//     if (job_id) query.job_id = job_id;
//     if (client_id) query.client_id = client_id;
//     if (poc_id) query.poc_id = poc_id;

//     const candidates = await Candidate.find(query)
//       .populate({
//         path: "job_id",
//         populate: [
//           { path: "client", select: "company_name" },
//           { path: "poc", select: "poc_name" }
//         ]
//       })
//       .lean();

//     res.status(200).json(candidates);
//   } catch (err) {
//     console.error("Candidate filter error:", err);
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const Candidate = require("../Models/CandidateModel");
const CreateCandidate = require("../Controllers/Candidate/CreateCandidate");
const GetAllCandidates = require("../Controllers/Candidate/GetAllCandidates");
const GetCandidateById = require("../Controllers/Candidate/GetCandidateById");
const UpdateCandidate = require("../Controllers/Candidate/UpdateCandidate");

// -------------------------
// Candidate CRUD
// -------------------------
router.post(
  "/create",
  upload.fields([
    { name: "cv_attachment", maxCount: 1 },
    { name: "jd_attachments", maxCount: 5 },
  ]),
  CreateCandidate
);

router.put("/update/:id", upload.single("cv_attachment"), UpdateCandidate);

router.get("/get-all", GetAllCandidates);
router.get("/:id", GetCandidateById);
router.post("/get-single", GetCandidateById);

const mongoose = require("mongoose");

router.post("/filter", async (req, res) => {
  try {
    const { job_id, client_id, poc_id, status } = req.body;

    let query = {};
    if (job_id) query.job_id = mongoose.Types.ObjectId(job_id);
    if (client_id) query.client = mongoose.Types.ObjectId(client_id);
    if (poc_id) query.poc = mongoose.Types.ObjectId(poc_id);
    if (status) query.status = status;
    const candidates = await Candidate.find(query)
      .populate({
        path: "job_id",
        select: "position client poc",
        populate: [
          { path: "client", select: "company_name" },
          { path: "poc", select: "poc_name" },
        ],
      })
      .lean();

    if (!candidates.length) {
      return res.status(404).json({ message: "Candidate not found", candidates: [] });
    }

    return res.status(200).json({ candidates });
  } catch (err) {
    console.error("Candidate filter error:", err);
    return res.status(500).json({ message: err.message });
  }
});


module.exports = router;
