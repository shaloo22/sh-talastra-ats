const Job = require("../../Models/ClientModel");

const listClient = async (req, res, next) => {

    const reqData = req.body;

    if (!reqData) {
        return res.status(440).json({ message: "No status input found" });
    }

    const clients = await Job.find({ status: reqData.status });

    if (clients) {
        return res.status(200).json({ clients })
    }
    else {
        return res.status(404).json({ message: "No client found" })
    }

}

module.exports = listClient;