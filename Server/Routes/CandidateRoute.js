const express = require("express");
const router = express.Router();
const multer = require("multer");
const mongoose = require("mongoose");

const Candidate = require("../Models/CandidateModel");
const CreateCandidate = require("../Controllers/Candidate/CreateCandidate");
const GetAllCandidates = require("../Controllers/Candidate/GetAllCandidates");
const GetCandidateById = require("../Controllers/Candidate/GetCandidateById");
const UpdateCandidate = require("../Controllers/Candidate/UpdateCandidate");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.post(
  '/create',
  upload.fields([
    { name: 'cv_attachment', maxCount: 1 },  
    { name: 'jd_attachments', maxCount: 5 } 
  ]),
  CreateCandidate
);
router.put("/update/:id", upload.single("cv_attachment"), UpdateCandidate);
router.get("/get-all", GetAllCandidates);
router.get("/:id", GetCandidateById);
router.post("/get-single", GetCandidateById);

router.post("/filter", async (req, res) => {
  try {
    const { job_id, client_id, poc_id } = req.body;

    if (!job_id) return res.status(400).json({ message: "Job ID is required" });

    const query = { job_id };
    if (client_id) query.client_id = client_id;
    if (poc_id) query.poc_id = poc_id;
const candidates = await Candidate.find(query)
  .populate("client", "company_name")
  .populate("poc", "poc_name")
  .populate({
    path: "job_id",
    select: "position client poc",
    populate: [
      { path: "client", select: "company_name" },
      { path: "poc", select: "poc_name" }
    ]
  })
  .lean();


    res.status(200).json(candidates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch candidates" });
  }
});

module.exports = router;
