// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { useNavigate, useParams } from "react-router-dom";
// import LeftMenuBar from "../../Components/Dashboard/LeftMenuBar";
// import TopNavigationBar from "../../Components/Dashboard/TopNavigationBar";
// import Confetti from "react-confetti";

// function UpdateCandidate() {
//   const navigate = useNavigate();
//   const { id: candidateId } = useParams();

//   const [apiFetched, setApiFetched] = useState(false);
//   const [jobs, setJobs] = useState([]);
//   const [candidateStatuses, setCandidateStatuses] = useState([]);
//   const [followupStatuses, setFollowupStatuses] = useState([]);
//   const [modeOfInterviewOptions] = useState(["Telephonic", "Face-to-Face"]);
//   const [statusOptions] = useState(["Active", "Inactive"]);
//   const [jdFiles, setJdFiles] = useState([]);

//   const [formData, setFormData] = useState({
//     job_id: "",
//     candidate_name: "",
//     contact_num: "",
//     email: "",
//     total_exp: "",
//     relevant_exp: "",
//     current_org: "",
//     previous_org: "",
//     current_ctc_fixed: "",
//     current_ctc_variable: "",
//     accepted_ctc_fixed: "",
//     accepted_ctc_variable: "",
//     current_location: "",
//     preferred_location: "",
//     dob: "",
//     notice_period: "",
//     offers_pipeline: "",
//     interview_date: "",
//     last_working_date: "",
//     current_city: "",
//     relocate_city_p1: "",
//     relocate_city_p2: "", 
//     mode_of_interview: "",
//     candidate_status_id: "",
//     followup_status_id: "",
//     status: "",
//     description: "",
//   });

//   useEffect(() => {
//     axios.get("http://localhost:8080/job/get-all-jobs")
//       .then(res => setJobs(res.data.jobs || []))
//       .catch(err => console.error(err));

//     axios.get("http://localhost:8080/status")
//       .then(res => setCandidateStatuses(res.data || []))
//       .catch(err => console.error(err));

//     axios.get("http://localhost:8080/followup")
//       .then(res => setFollowupStatuses(res.data || []))
//       .catch(err => console.error(err));

//     if (!candidateId) return;

//     axios.post("http://localhost:8080/candidate/get-single", { _id: candidateId })
//       .then((res) => {
//         console.log("Fetched Candidate:", res.data);
//         setFormData(res.data);
//       })
//       .catch((err) => console.error(err));

//   }, [candidateId]);

//   const handleSubmit = () => {
//     const dataToSend = new FormData();

//     for (const key in formData) dataToSend.append(key, formData[key]);
//     jdFiles.forEach((file) => dataToSend.append("jdFiles", file));

//     axios.put(`http://localhost:8080/candidate/update/${candidateId}`, dataToSend)
//       .then(() => {
//         setApiFetched(true);
//         setTimeout(() => navigate("/candidates"), 2000);
//       })
//       .catch((err) => console.error(err));
//   };

//   return (
//     <div className="flex bg-gray-50 min-h-screen">
//       <div className="hidden sm:block w-2/12 bg-white h-screen">
//         <LeftMenuBar />
//       </div>

//       <div className="w-full min-h-screen">
//         <TopNavigationBar title={"Update Candidate"} />

//         {/* SUCCESS POPUP */}
//         {apiFetched && (
//           <div className="fixed inset-0 flex justify-center items-center z-50">
//             <div className="absolute bg-black opacity-50 inset-0" />
//             <div className="w-full max-w-lg p-6 mx-auto rounded-xl shadow-lg bg-white z-10">
//               <Confetti width={300} height={200} />
//               <div className="text-center p-4">
//                 <h2 className="text-xl font-bold py-4">Candidate Updated Successfully</h2>
//                 <button
//                   onClick={() => navigate("/candidates")}
//                   className="mt-4 bg-gray-900 px-5 py-2 text-white rounded-full hover:bg-black"
//                 >
//                   Continue...
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* FORM */}
//         <div className="w-4/5 max-w-5xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg">
//           <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Update Candidate</h2>

