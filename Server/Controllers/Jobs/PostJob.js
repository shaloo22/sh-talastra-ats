// const Job = require('../../Models/JobModel');

// const PostJobRouter = async (req, res) => {
//   try {
//     const form = req.body;

//     // Uploaded PDFs come here
//     const filePaths = req.files?.map(file => file.path) || [];

//     const newJob = new Job({
//       client: form.client,
//       poc: form.poc,
//       internal_recruiter: form.internal_recruiter,
//       internal_manager: form.internal_manager,
//       total_experience: form.total_experience,
//       recent_experience: form.recent_experience,
//       job_location: form.job_location,
//       notice_period: form.notice_period,
//       budget_from: form.budget_from,
//       budget_to: form.budget_to,
//       description: form.description,
//       technology: form.technology,
//       position: form.position,
      
//       // Save file URLs / paths into DB
//       attach_jd: filePaths,
//     });

//     await newJob.save();

//     return res.status(200).json({ message: "Job posted successfully!" });

//   } catch (error) {
//     console.error("Error posting job:", error);
//     return res.status(500).json({ error: "An error occurred while saving the job." });
//   }
// };

// module.exports = PostJobRouter;
// Controllers/Jobs/PostJob.js
// Controllers/Jobs/PostJob.js
const Job = require('../../Models/JobModel');
const fs = require('fs');

const PostJobRouter = async (req, res) => {
  try {
    let {
      client,
      poc,
      internal_recruiter,
      internal_manager,
      total_experience,
      recent_experience,
      job_location,
      notice_period,
      budget_from,
      budget_to,
      technology,
      position,
      description
    } = req.body;

    // Convert numeric fields to numbers
    total_experience = Number(total_experience);
    recent_experience = Number(recent_experience);
    notice_period = Number(notice_period);
    budget_from = Number(budget_from);
    budget_to = Number(budget_to);

    // Validate required fields
    if (
      !client ||
      !poc ||
      !internal_recruiter ||
      !internal_manager ||
      isNaN(total_experience) ||
      isNaN(recent_experience) ||
      !job_location ||
      isNaN(notice_period) ||
      isNaN(budget_from) ||
      isNaN(budget_to) ||
      !technology ||
      !position ||
      !description
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Prepare attachments array
    let attachments = [];
    if (req.files && req.files.length > 0) {
      attachments = req.files.map((file) => ({
        filename: file.originalname,
        url: `/uploads/${file.filename}`, // save path for frontend
      }));
    }

    // Create new job
    const newJob = new Job({
      client,
      poc,
      internal_recruiter,
      internal_manager,
      total_experience,
      recent_experience,
      job_location,
      notice_period,
      budget_from,
      budget_to,
      technology,
      position,
      description,
      attachments,
    });

    await newJob.save();

    res.status(200).json({ message: "Job posted successfully", job: newJob });
  } catch (err) {
    console.error("POST JOB ERROR:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

module.exports = PostJobRouter;
