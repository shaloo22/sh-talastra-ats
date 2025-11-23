// // const Candidate = require("../../Models/CandidateModel");

// // const CreateCandidate = async (req, res) => {
// //     try {
// //         const {
// //             job_id,
// //             candidate_name,
// //             contact_num,
// //             email,
// //             total_exp,
// //             relevant_exp,
// //             current_org,
// //             previous_org,
// //             current_ctc,
// //             accepted_ctc,
// //             current_location,
// //             preferred_location,
// //             dob,
// //             notice_period,
// //             offers_pipeline,
// //             interview_date,
// //             last_working_date,
// //             current_city,
// //             relocate_city_p1,
// //             relocate_city_p2,
// //             mode_of_interview,
// //             candidate_status,
// //             followup_status,
// //             status,
// //             description
// //         } = req.body;

// //         // ✅ Validate required fields
// //         if (!candidate_name || !email) {
// //             return res.status(400).json({
// //                 message: "Candidate name and email are required."
// //             });
// //         }

// //         // ✅ Create new candidate
// //         const candidate = new Candidate({
// //             job_id: job_id || "",
// //             candidate_name,
// //             contact_num: contact_num || "",
// //             email,
// //             total_exp: total_exp || 0,
// //             relevant_exp: relevant_exp || 0,
// //             current_org: current_org || "",
// //             previous_org: previous_org || "",
// //             current_ctc: current_ctc || 0,
// //             accepted_ctc: accepted_ctc || 0,
// //             current_location: current_location || "",
// //             preferred_location: preferred_location || "",
// //             dob: dob || null,
// //             notice_period: notice_period || "",
// //             offers_pipeline: offers_pipeline || [],
// //             interview_date: interview_date || null,
// //             last_working_date: last_working_date || null,
// //             current_city: current_city || "",
// //             relocate_city_p1: relocate_city_p1 || "",
// //             relocate_city_p2: relocate_city_p2 || "",
// //             mode_of_interview: mode_of_interview || "",
// //             candidate_status: candidate_status || "",
// //             followup_status: followup_status || "",
// //             status: status || "",
// //             description: description || ""
// //         });

// //         await candidate.save();

// //         return res.status(200).json({
// //             message: "Candidate created successfully",
// //             candidate
// //         });

// //     } catch (error) {
// //         console.error(error);
// //         return res.status(500).json({
// //             message: "Server Error",
// //             error: error.message
// //         });
// //     }
// // };

// // module.exports = CreateCandidate;
// // const Candidate = require("../../Models/CandidateModel");
// // const Job = require("../../Models/JobModel");

// // const CreateCandidate = async (req, res) => {
// //     try {
// //         const {
// //             job_id,
// //             candidate_name,
// //             contact_num,
// //             email,
// //             total_exp,
// //             relevant_exp,
// //             current_org,
// //             previous_org,
// //             current_ctc,
// //             accepted_ctc,
// //             current_location,
// //             preferred_location,
// //             dob,
// //             notice_period,
// //             offers_pipeline,
// //             interview_date,
// //             last_working_date,
// //             current_city,
// //             relocate_city_p1,
// //             relocate_city_p2,
// //             mode_of_interview,
// //             candidate_status,
// //             followup_status,
// //             status,
// //             description
// //         } = req.body;

// //         // ✅ Validate required fields
// //         if (!candidate_name || !email) {
// //             return res.status(400).json({
// //                 message: "Candidate name and email are required."
// //             });
// //         }

// //         // ✅ Fetch job details to get POC & Client
// //         let poc = "NA";
// //         let client = "NA";

// //         if (job_id) {
// //             const job = await Job.findById(job_id);
// //             if (job) {
// //                 poc = job.poc || "NA";
// //                 client = job.client || "NA";
// //             }
// //         }

// //         // ✅ Create new candidate
// //         const candidate = new Candidate({
// //             job_id: job_id || "",
// //             candidate_name,
// //             contact_num: contact_num || "",
// //             email,
// //             total_exp: total_exp || 0,
// //             relevant_exp: relevant_exp || 0,
// //             current_org: current_org || "",
// //             previous_org: previous_org || "",
// //             current_ctc: current_ctc || 0,
// //             accepted_ctc: accepted_ctc || 0,
// //             current_location: current_location || "",
// //             preferred_location: preferred_location || "",
// //             dob: dob || null,
// //             notice_period: notice_period || "",
// //             offers_pipeline: offers_pipeline || [],
// //             interview_date: interview_date || null,
// //             last_working_date: last_working_date || null,
// //             current_city: current_city || "",
// //             relocate_city_p1: relocate_city_p1 || "",
// //             relocate_city_p2: relocate_city_p2 || "",
// //             mode_of_interview: mode_of_interview || "",
// //             candidate_status: candidate_status || "",
// //             followup_status: followup_status || "",
// //             status: status || "",
// //             description: description || "",
// //             // ✅ Auto-add POC & Client from Job
// //             poc,
// //             client
// //         });