//           {/* All Input Fields */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//             {/* Job */}
//             <div>
//               <label className="font-semibold mb-1">Job</label>
//               <select
//                 value={formData.job_id}
//                 onChange={(e) => setFormData({ ...formData, job_id: e.target.value })}
//                 className="input input-bordered w-full"
//               >
//                 <option value="">Select Job</option>
//                 {jobs.map((job) => (
//                   <option key={job._id} value={job._id}>
//                     {job.position}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Candidate Name */}
//             <div>
//               <label className="font-semibold mb-1">Candidate Name</label>
//               <input
//                 type="text"
//                 value={formData.candidate_name}
//                 onChange={(e) => setFormData({ ...formData, candidate_name: e.target.value })}
//                 className="input input-bordered w-full"
//               />
//             </div>

//             {/* Contact */}
//             <div>
//               <label className="font-semibold mb-1">Contact Number</label>
//               <input
//                 type="text"
//                 value={formData.contact_num}
//                 onChange={(e) => setFormData({ ...formData, contact_num: e.target.value })}
//                 className="input input-bordered w-full"
//               />
//             </div>

//             {/* Email */}
//             <div>
//               <label className="font-semibold mb-1">Email ID</label>
//               <input
//                 type="email"
//                 value={formData.email}
//                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                 className="input input-bordered w-full"
//               />
//             </div>

//              <div>
//               <label className="font-semibold mb-1">Total Experience (Years)</label>
//               <input type="number" min="0"
//                 value={formData.total_exp || ""}
//                 onChange={(e) => setFormData({ ...formData, total_exp: e.target.value })}
//                 className="input input-bordered w-full" />
//             </div>

//              <div>
//               <label className="font-semibold mb-1">Relevant Experience (Years)</label>
//               <input type="number" min="0"
//                 value={formData.relevant_exp || ""}
//                 onChange={(e) => setFormData({ ...formData, relevant_exp: e.target.value })}
//                 className="input input-bordered w-full" />
//             </div>

//             <div>
//               <label className="font-semibold mb-1">Current Organization</label>
//               <input type="text"
//                 value={formData.current_org || ""}
//                 onChange={(e) => setFormData({ ...formData, current_org: e.target.value })}
//                 className="input input-bordered w-full" />
//             </div>

//             <div>
//               <label className="font-semibold mb-1">Previous Organization</label>
//               <input type="text"
//                 value={formData.previous_org || ""}
//                 onChange={(e) => setFormData({ ...formData, previous_org: e.target.value })}
//                 className="input input-bordered w-full" />
//             </div>

//             <div className="flex flex-col w-full mb-4">
//   <label className="font-semibold mb-1">Current CTC (Fixed + Variable) (LPA)</label>
//   <input
//     type="text"
//     placeholder="e.g. 20 + 5"
//     value={formData.current_ctc}
//     onChange={e => setFormData({ ...formData, current_ctc: e.target.value })}
//     className="input input-bordered w-full"
//   />
//   <p className="text-sm text-gray-500 mt-1">Format: Fixed + Variable (LPA)</p>
// </div>

// {/* Accepted CTC */}
// <div className="flex flex-col w-full">
//   <label className="font-semibold mb-1">Accepted CTC (Fixed + Variable) (LPA)</label>
//   <input
//     type="text"
//     placeholder="e.g. 25 + 5"
//     value={formData.accepted_ctc}
//     onChange={e => setFormData({ ...formData, accepted_ctc: e.target.value })}
//     className="input input-bordered w-full"
//   />
//   <p className="text-sm text-gray-500 mt-1">Format: Fixed + Variable (LPA)</p>
// </div>

// <div>
//               <label className="font-semibold mb-1">Current Location</label>
//               <input type="text"
//                 value={formData.current_location || ""}
//                 onChange={(e) => setFormData({ ...formData, current_location: e.target.value })}
//                 className="input input-bordered w-full" />
//             </div>

//             <div>
//               <label className="font-semibold mb-1">Preferred Location</label>
//               <input type="text"
//                 value={formData.preferred_location || ""}
//                 onChange={(e) => setFormData({ ...formData, preferred_location: e.target.value })}
//                 className="input input-bordered w-full" />
//             </div>

//             <div>
//               <label className="font-semibold mb-1">DOB</label>
//               <input type="date"
//                 value={formData.dob ? formData.dob.split("T")[0] : ""}
//                 onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
//                 className="input input-bordered w-full" />
//             </div>

//             <div>
//               <label className="font-semibold mb-1">Notice Period (Days)</label>
//               <input type="number" min="0"
//                 value={formData.notice_period || ""}
//                 onChange={(e) => setFormData({ ...formData, notice_period: e.target.value })}
//                 className="input input-bordered w-full" />
//             </div>

