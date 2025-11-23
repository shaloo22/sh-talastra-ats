const Status = require("../../../Models/StatusModel");

const GetAllStatus = async (req, res) => {
    try {
        const statuses = await Status.find();
        res.status(200).json({ statuses });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

module.exports = GetAllStatus;
