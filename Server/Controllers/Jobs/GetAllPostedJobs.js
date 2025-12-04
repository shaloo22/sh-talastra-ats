const express = require('express');
const Job = require('../../Models/JobModel');

const GetAllPostedJobs = async (req, res, next) => {
    try {
        const jobs = await Job.find()
            .populate("client", "company_name")
            .populate("poc", "poc_name");

        if (jobs.length > 0) {
            return res.status(200).json({ jobs });  
        } else {
            return res.status(200).json({ jobs: [] }); 
        }
    } catch (err) {
        return res.status(500).json({ message: "Server Error", error: err.message });
    }
};

module.exports = GetAllPostedJobs;
