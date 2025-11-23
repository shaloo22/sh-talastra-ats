const express = require("express");
const router = express.Router();

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const CreateCandidate = require("../Controllers/Candidate/CreateCandidate");
const GetAllCandidates = require("../Controllers/Candidate/GetAllCandidates");
const GetCandidateById = require("../Controllers/Candidate/GetCandidateById");
const UpdateCandidate = require("../Controllers/Candidate/UpdateCandidate");

router.post(
  "/create",
  upload.fields([
    { name: "cv_attachment", maxCount: 1 },
    { name: "jd_attachments", maxCount: 5 },
  ]),
  CreateCandidate
);

router.put(
  "/update/:id",
  upload.single("cv_attachment"),
  UpdateCandidate
);

router.get("/get-all", GetAllCandidates);

router.get("/:id", GetCandidateById);

router.post("/get-single", GetCandidateById);

module.exports = router;