//             <div>
//               <label className="font-semibold mb-1">Offers in Pipeline</label>
//               <input type="text"
//                 value={formData.offers_pipeline || ""}
//                 onChange={(e) => setFormData({ ...formData, offers_pipeline: e.target.value })}
//                 className="input input-bordered w-full" />
//             </div>

//             <div>
//               <label className="font-semibold mb-1">Interview Schedule Date</label>
//               <input type="date"
//                 value={formData.interview_date ? formData.interview_date.split("T")[0] : ""}
//                 onChange={(e) => setFormData({ ...formData, interview_date: e.target.value })}
//                 className="input input-bordered w-full" />
//             </div>

//              <div>
//               <label className="font-semibold mb-1">Last Working Date</label>
//               <input type="date"
//                 value={formData.last_working_date ? formData.last_working_date.split("T")[0] : ""}
//                 onChange={(e) => setFormData({ ...formData, last_working_date: e.target.value })}
//                 className="input input-bordered w-full" />
//             </div>

//              <div>
//               <label className="font-semibold mb-1">Current City</label>
//               <input type="text"
//                 value={formData.current_city || ""}
//                 onChange={(e) => setFormData({ ...formData, current_city: e.target.value })}
//                 className="input input-bordered w-full" />
//             </div>

//             <div>
//               <label className="font-semibold mb-1">Relocate City P1</label>
//               <input type="text"
//                 value={formData.relocate_city_p1 || ""}
//                 onChange={(e) => setFormData({ ...formData, relocate_city_p1: e.target.value })}
//                 className="input input-bordered w-full" />
//             </div>

//             <div>
//               <label className="font-semibold mb-1">Relocate City P2</label>
//               <input type="text"
//                 value={formData.relocate_city_p2 || ""}
//                 onChange={(e) => setFormData({ ...formData, relocate_city_p2: e.target.value })}
//                 className="input input-bordered w-full" />
//             </div>

//             {/* Mode of Interview */}
//             <div>
//               <label className="font-semibold mb-1">Mode of Interview</label>
//               <select className="input input-bordered w-full"
//                 value={formData.mode_of_interview || ""}
//                 onChange={(e) => setFormData({ ...formData, mode_of_interview: e.target.value })}>
//                 <option value="">Select Mode</option>
//                 {modeOfInterviewOptions.map((m, i) => <option key={i} value={m}>{m}</option>)}
//               </select>
//             </div>

//             {/* Candidate Status */}
//             <div>
//               <label className="font-semibold mb-1">Candidate Status</label>
//               <select className="input input-bordered w-full"
//                 value={formData.candidate_status_id || formData.candidate_status || ""}
//                 onChange={(e) => setFormData({ ...formData, candidate_status_id: e.target.value, candidate_status: e.target.selectedOptions[0].text })}>
//                 <option value="">Select Status</option>
//                 {candidateStatuses.map((s) => (
//                   // support both object or string arrays
//                   <option key={s._id || s.id || s} value={s._id || s.id || s}>
//                     {s.name || s}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Follow-up Status */}
//             <div>
//               <label className="font-semibold mb-1">Follow-up Status</label>
//               <select className="input input-bordered w-full"
//                 value={formData.followup_status_id || formData.followup_status || ""}
//                 onChange={(e) => setFormData({ ...formData, followup_status_id: e.target.value, followup_status: e.target.selectedOptions[0].text })}>
//                 <option value="">Select Follow-up Status</option>
//                 {followupStatuses.map(f => (
//                   <option key={f._id || f} value={f._id || f}>
//                     {f.name || f}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Status */}
//             <div>
//               <label className="font-semibold mb-1">Status</label>
//               <select className="input input-bordered w-full"
//                 value={formData.status || ""}
//                 onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
//                 <option value="">Select Status</option>
//                 {statusOptions.map((s, i) => <option key={i} value={s}>{s}</option>)}
//               </select>
//             </div>


         

//             {/* Attach JD */}
//             <div className="col-span-2">
//               <label className="font-semibold mb-1">Attach JD</label>
//               <label
//                 htmlFor="jdUpload"
//                 className="w-full p-3 border-2 border-dotted border-gray-200 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-200 transition flex flex-col items-center"
//               >
//                 <p>
//                   {jdFiles.length > 0
//                     ? jdFiles.map((f) => f.name).join(", ")
//                     : "Click to attach JD"}
//                 </p>
//                 <input
//                   id="jdUpload"
//                   type="file"
//                   multiple
//                   accept=".pdf,.doc,.docx"
//                   onChange={(e) => setJdFiles(Array.from(e.target.files))}
//                   className="hidden"
//                 />
//               </label>
//             </div>

