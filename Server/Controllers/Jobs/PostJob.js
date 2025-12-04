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

    total_experience = Number(total_experience);
    recent_experience = Number(recent_experience);
    notice_period = Number(notice_period);
    budget_from = Number(budget_from);
    budget_to = Number(budget_to);

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
    let attachments = [];
    if (req.files && req.files.length > 0) {
      attachments = req.files.map((file) => ({
        filename: file.originalname,
        url: `/uploads/${file.filename}`, 
      }));
    }
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
