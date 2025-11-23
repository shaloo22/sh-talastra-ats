const Candidate = require("../../Models/CandidateModel");

const UpdateCandidate = async (req, res) => {
  try {
    const candidateId = req.params.id;
    if (!candidateId) {
      return res.status(400).json({ success: false, message: "Candidate ID is required" });
    }

    const {
      job_id,
      candidate_name,
      contact_num,
      email,
      total_exp,
      relevant_exp,
      current_org,
      previous_org,
      current_ctc,
      accepted_ctc,
      current_location,
      preferred_location,
      dob,
      notice_period,
      offers_pipeline,
      interview_date,
      last_working_date,
      current_city,
      relocate_city_p1,
      relocate_city_p2,
      mode_of_interview,
      candidate_status,
      followup_status,
      status,
      description,
      poc,
      client
    } = req.body;

    const updateData = {
      job_id,
      candidate_name,
      contact_num,
      email,
      total_exp,
      relevant_exp,
      current_org,
      previous_org,
      current_ctc,
      accepted_ctc,
      current_location,
      preferred_location,
      dob,
      notice_period,
      offers_pipeline,
      interview_date,
      last_working_date,
      current_city,
      relocate_city_p1,
      relocate_city_p2,
      mode_of_interview,
      candidate_status,
      followup_status,
      status,
      description,
      poc,
      client
    };

    if (req.file && req.file.filename) {
      updateData.cv_attachment = req.file.filename;
    }

    const updatedCandidate = await Candidate.findByIdAndUpdate(candidateId, updateData, { new: true });

    if (!updatedCandidate) {
      return res.status(404).json({ success: false, message: "Candidate not found" });
    }

    res.json({ success: true, message: "Candidate Updated Successfully", data: updatedCandidate });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = UpdateCandidate;
