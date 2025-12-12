// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   f_name: {
//     type: String,
//     required: [true, "First name is required"],
//   },
//   last_name: {
//     type: String,
//     required: [true, "Last name is required"],
//     unique: true, // agar last_name ko unique rakhna ho
//   },
//   email: {
//     type: String,
//     required: [true, "Email is required"],
//     unique: true,
//   },
//   company_name: {
//     type: String,
//     required: [true, "Company name is required"],
//   },
//   password: {
//     type: String,
//     required: [true, "Password is required"],
//   },
//   designation: {
//     type: String,
//     enum: ["Manager", "Recruiter"],
//     required: [true, "Designation is required"],
//   },
//   manager: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "user",
//     default: null,
//   },
//   isAdmin: {
//     type: Boolean,
//     default: false,
//   },
//   isVerified: {
//     type: Boolean,
//     default: false,
//   },
//   org_registered: {
//     type: Boolean,
//     default: false,
//   },
//   org_id: {
//     type: String,
//     default: "0",
//   },
// });

// const userModel = mongoose.model("user", userSchema);

// module.exports = userModel;

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  f_name: {
    type: String,
    required: [true, "First name is required"],
  },
  last_name: {
    type: String,
    required: [true, "Last name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  company_name: {
    type: String,
    required: [true, "Company name is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  designation: {
    type: String,
    enum: ["Manager", "Recruiter"],
    required: [true, "Designation is required"],
  },
 manager: {
  type: String,
  default: null, 
},
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  org_registered: {
    type: Boolean,
    default: false,
  },
  org_id: {
    type: String,
    default: "0",
  },
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
