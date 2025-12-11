const mongoose = require("mongoose");
const CandidateSchema = new mongoose.Schema({
    job_id: { type: mongoose.Schema.Types.ObjectId,
         ref: "Job", required: 
         true },
  client: 
  { type: mongoose.Schema.Types.ObjectId, 
    ref: "Client", required: true },
  poc: { type: mongoose.Schema.Types.ObjectId, ref: "POC", required: true },
    candidate_name: {
        type: String,
        required: true,
        unique: true 
    },
    contact_num: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    total_exp: {
        type: Number,
        required: true,
    },
    relevant_exp: {
        type: Number,
        required: true,
    },
    current_org: {
        type: String,
    },
    previous_org: {
        type: String,
    },
    current_ctc: {
    type: String,  
    default: ""
},
    accepted_ctc: {
    type: String,   
    default: ""
},
    current_location: {
        type: String,
    },
    preferred_location: {
        type: String,
    },
    dob: {
        type: String,
    },
    notice_period: {
        type: Number,
    },
    offers_pipeline: {
        type: String,
    },
    interview_date: {
        type: String,
    },
    last_working_date: {
        type: String,
    },
    current_city: {
        type: String,
    },
    relocate_city_p1: {
        type: String,
    },
    relocate_city_p2: {
        type: String,
    },
    mode_of_interview: {
        type: String,
        enum: ["Telephonic", "Face-to-Face"]
    },
    candidate_status: {
        type: String,
    },
    followup_status: {
        type: String,
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active"
    },
    description: {
        type: String,
    },
  
   cv_attachment: { type: String, default: "" },
}, { timestamps: true });

CandidateSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret._id = ret._id.toString();
    if (ret.job_id) ret.job_id = ret.job_id.toString();
    if (ret.client) ret.client = ret.client.toString();
    if (ret.poc) ret.poc = ret.poc.toString();
    return ret;
  },
});

const Candidate = mongoose.model("Candidate", CandidateSchema);

module.exports = Candidate;
