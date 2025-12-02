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
const Job = require('../Models/JobModel');
const Client = require('../Models/ClientModel');
const POC = require('../Models/POCModel');

const GetAllPostedJobs = require('../Controllers/Jobs/GetAllPostedJobs');
const GetJob = require('../Controllers/Jobs/GetJobs');
const GetSelectedJobDescription = require('../Controllers/Jobs/GetSelectedJobDescription');
const FilterShowActiveJobs = require('../Controllers/Jobs/Filter-ShowActiveJobs');
const FilterShowClosedJobs = require('../Controllers/Jobs/FilterShowClosedJobs');

const JobRouter = express.Router();

// Multer setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // ensure this folder exists
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // unique filename
    }
});
const upload = multer({ storage: storage });

JobRouter.post("/post", upload.array("attach_jd"), async (req, res) => {
    try {
        const files = req.files.map(f => `/uploads/${f.filename}`);
        const newJob = new Job({
            ...req.body,
            attach_jd: files, 
        });

        await newJob.save();

        res.status(200).json({
            message: "Job created successfully",
            attach_jd: files, 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error", message: err.message });
    }
});

// Other routes
JobRouter.post("/get-jobs", GetJob);
JobRouter.post("/get-jobs/active", FilterShowActiveJobs);
JobRouter.post("/get-jobs/closed", FilterShowClosedJobs);
JobRouter.post("/get-jobs/details", GetSelectedJobDescription);
JobRouter.get("/get-all-jobs", GetAllPostedJobs);

// Job filter
JobRouter.get("/get-jobs/filter", async (req, res) => {
    const { pocId, clientId, status } = req.query;
    const filter = {};

    if (status) filter.job_status = status;
    if (clientId) filter.client = clientId;
    if (pocId) filter.poc = pocId;

    try {
        const jobs = await Job.find(filter)
            .populate("client", "company_name")
            .populate("poc", "poc_name");

        res.status(200).json(jobs);
    } catch (err) {
        console.error("Job filter error:", err);
        res.status(500).json({ message: err.message });
    }
});

// Get job by ID
JobRouter.get("/get-job/:id", async (req, res) => {
    try {
        const job = await Job.findById(req.params.id)
            .populate("client", "company_name")
            .populate("poc", "poc_name");

        if (!job) return res.status(404).json({ message: "Job not found" });

        res.status(200).json({ job });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
});

module.exports = JobRouter;
