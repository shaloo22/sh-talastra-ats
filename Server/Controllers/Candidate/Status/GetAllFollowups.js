const Followup = require("../../../Models/FollowupModel");

const GetAllFollowups = async (req, res) => {
    try {
        const followups = await Followup.find();
        res.status(200).json({ followups });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

module.exports = GetAllFollowups;
