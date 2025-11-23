const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
  poc: { type: mongoose.Schema.Types.ObjectId, ref: "POC", required: true },
  internal_recruiter: 
  { type: String, 
    required: true },
  internal_manager: 
  { type: String,
     required: true },
  total_experience:
   { type: Number,
     required: true },
  recent_experience: 
  { type: Number,
     required: true },
  job_location: 
  { type: String, 
    required: true },
  notice_period:
   { type: Number,
     required: true },
  budget_from: 
  { type: Number,
     required: true },
  budget_to: 
  { type: Number, 
    required: true },
  description: 
  { type: String, 
    required: true },
  technology: 
  { type: String, 
    required: true },
  position: 
  { type: String, 
    required: true },
  job_status: 
  { type: String, enum: ["Active", "Closed"], default: "Active" },
  created_at: { type: Date, default: Date.now },
  attachments: [{ filename: String, url: String }]
});


const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
