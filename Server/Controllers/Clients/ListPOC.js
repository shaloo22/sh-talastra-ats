const POC = require("../../Models/POCModel");

const listPOC = async (req, res, next) => {

    const reqData = req.body;

    if (!reqData) {
        return res.status(440).json({ message: "No status input found" });
    }

    const pocs = await POC.find({ status: reqData.status });

    if (pocs) {
        return res.status(200).json({ pocs })
    }
    else {
        return res.status(404).json({ message: "No client found" })
    }

}

module.exports = listPOC;