//             {/* Description */}
//             <div className="col-span-2">
//               <label className="font-semibold mb-1">Description / Remarks</label>
//               <ReactQuill
//                 value={formData.description}
//                 onChange={(value) => setFormData({ ...formData, description: value })}
//                 className="h-32"
//               />
//             </div>
//           </div>

//           <div className="mt-12 text-center">
//             <button onClick={handleSubmit} className="btn btn-wide bg-primary text-white hover:bg-black">
//               Update Candidate
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UpdateCandidate;
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import LeftMenuBar from "../../Components/Dashboard/LeftMenuBar";
import TopNavigationBar from "../../Components/Dashboard/TopNavigationBar";
import Confetti from "react-confetti";

function UpdateCandidate() {
  const navigate = useNavigate();
  const { id: candidateId } = useParams();

  const [apiFetched, setApiFetched] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [candidateStatuses, setCandidateStatuses] = useState([]);
  const [followupStatuses, setFollowupStatuses] = useState([]);
  const [modeOfInterviewOptions] = useState(["Telephonic", "Face-to-Face"]);
  const [statusOptions] = useState(["Active", "Inactive"]);
  const [cvFile, setCvFile] = useState(null);
  const [jdFiles, setJdFiles] = useState([]);

  const [formData, setFormData] = useState({
    job_id: "",
    candidate_name: "",
    contact_num: "",
    email: "",
    total_exp: "",
    relevant_exp: "",
    current_org: "",
    previous_org: "",
    current_ctc: "",
    accepted_ctc: "",
    current_location: "",
    preferred_location: "",
    dob: "",
    notice_period: "",
    offers_pipeline: "",
    interview_date: "",
    last_working_date: "",
    current_city: "",
    relocate_city_p1: "",
    relocate_city_p2: "", 
    mode_of_interview: "",
    candidate_status: "",
    followup_status: "",
    status: "",
    description: "",
  });

  // Fetch all data & prefill candidate
  useEffect(() => {
    axios.get("http://localhost:8080/job/get-all-jobs")
      .then(res => setJobs(res.data.jobs || []))
      .catch(err => console.error(err));

    axios.get("http://localhost:8080/status")
      .then(res => setCandidateStatuses(res.data || []))
      .catch(err => console.error(err));

    axios.get("http://localhost:8080/followup")
      .then(res => setFollowupStatuses(res.data || []))
      .catch(err => console.error(err));

    if (!candidateId) return;

    axios.post("http://localhost:8080/candidate/get-single", { _id: candidateId })
      .then((res) => {
        console.log("Fetched Candidate:", res.data);
        setFormData({
          ...res.data,
          dob: res.data.dob ? res.data.dob.split("T")[0] : "",
          interview_date: res.data.interview_date ? res.data.interview_date.split("T")[0] : "",
          last_working_date: res.data.last_working_date ? res.data.last_working_date.split("T")[0] : "",
        });
      })
      .catch((err) => console.error(err));

  }, [candidateId]);

  const handleSubmit = () => {
    
    let dataToSend;
    let headers = {};

    if (cvFile || jdFiles.length > 0) {
      dataToSend = new FormData();
      for (const key in formData) dataToSend.append(key, formData[key]);
      if (cvFile) dataToSend.append("cv_attachment", cvFile);
      jdFiles.forEach(f => dataToSend.append("jdFiles", f));
      headers["Content-Type"] = "multipart/form-data";
    } else {
      // JSON payload
      dataToSend = { ...formData };
    }

    axios.put(`http://localhost:8080/candidate/update/${candidateId}`, dataToSend, { headers })
      .then(res => {
        setApiFetched(true);
        setTimeout(() => navigate("/candidates"), 2000);
      })
      .catch(err => console.error("UPDATE ERROR:", err.response?.data || err.message));
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <div className="hidden sm:block w-2/12 bg-white h-screen">
        <LeftMenuBar />
      </div>

      <div className="w-full min-h-screen">
        <TopNavigationBar title={"Update Candidate"} />

        {apiFetched && (
          <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="absolute bg-black opacity-50 inset-0" />
            <div className="w-full max-w-lg p-6 mx-auto rounded-xl shadow-lg bg-white z-10">
              <Confetti width={300} height={200} />
              <div className="text-center p-4">
                <h2 className="text-xl font-bold py-4">Candidate Updated Successfully</h2>
                <button
                  onClick={() => navigate("/candidates")}
                  className="mt-4 bg-gray-900 px-5 py-2 text-white rounded-full hover:bg-black"
                >
                  Continue...
                </button>
              </div>
            </div>
          </div>
        )}

        {/* FORM */}
        <div className="w-4/5 max-w-5xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Update Candidate</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Job */}
            <div>
              <label className="font-semibold mb-1">Job</label>
              <select
                value={formData.job_id || ""}
                onChange={(e) => setFormData({ ...formData, job_id: e.target.value })}
                className="input input-bordered w-full"
              >
                <option value="">Select Job</option>
                {jobs.map((job) => (
                  <option key={job._id} value={job._id}>{job.position}</option>
                ))}
              </select>
            </div>

            {/* Candidate Name */}
            <div>
              <label className="font-semibold mb-1">Candidate Name</label>
              <input
                type="text"
                value={formData.candidate_name || ""}
                onChange={(e) => setFormData({ ...formData, candidate_name: e.target.value })}
                className="input input-bordered w-full"
              />
            </div>

            {/* Contact Number */}
            <div>
              <label className="font-semibold mb-1">Contact Number</label>
              <input
                type="text"
                value={formData.contact_num || ""}
                onChange={(e) => setFormData({ ...formData, contact_num: e.target.value })}
                className="input input-bordered w-full"
              />
            </div>

            {/* Email */}
            <div>
              <label className="font-semibold mb-1">Email ID</label>
              <input
                type="email"
                value={formData.email || ""}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input input-bordered w-full"
              />
            </div>

            {/* Total Experience */}
            <div>
              <label className="font-semibold mb-1">Total Experience (Years)</label>
              <input type="number" min="0"
                value={formData.total_exp || ""}
                onChange={(e) => setFormData({ ...formData, total_exp: e.target.value })}
                className="input input-bordered w-full" />
            </div>

            {/* Relevant Experience */}
            <div>
              <label className="font-semibold mb-1">Relevant Experience (Years)</label>
              <input type="number" min="0"
                value={formData.relevant_exp || ""}
                onChange={(e) => setFormData({ ...formData, relevant_exp: e.target.value })}
                className="input input-bordered w-full" />
            </div>

            {/* Current CTC */}
            <div>
              <label className="font-semibold mb-1">Current CTC (Fixed + Variable)</label>
              <input
                type="text"
                placeholder="e.g. 20 + 5"
                value={formData.current_ctc || ""}
                onChange={e => setFormData({ ...formData, current_ctc: e.target.value })}
                className="input input-bordered w-full"
              />
            </div>

            {/* Accepted CTC */}
            <div>
              <label className="font-semibold mb-1">Accepted CTC (Fixed + Variable)</label>
              <input
                type="text"
                placeholder="e.g. 25 + 5"
                value={formData.accepted_ctc || ""}
                onChange={e => setFormData({ ...formData, accepted_ctc: e.target.value })}
                className="input input-bordered w-full"
              />
            </div>

            {/* Current Location */}
            <div>
              <label className="font-semibold mb-1">Current Location</label>
              <input type="text"
                value={formData.current_location || ""}
                onChange={(e) => setFormData({ ...formData, current_location: e.target.value })}
                className="input input-bordered w-full" />
            </div>

            {/* Preferred Location */}
            <div>
              <label className="font-semibold mb-1">Preferred Location</label>
              <input type="text"
                value={formData.preferred_location || ""}
                onChange={(e) => setFormData({ ...formData, preferred_location: e.target.value })}
                className="input input-bordered w-full" />
            </div>

            {/* DOB */}
            <div>
              <label className="font-semibold mb-1">DOB</label>
              <input type="date"
                value={formData.dob || ""}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                className="input input-bordered w-full" />
            </div>

            <div>
              <label className="font-semibold mb-1">Notice Period (Days)</label>
            <input type="number" min="0"
                value={formData.notice_period || ""}
                onChange={(e) => setFormData({ ...formData, notice_period: e.target.value })}
                className="input input-bordered w-full" />
            </div>

            <div>
              <label className="font-semibold mb-1">Offers in Pipeline</label>
              <input type="text"
                value={formData.offers_pipeline || ""}
                onChange={(e) => setFormData({ ...formData, offers_pipeline: e.target.value })}
                className="input input-bordered w-full" />
            </div>

            <div>
              <label className="font-semibold mb-1">Interview Schedule Date</label>
              <input type="date"
                value={formData.interview_date ? formData.interview_date.split("T")[0] : ""}
                onChange={(e) => setFormData({ ...formData, interview_date: e.target.value })}
                className="input input-bordered w-full" />
            </div>


 <div>
//               <label className="font-semibold mb-1">Last Working Date</label>
//               <input type="date"
                value={formData.last_working_date ? formData.last_working_date.split("T")[0] : ""}
                onChange={(e) => setFormData({ ...formData, last_working_date: e.target.value })}
                className="input input-bordered w-full" />
            </div>

             <div>
              <label className="font-semibold mb-1">Current City</label>
              <input type="text"
                value={formData.current_city || ""}
                onChange={(e) => setFormData({ ...formData, current_city: e.target.value })}
                className="input input-bordered w-full" />
            </div>

            <div>
              <label className="font-semibold mb-1">Relocate City P1</label>
              <input type="text"
                value={formData.relocate_city_p1 || ""}
                onChange={(e) => setFormData({ ...formData, relocate_city_p1: e.target.value })}
                className="input input-bordered w-full" />
            </div>

            <div>
              <label className="font-semibold mb-1">Relocate City P2</label>
              <input type="text"
                value={formData.relocate_city_p2 || ""}
                onChange={(e) => setFormData({ ...formData, relocate_city_p2: e.target.value })}
                className="input input-bordered w-full" />
            </div>

            {/* Mode of Interview */}
            <div>
              <label className="font-semibold mb-1">Mode of Interview</label>
              <select className="input input-bordered w-full"
                value={formData.mode_of_interview || ""}
                onChange={(e) => setFormData({ ...formData, mode_of_interview: e.target.value })}>
                <option value="">Select Mode</option>
                {modeOfInterviewOptions.map((m, i) => <option key={i} value={m}>{m}</option>)}
              </select>
            </div>

            {/* Candidate Status */}
            <div>
              <label className="font-semibold mb-1">Candidate Status</label>
              <select className="input input-bordered w-full"
                value={formData.candidate_status_id || formData.candidate_status || ""}
                onChange={(e) => setFormData({ ...formData, candidate_status_id: e.target.value, candidate_status: e.target.selectedOptions[0].text })}>
                <option value="">Select Status</option>
                {candidateStatuses.map((s) => (
                  // support both object or string arrays
                  <option key={s._id || s.id || s} value={s._id || s.id || s}>
                    {s.name || s}
                  </option>
                ))}
              </select>
            </div>

            {/* Follow-up Status */}
            <div>
              <label className="font-semibold mb-1">Follow-up Status</label>
              <select className="input input-bordered w-full"
                value={formData.followup_status_id || formData.followup_status || ""}
                onChange={(e) => setFormData({ ...formData, followup_status_id: e.target.value, followup_status: e.target.selectedOptions[0].text })}>
                <option value="">Select Follow-up Status</option>
                {followupStatuses.map(f => (
                  <option key={f._id || f} value={f._id || f}>
                    {f.name || f}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="font-semibold mb-1">Status</label>
              <select className="input input-bordered w-full"
                value={formData.status || ""}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                <option value="">Select Status</option>
                {statusOptions.map((s, i) => <option key={i} value={s}>{s}</option>)}
              </select>
            </div>


      

            {/* Attach JD */}
            <div className="col-span-2">
              <label className="font-semibold mb-1">Attach JD</label>
              <label
                htmlFor="jdUpload"
                className="w-full p-3 border-2 border-dotted border-gray-200 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-200 transition flex flex-col items-center"
              >
                <p>
                  {jdFiles.length > 0
                    ? jdFiles.map((f) => f.name).join(", ")
                    : "Click to attach JD"}
                </p>
                <input
                  id="jdUpload"
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setJdFiles(Array.from(e.target.files))}
                  className="hidden"
                />
              </label>
            </div>

            {/* Description */}
            <div className="col-span-2">
              <label className="font-semibold mb-1">Description / Remarks</label>
              <ReactQuill
                value={formData.description || ""}
                onChange={(value) => setFormData({ ...formData, description: value })}
                className="h-32"
              />
            </div>
          </div>

          <div className="mt-12 text-center">
            <button onClick={handleSubmit} className="btn btn-wide bg-primary text-white hover:bg-black">
              Update Candidate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateCandidate;
