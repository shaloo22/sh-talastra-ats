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
  const [candidateStatuses, setCandidateStatuses] = useState([]);
  const [followupStatuses, setFollowupStatuses] = useState([]);
  const [modeOfInterviewOptions] = useState(["Telephonic", "Face-to-Face"]);
  const [statusOptions] = useState(["Active", "Inactive"]);
  const [cvFile, setCvFile] = useState(null);
  const [jdFiles, setJdFiles] = useState([]);

  const [formData, setFormData] = useState({
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
    interview_schedule_date: "",
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

  useEffect(() => {
    axios.get("http://localhost:8080/status")
      .then(res => setCandidateStatuses(res.data || []))
      .catch(err => console.error(err));

    axios.get("http://localhost:8080/followup")
      .then(res => setFollowupStatuses(res.data || []))
      .catch(err => console.error(err));

    if (!candidateId) return;

    axios.post("http://localhost:8080/candidate/get-single", { _id: candidateId })
      .then((res) => {
        setFormData({
          ...res.data,
          dob: res.data.dob ? res.data.dob.split("T")[0] : "",
          interview_schedule_date: res.data.interview_schedule_date ? res.data.interview_schedule_date.split("T")[0] : "",
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
                 <div className="w-full max-w-lg p-6 relative rounded-xl shadow-lg bg-white">
                   <Confetti width={300} height={200} />
                   <div className="text-center p-4">
                     <svg
                       fill="rgb(1,160,20)"
                       className="w-16 h-16 m-auto"
                       viewBox="0 0 24 24"
                     >
                       <path d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0ZM11.52,17L6,12.79l1.83-2.37L11.14,13l4.51-5.08,2.24,2Z" />
                     </svg>
                     <h2 className="text-xl font-bold py-4">Updated Successfully</h2>
                     <p className="text-sm text-gray-500 px-8">
                       POC has been updated successfully.
                     </p>
                     <button
                       onClick={() => navigate("/pocHome")}
                       className="mt-4 text-lg bg-gray-900 px-5 py-2 text-white rounded-full hover:bg-black"
                     >
                       Continue...
                     </button>
                   </div>
                 </div>
               </div>
             )}
             
        <div className="w-4/5 max-w-5xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Update Candidate</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

<div>
  <label>Job</label>
  <input
    type="text"
    value={formData.job_id?.position || formData.job_position || ""}
    className="input input-bordered w-full bg-gray-200"
    readOnly
  />
</div>

<div>
  <label>Client</label>
  <input
    type="text"
    value={formData.job_id?.client?.company_name || formData.client || ""}
    className="input input-bordered w-full bg-gray-200"
    readOnly
  />
</div>

<div>
  <label>POC</label>
  <input
    type="text"
    value={formData.job_id?.poc?.poc_name || formData.poc || ""}
    className="input input-bordered w-full bg-gray-200"
    readOnly
  />
</div>


            <div>
              <label className="font-semibold mb-1">Candidate Name</label>
              <input
                type="text"
                value={formData.candidate_name || ""}
                onChange={(e) => setFormData({ ...formData, candidate_name: e.target.value })}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="font-semibold mb-1">Contact Number</label>
              <input
                type="text"
                value={formData.contact_num || ""}
                onChange={(e) => setFormData({ ...formData, contact_num: e.target.value })}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="font-semibold mb-1">Email ID</label>
              <input
                type="email"
                value={formData.email || ""}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="font-semibold mb-1">Total Experience (Years)</label>
              <input type="number" min="0"
                value={formData.total_exp || ""}
                onChange={(e) => setFormData({ ...formData, total_exp: e.target.value })}
                className="input input-bordered w-full" />
            </div>
            <div>
              <label className="font-semibold mb-1">Relevant Experience (Years)</label>
              <input type="number" min="0"
                value={formData.relevant_exp || ""}
                onChange={(e) => setFormData({ ...formData, relevant_exp: e.target.value })}
                className="input input-bordered w-full" />
            </div>

             <div className="flex flex-col w-full mb-4">
          <label className="font-semibold mb-1">Current CTC (Fixed + Variable) (LPA)</label>
          <input
            type="text"
            placeholder="e.g. 20 + 5"
            value={formData.current_ctc}
            onChange={(e) => setFormData({ ...formData, current_ctc: e.target.value })}
            className="input input-bordered w-full"
          />
        </div>

        <div className="flex flex-col w-full mb-4">
          <label className="font-semibold mb-1">Accepted CTC (Fixed + Variable) (LPA)</label>
          <input
            type="text"
            placeholder="e.g. 25 + 5"
            value={formData.accepted_ctc}
            onChange={(e) => setFormData({ ...formData, accepted_ctc: e.target.value })}
            className="input input-bordered w-full"
          />
        
        </div>

            <div>
              <label className="font-semibold mb-1">Current Location</label>
              <input type="text"
                value={formData.current_location || ""}
                onChange={(e) => setFormData({ ...formData, current_location: e.target.value })}
                className="input input-bordered w-full" />
            </div>

            <div>
              <label className="font-semibold mb-1">Preferred Location</label>
              <input type="text"
                value={formData.preferred_location || ""}
                onChange={(e) => setFormData({ ...formData, preferred_location: e.target.value })}
                className="input input-bordered w-full" />
            </div>
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
                value={formData.interview_schedule_date || ""}
                onChange={(e) => setFormData({ ...formData, interview_schedule_date: e.target.value })}
                className="input input-bordered w-full" />
            </div>
            <div>
               <label className="font-semibold mb-1">Last Working Date</label>
              <input type="date"
                value={formData.last_working_date || ""}
                onChange={(e) => setFormData({ ...formData, last_working_date: e.target.value })}
                className="input input-bordered w-full"
              />
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
            <div>
              <label className="font-semibold mb-1">Mode of Interview</label>
              <select className="input input-bordered w-full"
                value={formData.mode_of_interview || ""}
                onChange={(e) => setFormData({ ...formData, mode_of_interview: e.target.value })}>
                <option value="">Select Mode</option>
                {modeOfInterviewOptions.map((m, i) => <option key={i} value={m}>{m}</option>)}
              </select>
            </div>

            <div>
              <label className="font-semibold mb-1">Candidate Status</label>
              <select className="input input-bordered w-full"
                value={formData.candidate_status_id || formData.candidate_status || ""}
                onChange={(e) => setFormData({ ...formData, candidate_status_id: e.target.value, candidate_status: e.target.selectedOptions[0].text })}>
                <option value="">Select Status</option>
                {candidateStatuses.map((s) => (
                  <option key={s._id || s.id || s} value={s._id || s.id || s}>
                    {s.name || s}
                  </option>
                ))}
              </select>
            </div>
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
            <div>
              <label className="font-semibold mb-1">Status</label>
              <select className="input input-bordered w-full"
                value={formData.status || ""}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                <option value="">Select Status</option>
                {statusOptions.map((s, i) => <option key={i} value={s}>{s}</option>)}
              </select>
            </div>
          <div className="col-span-2">
              <label className="font-semibold mb-1">Attach CV</label>
              {formData.cv_attachment && !cvFile && (
                <div className="mb-2">
                  <a
                    href={`http://localhost:8080${formData.cv_attachment}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    {formData.cv_attachment.split("/").pop()}
                  </a>
                </div>
              )}
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setCvFile(e.target.files[0])}
                className="input input-bordered w-full"
              />
            </div>

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
