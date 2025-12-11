// const express = require('express');
// const multer = require('multer');
// const Job = require('../Models/JobModel');
// const Client = require('../Models/ClientModel');
// const POC = require('../Models/POCModel');

// // const ApplyForJob = require('../Controllers/Jobs/ApplyForJob');
// const GetAllPostedJobs = require('../Controllers/Jobs/GetAllPostedJobs');
// const GetJob = require('../Controllers/Jobs/GetJobs');
// const GetSelectedJobDescription = require('../Controllers/Jobs/GetSelectedJobDescription');
// const PostJobRouter = require('../Controllers/Jobs/PostJob');
// const FilterShowActiveJobs = require('../Controllers/Jobs/Filter-ShowActiveJobs');
// const FilterShowClosedJobs = require('../Controllers/Jobs/FilterShowClosedJobs');

// const JobRouter = express.Router();

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/'); 
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });
// const upload = multer({ storage: storage });

// JobRouter.post("/post", PostJobRouter);
// JobRouter.post("/get-jobs", GetJob);
// JobRouter.post("/get-jobs/active", FilterShowActiveJobs);
// JobRouter.post("/get-jobs/closed", FilterShowClosedJobs);
// JobRouter.post("/get-jobs/details", GetSelectedJobDescription);
// JobRouter.get("/get-all-jobs", GetAllPostedJobs);

// // JobRouter.post("/apply-to-job", upload.fields([{ name: "profile" }, { name: "resume" }]), ApplyForJob);
// // allow up to e.g. 10 files, adjust limit as needed
// JobRouter.post("/post", upload.array("attach_jd", 10), PostJobRouter);

// JobRouter.get("/get-jobs/filter", async (req, res) => {
//     const { pocId, clientId, status } = req.query; // read query params
//     const filter = {};

//     if (status) filter.job_status = status; 
//     if (clientId) filter.client = clientId; 
//     if (pocId) filter.poc = pocId;         

//     try {
//         const jobs = await Job.find(filter)
//             .populate("client", "company_name")
//             .populate("poc", "poc_name");

//         res.status(200).json(jobs); // return array directly
//     } catch (err) {
//         console.error("Job filter error:", err);
//         res.status(500).json({ message: err.message });
//     }
// });


// JobRouter.get("/get-job/:id", async (req, res) => {
//     try {
//         const job = await Job.findById(req.params.id)
//             .populate("client", "company_name")
//             .populate("poc", "poc_name");

//         if (!job) return res.status(404).json({ message: "Job not found" });

//         res.status(200).json({ job });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Server Error", error: err.message });
//     }
// });

// module.exports = JobRouter;

const express = require('express');
const multer = require('multer');
const mongoose = require("mongoose");
const Job = require('../Models/JobModel');

const GetAllPostedJobs = require('../Controllers/Jobs/GetAllPostedJobs');
const GetJob = require('../Controllers/Jobs/GetJobs');
const GetSelectedJobDescription = require('../Controllers/Jobs/GetSelectedJobDescription');
const FilterShowActiveJobs = require('../Controllers/Jobs/Filter-ShowActiveJobs');
const FilterShowClosedJobs = require('../Controllers/Jobs/FilterShowClosedJobs');

const JobRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

JobRouter.post("/post", upload.array("attach_jd"), async (req, res) => {
  try {
    const { client, poc, internal_recruiter, internal_manager, ...rest } = req.body;

    if (!mongoose.Types.ObjectId.isValid(client) || !mongoose.Types.ObjectId.isValid(poc)) {
      return res.status(400).json({ message: "Invalid client or POC ID" });
    }

    const attach_jd = req.files.map(f => ({
      filename: f.originalname,
      url: `/uploads/${f.filename}`
    }));

    const newJob = new Job({
      client: mongoose.Types.ObjectId(client),
      poc: mongoose.Types.ObjectId(poc),
      internal_recruiter,
      internal_manager,
      ...rest,
      attach_jd
    });

    await newJob.save();
    res.status(200).json({ message: "Job created successfully", job: newJob });
  } catch (err) {
    console.error("POST JOB ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

JobRouter.put("/update-job/:id", upload.array("attach_jd"), async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    Object.entries(req.body).forEach(([key, val]) => {
      if (key !== "existing_attach_jd") job[key] = val;
    });
    let updatedAttachments = [];
    if (req.body.existing_attach_jd) {
      updatedAttachments = JSON.parse(req.body.existing_attach_jd);
    }

    if (req.files && req.files.length > 0) {
      req.files.forEach(f => {
        updatedAttachments.push({
          filename: f.originalname,
          url: `/uploads/${f.filename}`
        });
      });
    }

    job.attach_jd = updatedAttachments;
    await job.save();

    res.status(200).json({ message: "Job updated successfully", job });
  } catch (err) {
    console.error("UPDATE JOB ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

JobRouter.post("/get-jobs", GetJob);
JobRouter.post("/get-jobs/active", FilterShowActiveJobs);
JobRouter.post("/get-jobs/closed", FilterShowClosedJobs);
JobRouter.post("/get-jobs/details", GetSelectedJobDescription);
JobRouter.get("/get-all-jobs", GetAllPostedJobs);

JobRouter.get("/get-jobs/filter", async (req, res) => {
  try {
    const { poc_Id, client_Id } = req.query;
    const filter = {};

    if (client_Id) filter.client = mongoose.Types.ObjectId(client_Id);
    if (poc_Id) filter.poc = mongoose.Types.ObjectId(poc_Id);

    const jobs = await Job.find(filter)
      .populate("client", "company_name")
      .populate("poc", "poc_name");

    res.status(200).json(jobs);
  } catch (err) {
    console.error("Job filter error:", err);
    res.status(500).json({ message: err.message });
  }
});

JobRouter.get("/get-job/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate("client", "company_name")
      .populate("poc", "poc_name");

    if (!job) return res.status(404).json({ message: "Job not found" });

    res.status(200).json({ job });
  } catch (err) {
    console.error("Get Job Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = JobRouter;
