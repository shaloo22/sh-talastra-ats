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
const Candidate = require("../../Models/Candidate/Candidate");

const getCandidateList = async (req, res) => {
    try {
        const { status, client_id } = req.body;
        let query = {};
        if (status) query.status = status;
        if (client_id) query.client_id = client_id;

        const candidates = await Candidate.find(query)
            // Populate job_id
            .populate({
                path: "job_id",
                select: "position client poc", // fetch these from job
                populate: [
                    { path: "client", select: "company_name" }, // fetch client name
                    { path: "poc", select: "poc_name" }         // fetch poc name
                ]
            })
            .lean();

        return res.status(200).json({ candidates });
    } catch (error) {
        console.log("Error fetching candidates:", error);
        return res.status(500).json({ error: "Could not fetch candidates" });
    }
};

module.exports = getCandidateList;
