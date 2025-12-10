// const Candidate = require("../../Models/CandidateModel");
// const Job = require("../../Models/JobModel");

// // Make sure you have multer configured in your route
// // Example in your route file:
// // const multer = require("multer");
// // const upload = multer({ dest: "uploads/cv/" });
// // router.post("/candidate/create", upload.array("cv_attachment"), CreateCandidate);

// const CreateCandidate = async (req, res) => {
//   try {
//     const {
//       job_id,
//       candidate_name,
//       contact_num,
//       email,
//       total_exp,
//       relevant_exp,
//       current_ctc,
//       accepted_ctc,
//       current_location,
//       preferred_location,
//       dob,
//       notice_period,
//       offers_pipeline,
//       interview_date,
//       last_working_date,
//       current_city,
//       relocate_city_p1,
//       relocate_city_p2,
//       mode_of_interview,
//       candidate_status,
//       followup_status,
//       status,
//       description
//     } = req.body;

//     if (!candidate_name || !email) {
//       return res.status(400).json({ message: "Candidate name and email are required." });
//     }

//     let poc = "NA";
//     let client = "NA";
//     if (job_id) {
//       const job = await Job.findById(job_id);
//       if (job) {
//         poc = job.poc || "NA";
//         client = job.client || "NA";
//       }
//     }

//     const parseCTC = (ctcStr) => {
//       if (!ctcStr) return { fixed: 0, variable: 0 };
//       const [fixed, variable] = ctcStr.split("+").map(v => parseFloat(v.trim()) || 0);
//       return { fixed, variable };
//     };

//     const currentCTC = parseCTC(current_ctc);
//     const acceptedCTC = parseCTC(accepted_ctc);

//     //  Process attachments
//     let attachments = [];
//     if (req.files && req.files.length > 0) {
//       attachments = req.files.map((file) => ({
//         filename: file.originalname,
//         url: `/uploads/cv/${file.filename}`,
//       }));
//     }

//     const candidate = new Candidate({
//       job_id: job_id || "",
//       candidate_name,
//       contact_num: contact_num || "",
//       email,
//       total_exp: total_exp || 0,
//       relevant_exp: relevant_exp || 0,
//       current_org: req.body.current_org || "",
//       previous_org: req.body.previous_org || "",
//       current_ctc_fixed: currentCTC.fixed,
//       current_ctc_variable: currentCTC.variable,
//       accepted_ctc_fixed: acceptedCTC.fixed,
//       accepted_ctc_variable: acceptedCTC.variable,
//       current_location: current_location || "",
//       preferred_location: preferred_location || "",
//       dob: dob || null,
//       notice_period: notice_period || "",
//       offers_pipeline: offers_pipeline || [],
//       interview_date: interview_date || null,
//       last_working_date: last_working_date || null,
//       current_city: current_city || "",
//       relocate_city_p1: relocate_city_p1 || "",
//       relocate_city_p2: relocate_city_p2 || "",
//       mode_of_interview: mode_of_interview || "",
//       candidate_status: candidate_status || "",
//       followup_status: followup_status || "",
//       status: status || "",
//       description: description || "",
//       poc,
//       client,
//       cv_attachment: attachments
//     });

//     await candidate.save();

//     return res.status(200).json({
//       message: "Candidate created successfully",
//       candidate
//     });

//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Server Error", error: error.message });
//   }
// };

// module.exports = CreateCandidate;

const Candidate = require("../../Models/CandidateModel");
const Job = require("../../Models/JobModel");
// router.post("/candidate/create", upload.array("cv_attachment"), CreateCandidate);

const CreateCandidate = async (req, res) => {
  try {
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
      interview_schedule_date,
      last_working_date,
      current_city,
      relocate_city_p1,
      relocate_city_p2,
      mode_of_interview,
      candidate_status_id,
      followup_status_id,
      status,
      description
    } = req.body;

    if (!candidate_name || !email) {
      return res.status(400).json({ message: "Candidate name and email are required." });
    }

    let poc = "NA";
    let client = "NA";
    if (job_id) {
      const job = await Job.findById(job_id);
      if (job) {
        poc = job.poc || "NA";
        client = job.client || "NA";
      }
    }

    let cv_url = '';
    if (req.files?.cv_attachment && req.files.cv_attachment.length > 0) {
      cv_url = `/uploads/${req.files.cv_attachment[0].filename}`;
    }

    const candidate = new Candidate({
      job_id: job_id || "",
      candidate_name,
      contact_num: contact_num || "",
      email,
      total_exp: total_exp || 0,
      relevant_exp: relevant_exp || 0,
      current_org: current_org || "",
      previous_org: previous_org || "",
      current_ctc: current_ctc || "",        
      accepted_ctc: accepted_ctc || "",      
      current_location: current_location || "",
      preferred_location: preferred_location || "",
      dob: dob || null,
      notice_period: notice_period || "",
      offers_pipeline: offers_pipeline || [],
      interview_schedule_date: interview_schedule_date || null,
      last_working_date: last_working_date || null,
      current_city: current_city || "",
      relocate_city_p1: relocate_city_p1 || "",
      relocate_city_p2: relocate_city_p2 || "",
      mode_of_interview: mode_of_interview || "",
      candidate_status: candidate_status_id || "",
      followup_status: followup_status_id || "",
      status: status || "",
      description: description || "",
      poc,
      client,
      cv_attachment: cv_url
    });

    await candidate.save();

    return res.status(200).json({
      message: "Candidate created successfully",
      candidate
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = CreateCandidate;
