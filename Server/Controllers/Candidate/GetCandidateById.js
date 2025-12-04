const Candidate = require("../../Models/CandidateModel");

const GetCandidateById = async (req, res) => {
  try {

    const candidate = await Candidate.findById(req.body._id)
      .populate({
        path: "job_id",
        select: "position client poc",
        populate: [
          { path: "client", select: "name" },
          { path: "poc", select: "name" }
        ]
      })
     .populate("client","company_name")
     .populate("poc","poc_name")

    if (!candidate) return res.status(404).json({ message: "Candidate not found" });

    res.json(candidate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = GetCandidateById; 

