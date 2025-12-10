const Candidate = require("../../Models/CandidateModel");

const GetCandidateById = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.body._id)
      .populate({
        path: "job_id",
        select: "position client poc",
        populate: [
          { path: "client", select: "company_name" },
          { path: "poc", select: "poc_name" }
        ]
      })
      .lean();

    if (!candidate) return res.status(404).json({ message: "Candidate not found" });

    const formattedCandidate = {
      ...candidate,
      job_position: candidate.job_id?.position || "—",
      client_name: candidate.job_id?.client?.company_name || "—",
      poc_name: candidate.job_id?.poc?.poc_name || "—",
    };

    res.json(formattedCandidate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = GetCandidateById;
