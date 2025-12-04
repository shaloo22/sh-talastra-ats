const Job = require("../../Models/JobModel");

const FilterShowClosedJobs = async (req, res) => {
  try {
    const { client_id, poc_id } = req.body;

    if (!client_id || !poc_id)
      return res.status(400).json({ message: "Client or POC missing" });
    const jobs = await Job.find({ client: client_id, poc: poc_id, job_status: "Closed" })
      .populate("client", "company_name")
      .populate("poc", "poc_name");

    res.status(200).json({ jobs });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = FilterShowClosedJobs;