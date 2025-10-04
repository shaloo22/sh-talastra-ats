const OrganizationModal = require("../../Models/Organization_Model");

const GetProfilePicture = async (req, res) => {
    console.log(' I am going to run - GetProfilePicture');

    res.status(404).json({ message: "No organization found , enter valid organization" });
    //const organization_id = req.body.organization_id
/*
    const organization_id = "68ce91dc12cdd48d8405e530"
    const organizaion = await OrganizationModal.findById(organization_id);
    if (organizaion) {
        const { logo } = organizaion;
        return res.status(200).json(logo)
    }
    else {
        res.status(404).json({ message: "No organization found , enter valid organization" });
    }
        */
}

module.exports = GetProfilePicture;