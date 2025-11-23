// const Candidate = require("../../Models/CandidateModel");

// const GetCandidateById = async (req, res) => {
//   try {
//     const { _id } = req.body;
//     console.log("Fetching candidate ID:", _id);

//     if (!_id) return res.status(400).json({ message: "_id is required" });

//     const candidate = await Candidate.findById(_id).lean();
//     console.log("Candidate fetched:", candidate);

//     if (!candidate) return res.status(404).json({ message: "Candidate not found" });

//     res.status(200).json({ candidate });
//   } catch (error) {
//     console.error("Error fetching candidate:", error);
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// };


// const Candidate = require("../../Models/CandidateModel");
// const Client = require("../../Models/ClientModel");
// const POC = require("../../Models/POCModel");

// const GetCandidateById = async (req, res) => {
//   try {
//     const candidate = await Candidate.findById(req.body._id)
//       .populate("job_id", "position") 
//       .populate("client", "name")    
//       .populate("poc", "name");      

      
//     if (!candidate) {
//       return res.status(404).json({ message: "Candidate not found" });
//     }

//     res.json(candidate); 
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// module.exports = GetCandidateById;

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
      });

    if (!candidate) return res.status(404).json({ message: "Candidate not found" });

    res.json(candidate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = GetCandidateById; 

