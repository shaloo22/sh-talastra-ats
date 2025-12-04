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

// Multer use
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); 
    }
});
const upload = multer({ storage: storage });

// ---- Create Job ----
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

JobRouter.put("/update-job/:id", upload.array("attach_jd"), async (req, res) => {
    try {
        const jobId = req.params.id;
        const updateData = { ...req.body };
        let uploadedFiles = [];
        if (req.files && req.files.length > 0) {
            uploadedFiles = req.files.map(f => `/uploads/${f.filename}`);
        }
        let existingFilesFromFrontend = [];
        if (req.body.existing_attach_jd) {
            existingFilesFromFrontend = JSON.parse(req.body.existing_attach_jd);
        }
        updateData.attach_jd = [...existingFilesFromFrontend, ...uploadedFiles];
        const updatedJob = await Job.findByIdAndUpdate(jobId, updateData, { new: true });

        if (!updatedJob) return res.status(404).json({ message: "Job not found" });

        res.status(200).json({
            message: "Job updated successfully",
            job: updatedJob
        });
    } catch (err) {
        console.error("Update Job Error:", err);
        res.status(500).json({ message: err.message });
    }
});

JobRouter.post("/get-jobs", GetJob);
JobRouter.post("/get-jobs/active", FilterShowActiveJobs);
JobRouter.post("/get-jobs/closed", FilterShowClosedJobs);
JobRouter.post("/get-jobs/details", GetSelectedJobDescription);
JobRouter.get("/get-all-jobs", GetAllPostedJobs);

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

    const formattedJobs = jobs.map(job => {
      return {
        ...job.toObject(),
        _id: job._id.toString(),
        client: job.client ? { ...job.client.toObject(), _id: job.client._id.toString() } : null,
        poc: job.poc ? { ...job.poc.toObject(), _id: job.poc._id.toString() } : null
      };
    });

    res.status(200).json(formattedJobs);
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

    const formattedJob = {
      ...job.toObject(),
      _id: job._id.toString(),
      client: job.client ? { ...job.client.toObject(), _id: job.client._id.toString() } : null,
      poc: job.poc ? { ...job.poc.toObject(), _id: job.poc._id.toString() } : null
    };

    res.status(200).json({ job: formattedJob });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

module.exports = JobRouter;
