// const Candidate = require("../../Models/Candidate/Candidate");

// const getCandidateList = async (req, res) => {
//   try {
//     const { status } = req.body;

//     let query = {};
//     if (status) query.status = status;

//     const candidates = await Candidate.find(query)
//       .populate({
//         path: "job_id",
//         select: "position client poc", 
//         populate: [
//           { path: "client", select: "company_name" },
//           { path: "poc", select: "poc_name" }
//         ]
//       })
//       .lean();

//     return res.status(200).json({ candidates });
//   } catch (error) {
//     console.log("Error fetching candidates:", error);
//     return res.status(500).json({ error: "Could not fetch candidates" });
//   }
// };

// module.exports = getCandidateList;
const mongoose = require("mongoose");
const Candidate = require("../../Models/CandidateModel");

const getCandidateList = async (req, res) => {
  try {
    const { job_id, client_id, poc_id } = req.body;

    if (!job_id) return res.status(400).json({ message: "Job ID is required" });

    let query = {
      job_id: mongoose.Types.ObjectId(job_id),
    };

    if (client_id) query.client = mongoose.Types.ObjectId(client_id);
    if (poc_id) query.poc = mongoose.Types.ObjectId(poc_id);

    const candidates = await Candidate.find(query)
      .populate({ path: "job_id", select: "position" }) 
      .lean();

    if (!candidates.length) {
      return res.status(404).json({ message: "Candidate not found", candidates: [] });
    }

    return res.status(200).json({ candidates });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = getCandidateList;