// //         await candidate.save();

// //         return res.status(200).json({
// //             message: "Candidate created successfully",
// //             candidate
// //         });

// //     } catch (error) {
// //         console.error(error);
// //         return res.status(500).json({
// //             message: "Server Error",
// //             error: error.message
// //         });
// //     }
// // };

// // module.exports = CreateCandidate;

// const Candidate = require("../../Models/CandidateModel");
// const Job = require("../../Models/JobModel");

// const CreateCandidate = async (req, res) => {
//   try {
//     const {
//       job_id,
//       candidate_name,
//       contact_num,
//       email,
//       total_exp,
//       relevant_exp,
//       current_org,
//       previous_org,
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

//     // Validate required fields
//     if (!candidate_name || !email) {
//       return res.status(400).json({ message: "Candidate name and email are required." });
//     }

//     // Fetch job details for POC & Client
//     let poc = "NA";
//     let client = "NA";
//     if (job_id) {
//       const job = await Job.findById(job_id);
//       if (job) {
//         poc = job.poc || "NA";
//         client = job.client || "NA";
//       }
//     }

//     // Handle files properly
//     let cv_attachment = null;
//     if (req.files?.cv_attachment && req.files.cv_attachment[0]) {
//       cv_attachment = {
//         path: req.files.cv_attachment[0].path,
//         name: req.files.cv_attachment[0].originalname
//       };
//     }

//     let jd_attachments = [];
//     if (req.files?.jd_attachments) {
//       jd_attachments = req.files.jd_attachments.map(f => ({
//         path: f.path,
//         name: f.originalname
//       }));
//     }

//     // Create candidate
//     const candidate = new Candidate({
//       job_id: job_id || "",
//       candidate_name,
//       contact_num: contact_num || "",
//       email,
//       total_exp: total_exp || 0,
//       relevant_exp: relevant_exp || 0,
//       current_org: current_org || "",
//       previous_org: previous_org || "",
//       current_ctc: current_ctc || "",
//       accepted_ctc: accepted_ctc || "",
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
//       cv_attachment,
//       jd_attachments
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
      current_ctc,   // format: "20 + 5"
      accepted_ctc,  // format: "25 + 5"
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
      description
    } = req.body;

    if (!candidate_name || !email) {
      return res.status(400).json({ message: "Candidate name and email are required." });
    }

    // Job details
    let poc = "NA";
    let client = "NA";
    if (job_id) {
      const job = await Job.findById(job_id);
      if (job) {
        poc = job.poc || "NA";
        client = job.client || "NA";
      }
    }

    // Parse CTC strings
    const parseCTC = (ctcStr) => {
      if (!ctcStr) return { fixed: 0, variable: 0 };
      const [fixed, variable] = ctcStr.split("+").map(v => parseFloat(v.trim()) || 0);
      return { fixed, variable };
    };

    const currentCTC = parseCTC(current_ctc);
    const acceptedCTC = parseCTC(accepted_ctc);

    // Create candidate
    const candidate = new Candidate({
      job_id: job_id || "",
      candidate_name,
      contact_num: contact_num || "",
      email,
      total_exp: total_exp || 0,
      relevant_exp: relevant_exp || 0,
      current_org: current_org || "",
      previous_org: previous_org || "",
      current_ctc_fixed: currentCTC.fixed,
      current_ctc_variable: currentCTC.variable,
      accepted_ctc_fixed: acceptedCTC.fixed,
      accepted_ctc_variable: acceptedCTC.variable,
      current_location: current_location || "",
      preferred_location: preferred_location || "",
      dob: dob || null,
      notice_period: notice_period || "",
      offers_pipeline: offers_pipeline || [],
      interview_date: interview_date || null,
      last_working_date: last_working_date || null,
      current_city: current_city || "",
      relocate_city_p1: relocate_city_p1 || "",
      relocate_city_p2: relocate_city_p2 || "",
      mode_of_interview: mode_of_interview || "",
      candidate_status: candidate_status || "",
      followup_status: followup_status || "",
      status: status || "",
      description: description || "",
      poc,
      client
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
