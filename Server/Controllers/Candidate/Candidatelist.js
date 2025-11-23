const Candidate = require("../../Models/Candidate/Candidate");

const getCandidateList = async (req, res) => {
    try {
        const { status, client_id } = req.body;

        let query = {};
        if (status) query.status = status;
        if (client_id) query.client_id = client_id;

        const candidates = await Candidate.find(query)
            .populate("client_id", "company_name")
            .lean();

        return res.status(200).json({ candidates });
    } catch (error) {
        console.log("Error fetching candidates:", error);
        return res.status(500).json({ error: "Could not fetch candidates" });
    }
};

module.exports = getCandidateList;
