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
    cb(null, "uploads/cv");
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
    { name: 'jd_attach_jd', maxCount: 5 }
  ]),
  CreateCandidate
);
router.put("/update/:id", upload.single("cv_attachment"), UpdateCandidate);
router.get("/get-all", GetAllCandidates);
router.get("/:id", GetCandidateById);
router.post("/get-single", GetCandidateById);

router.post("/filter", async (req, res) => {
  try {
    let { client_id, poc_id, job_id } = req.body;


    if (!client_id || !poc_id || !job_id) {
      return res
        .status(400)
        .json({ message: "Client, POC, and Job are required" });
    }

    const filter = {};
    if (mongoose.Types.ObjectId.isValid(client_id)) filter.client = client_id;
    if (mongoose.Types.ObjectId.isValid(poc_id)) filter.poc = poc_id;
    if (mongoose.Types.ObjectId.isValid(job_id)) filter.job_id = job_id;

    const candidates = await Candidate.find(filter)
      .populate("client", "company_name")
      .populate("poc", "poc_name")
      .populate("job_id", "position")
      .lean();

    const formatted = candidates.map((c) => ({
      _id: c._id,
      candidate_name: c.candidate_name,
      client_name: c.client?.company_name || "-",
      poc_name: c.poc?.poc_name || "-",
      job_position: c.job_id?.position || "-",
      email: c.email || "-",
      contact_num: c.contact_num || "-",
    }));

    res.status(200).json(formatted);
  } catch (err) {
    console.error("Error fetching candidates:", err);
    res.status(500).json({ message: "Failed to fetch candidates" });
  }
});

router.post("/get-single", async (req, res) => {
  try {
    const { _id } = req.body;

    if (!_id) return res.status(400).json({ message: "Candidate ID required" });


    if (!candidate) return res.status(404).json({ message: "Candidate not found" });

   const formatted = {
  ...candidate,
  _id: candidate._id.toString(),
  job_position: candidate.job_id?.position || "-",
  client_name: candidate.client?.company_name || candidate.job_id?.client?.company_name || "-",
  poc_name: candidate.poc?.poc_name || candidate.job_id?.poc?.poc_name || "-",
};

    res.status(200).json(formatted);
  } catch (err) {
    console.error("Error fetching single candidate:", err);
    res.status(500).json({ message: "Failed to fetch candidate" });
  }
});

module.exports = router;
