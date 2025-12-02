import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import LeftMenuBar from "../../Components/Dashboard/LeftMenuBar";
import TopNavigationBar from "../../Components/Dashboard/TopNavigationBar";
import Confetti from "react-confetti";

function CreateCandidate() {
  const navigate = useNavigate();
  const [apiFetched, setAPIFetched] = useState(false);

  const {job_id} = useParams();



  const [formData, setFormData] = useState({
    job_id: "",
    candidate_name: "",
    contact_num: "",
    email: "",
    total_exp: "",
    relevant_exp: "",
    current_org: "",
    previous_org: "",
    current_ctc_fixed: "",
    current_ctc_variable: "",
    accepted_ctc_fixed: "",
    accepted_ctc_variable: "",
    current_location: "",
    preferred_location: "",
    dob: "",
    notice_period: "",
    offers_pipeline: "",
    interview_schedule_date: "",
    last_working_date: "",
    current_city: "",
    relocate_city_p1: "",
    relocate_city_p2: "",
    mode_of_interview: "",
    candidate_status_id: "",
    followup_status_id: "",
    status: "",
    description: "",
  });

  const [jobs, setJobs] = useState([]);
  const [candidateStatuses, setCandidateStatuses] = useState([]);
  const [followupStatuses, setFollowupStatuses] = useState([]);
  const [existingNames, setExistingNames] = useState([]);
  const [cvFile, setCvFile] = useState(null);
  const [jdFiles, setJdFiles] = useState([]);
  const [prefilledJobPosition, setPrefilledJobPosition] = useState("");



  const modeOfInterviewOptions = ["Telephonic", "Face-to-Face"];
  const statusOptions = ["Active", "Inactive"];

  useEffect(() => {
    if (job_id) {
      axios
        .get(`http://localhost:8080/job/get-job/${job_id}`)
        .then((res) => {
          console.log("Job fetched:", res.data.job);
          setPrefilledJobPosition(res.data.job?.position || "");
          setFormData((prev) => ({
            ...prev,
            job_id: res.data.job?._id || "",
            job_position: res.data.job?.position || "",
          }));
        })
        .catch((err) => console.error(err));
    }

  axios.get("http://localhost:8080/status")
    .then(res => setCandidateStatuses(res.data || []))
    .catch(err => console.error(err));

  axios.get("http://localhost:8080/followup")
    .then(res => setFollowupStatuses(res.data || []))
    .catch(err => console.error(err));

  axios.get("http://localhost:8080/candidate/names")
    .then(res => setExistingNames(res.data || []))
    .catch(err => console.error(err));
}, [job_id]);

  

  const handleSubmit = () => {
  if (existingNames.includes(formData.candidate_name)) {
    alert("Candidate name already exists!");
    return;
  }

  const formPayload = new FormData();

  Object.keys(formData).forEach(key => {
    formPayload.append(key, formData[key]);
  });

  if (cvFile) {
    formPayload.append("cv_attachment", cvFile); 
  }

  if (jdFiles.length > 0) {
    jdFiles.forEach(file => {
      formPayload.append("jd_attachments", file); 
    });
  }

  axios.post("http://localhost:8080/candidate/create", formPayload, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
  .then(res => {
    setAPIFetched(true);
    console.log("Candidate Created:", res.data.candidate);
  })
  .catch(err => console.error("CREATE CANDIDATE ERROR:", err.response?.data || err.message));
};


  return (
    <div className="flex bg-gray-50 min-h-screen">
      <div className="hidden sm:block w-2/12 bg-white h-screen">
        <LeftMenuBar />
      </div>
      <div className="w-full min-h-screen">
        <TopNavigationBar title={"Candidates"} />

        {apiFetched && (
          <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="absolute bg-black opacity-50 inset-0 z-0" />
            <div className="w-full max-w-lg p-6 relative mx-auto rounded-xl shadow-lg bg-white z-10">
              <Confetti width={300} height={200} />
              <div className="text-center p-4">
                <svg fill="rgb(1,160,20)" className="w-16 h-16 m-auto" viewBox="0 0 24 24">
                  <path d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0ZM11.52,17L6,12.79l1.83-2.37L11.14,13l4.51-5.08,2.24,2Z"/>
                </svg>
                <h2 className="text-xl font-bold py-4">Candidate Created Successfully</h2>
                <button
                  onClick={() => navigate("/candidates")}
                  className="mt-4 text-lg bg-gray-900 px-5 py-2 text-white rounded-full hover:bg-black"
                >
                  Continue...
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="w-4/5 max-w-5xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create Candidate</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

<div className="flex flex-col">
  <label className="font-semibold mb-1">Job Position</label>
  <input
    type="text"
    value={prefilledJobPosition}
    readOnly
    className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
  />
</div>
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Candidate Name</label>
              <input
                type="text"
                value={formData.candidate_name}
                onChange={e => setFormData({ ...formData, candidate_name: e.target.value })}
                className="input input-bordered w-full"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Contact Number</label>
              <input
                type="text"
                value={formData.contact_num}
                onChange={e => setFormData({ ...formData, contact_num: e.target.value })}
                className="input input-bordered w-full"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1">Email ID</label>
              <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="input input-bordered w-full"
                    />

            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1">Total Experience (Years)</label>
              <input
                type="number"
                min="0"
                value={formData.total_exp}
                onChange={e => setFormData({ ...formData, total_exp: e.target.value })}
                className="input input-bordered w-full"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1">Relevant Experience (Years)</label>
              <input
                type="number"
                min="0"
                value={formData.relevant_exp}
                onChange={e => setFormData({ ...formData, relevant_exp: e.target.value })}
                className="input input-bordered w-full"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Current Organization</label>
              <input
                type="text"
                value={formData.current_org}
                onChange={e => setFormData({ ...formData, current_org: e.target.value })}
                className="input input-bordered w-full"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1">Previous Organization</label>
              <input
                type="text"
                value={formData.previous_org}
                onChange={e => setFormData({ ...formData, previous_org: e.target.value })}
                className="input input-bordered w-full"
              />
            </div>

            {/* CTC */}
            {/* <div className="flex flex-col">
              <label className="font-semibold mb-1">Current CTC (LPA)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Fixed"
                  value={formData.current_ctc_fixed}
                  onChange={e => setFormData({ ...formData, current_ctc_fixed: e.target.value })}
                  className="input input-bordered w-1/2"
                />
                <input
                  type="number"
                  placeholder="Variable"
                  value={formData.current_ctc_variable}
                  onChange={e => setFormData({ ...formData, current_ctc_variable: e.target.value })}
                  className="input input-bordered w-1/2"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1">Accepted CTC (LPA)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Fixed"
                  value={formData.accepted_ctc_fixed}
                  onChange={e => setFormData({ ...formData, accepted_ctc_fixed: e.target.value })}
                  className="input input-bordered w-1/2"
                />
                <input
                  type="number"
                  placeholder="Variable"
                  value={formData.accepted_ctc_variable}
                  onChange={e => setFormData({ ...formData, accepted_ctc_variable: e.target.value })}
                  className="input input-bordered w-1/2"
                />
              </div>
            </div> */}

            {/* Current CTC */}
<div className="flex flex-col w-full mb-4">
  <label className="font-semibold mb-1">Current CTC (Fixed + Variable) (LPA)</label>
  <input
    type="text"
    placeholder="e.g. 20 + 5"
    value={formData.current_ctc}
    onChange={e => setFormData({ ...formData, current_ctc: e.target.value })}
    className="input input-bordered w-full"
  />
  <p className="text-sm text-gray-500 mt-1">Format: Fixed + Variable (LPA)</p>
</div>

{/* Accepted CTC */}
<div className="flex flex-col w-full">
  <label className="font-semibold mb-1">Accepted CTC (Fixed + Variable) (LPA)</label>
  <input
    type="text"
    placeholder="e.g. 25 + 5"
    value={formData.accepted_ctc}
    onChange={e => setFormData({ ...formData, accepted_ctc: e.target.value })}
    className="input input-bordered w-full"
  />
  <p className="text-sm text-gray-500 mt-1">Format: Fixed + Variable (LPA)</p>
</div>


            {/* Locations */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Current Location</label>
              <input
                type="text"
                value={formData.current_location}
                onChange={e => setFormData({ ...formData, current_location: e.target.value })}
                className="input input-bordered w-full"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1">Preferred Location</label>
              <input
                type="text"
                value={formData.preferred_location}
                onChange={e => setFormData({ ...formData, preferred_location: e.target.value })}
                className="input input-bordered w-full"
              />
            </div>

            {/* Dates */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1">DOB</label>
              <input
                type="date"
                value={formData.dob}
                onChange={e => setFormData({ ...formData, dob: e.target.value })}
                className="input input-bordered w-full"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1">Notice Period (Days)</label>
              <input
                type="number"
                min="0"
                value={formData.notice_period}
                onChange={e => setFormData({ ...formData, notice_period: e.target.value })}
                className="input input-bordered w-full"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1">Offers in Pipeline</label>
              <input
                type="text"
                value={formData.offers_pipeline}
                onChange={e => setFormData({ ...formData, offers_pipeline: e.target.value })}
                className="input input-bordered w-full"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1">Interview Schedule Date</label>
              <input
                type="date"
                value={formData.interview_schedule_date}
                onChange={e => setFormData({ ...formData, interview_schedule_date: e.target.value })}
                className="input input-bordered w-full"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1">Last Working Date</label>
              <input
                type="date"
                value={formData.last_working_date}
                onChange={e => setFormData({ ...formData, last_working_date: e.target.value })}
                className="input input-bordered w-full"
              />
            </div>

            {/* Current & Relocate Cities */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Current City</label>
              <input
                type="text"
                value={formData.current_city}
                onChange={e => setFormData({ ...formData, current_city: e.target.value })}
                className="input input-bordered w-full"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1">Relocate City P1</label>
              <input
                type="text"
                value={formData.relocate_city_p1}
                onChange={e => setFormData({ ...formData, relocate_city_p1: e.target.value })}
                className="input input-bordered w-full"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1">Relocate City P2</label>
              <input
                type="text"
                value={formData.relocate_city_p2}
                onChange={e => setFormData({ ...formData, relocate_city_p2: e.target.value })}
                className="input input-bordered w-full"
              />
            </div>

            {/* Mode of Interview */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Mode of Interview</label>
              <select
                value={formData.mode_of_interview}
                onChange={e => setFormData({ ...formData, mode_of_interview: e.target.value })}
                className="input input-bordered w-full"
              >
                <option value="">Select Mode</option>
                {modeOfInterviewOptions.map((m, i) => <option key={i} value={m}>{m}</option>)}
              </select>
            </div>
                        <div className="flex flex-col">
                        <label className="font-semibold mb-1">Candidate Status</label>
                        <select
                            value={formData.candidate_status_id}
                            onChange={e => setFormData({ ...formData, candidate_status_id: e.target.value })}
                            className="input input-bordered w-full"
                        >
                            <option value="">Select Status</option>
                            {candidateStatuses.map((status) => (
                            <option key={status.id} value={status.id}>
                                {status}
                            </option>
                            ))}
                        </select>
                        </div>

                    <div className="flex flex-col">
                                <label className="font-semibold mb-1">Follow-up Status</label>
                                <select
                                    value={formData.followup_status_id}
                                    onChange={e => setFormData({ ...formData, followup_status_id: e.target.value })}
                                    className="input input-bordered w-full"
                                >
                                    <option value="">Select Follow-up Status</option>
                                    {followupStatuses.map(f => (
                                    <option key={f._id} value={f._id}>{f}</option>
                                    ))}
                                </select>
                                </div>             
            {/* Status */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Status</label>
              <select
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value })}
                className="input input-bordered w-full"
              >
                <option value="">Select Status</option>
                {statusOptions.map((s, i) => <option key={i} value={s}>{s}</option>)}
              </select>
            </div>

        <div className="flex flex-col col-span-2">
  <label className="font-semibold mb-1">Attach CV</label>
  <label
    htmlFor="cvUpload"
    className="w-full p-3 border-2 border-dotted border-gray-200 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-200 transition flex flex-col items-center justify-center"
  >
    <div className="text-center text-gray-500">
      <p className="font-medium">Click to Attach</p>
      <p className="text-sm text-gray-400">
        {cvFile ? cvFile.name : "You can attach a PDF (.pdf)"}
      </p>
    </div>
    <input
      id="cvUpload"
      type="file"
      accept=".pdf"
      onChange={(e) => setCvFile(e.target.files[0])}
      className="hidden"
    />
  </label>
</div>
            <div className="flex flex-col col-span-2">
              <label className="font-semibold mb-1">Description / Remarks</label>
              <ReactQuill
                value={formData.description}
                onChange={value => setFormData({ ...formData, description: value })}
                className="h-32"
                placeholder="Enter description..."
              />
            </div>

          </div>

          <div className="mt-12 text-center">
            <button
              onClick={handleSubmit}
              className="btn btn-wide bg-primary text-white hover:bg-black"
            >
                Create Candidate
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
export default CreateCandidate; 


