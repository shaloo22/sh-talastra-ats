const Job = require('../../Models/JobModel');
const mongoose = require('mongoose');

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

    if (!mongoose.Types.ObjectId.isValid(client)) {
      return res.status(400).json({ message: "Invalid client ID" });
    }
    if (!mongoose.Types.ObjectId.isValid(poc)) {
      return res.status(400).json({ message: "Invalid POC ID" });
    }
    total_experience = Number(total_experience);
    recent_experience = Number(recent_experience);
    notice_period = Number(notice_period);
    budget_from = Number(budget_from);
    budget_to = Number(budget_to);

    if (
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

    let attach_jd = [];
    if (req.files && req.files.length > 0) {
      attach_jd = req.files.map(file => ({
        filename: file.originalname,
        url: `/uploads/${file.filename}` 
      }));
    }

    const newJob = new Job({
      client: mongoose.Types.ObjectId(client),
      poc: mongoose.Types.ObjectId(poc),
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
      attach_jd,
    });

    await newJob.save();

    res.status(200).json({ message: "Job posted successfully", job: newJob });
  } catch (err) {
    console.error("POST JOB ERROR:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

module.exports = PostJobRouter;
