const Job = require('../../Models/JobModel');

const PostJobRouter = async (req, res) => {
  try {
    const form = req.body;

    // Uploaded PDFs come here
    const filePaths = req.files?.map(file => file.path) || [];

    const newJob = new Job({
      client: form.client,
      poc: form.poc,
      internal_recruiter: form.internal_recruiter,
      internal_manager: form.internal_manager,
      total_experience: form.total_experience,
      recent_experience: form.recent_experience,
      job_location: form.job_location,
      notice_period: form.notice_period,
      budget_from: form.budget_from,
      budget_to: form.budget_to,
      description: form.description,
      technology: form.technology,
      position: form.position,
      
      // Save file URLs / paths into DB
      attach_jd: filePaths,
    });

    await newJob.save();

    return res.status(200).json({ message: "Job posted successfully!" });

  } catch (error) {
    console.error("Error posting job:", error);
    return res.status(500).json({ error: "An error occurred while saving the job." });
  }
};

module.exports = PostJobRouter;
