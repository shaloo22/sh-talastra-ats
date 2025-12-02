const Candidate = require("../../Models/CandidateModel");

const GetAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find({}, "_id candidate_name").lean();
    res.status(200).json(candidates);
  } catch (error) {
    console.error("Error fetching candidates:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = GetAllCandidates;

