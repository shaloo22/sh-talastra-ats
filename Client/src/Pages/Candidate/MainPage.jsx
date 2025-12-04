import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function MainPage() {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [candidate, setCandidate] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/candidate/get-all")
      .then((res) => setCandidates(res.data || []))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (!selectedCandidate) return;

    axios
      .post("http://localhost:8080/candidate/get-single", { _id: selectedCandidate })
      .then((res) => setCandidate(res.data.candidate))
      .catch((err) => console.error(err));
  }, [selectedCandidate]);

  if (!candidates) return <div className="text-center mt-10 text-gray-500">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-center text-2xl font-semibold mb-6">Select Candidate</h1>

      <div className="flex justify-center mb-6">
        <select
          value={selectedCandidate}
          onChange={(e) => setSelectedCandidate(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-64"
        >
          <option value="">Select Candidate</option>
          {candidates.map((c) => (
            <option key={c._id} value={c._id}>
              {c.candidate_name}
            </option>
          ))}
        </select>
      </div>

      {candidate && (
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl border border-gray-400 p-4 space-y-4">

          <h2 className="text-center text-lg font-semibold tracking-wide mt-2 mb-4">
            Candidate Details
          </h2>

          {/* BASIC INFO */}
          <div className="border border-gray-400 rounded-lg">
            <div className="px-3 py-2 text-sm font-semibold text-black border-b border-gray-400">
              Basic Information
            </div>
            <div className="grid grid-cols-2 text-sm">
              <div className="p-2 border-r border-b">
                <p className="text-gray-500 text-xs">JOB</p>
                <p className="font-medium text-gray-900">{candidate.job_id?.position || "-"}</p>
              </div>

              <div className="p-2 border-r border-b">
                <p className="text-gray-500 text-xs">Client</p>
                <p className="font-medium text-gray-900">{candidate.client?.name || "-"}</p>
              </div>

                <div className="p-2 border-r border-b">
                <p className="text-gray-500 text-xs">POC</p>
                <p className="font-medium text-gray-900">{candidate.poc?.name || "-"}</p>
              </div>
              
              <div className="p-2 border-r border-b">
                <p className="text-gray-500 text-xs">Name</p>
                <p className="font-medium text-gray-900">{candidate.candidate_name}</p>
              </div>
              <div className="p-2 border-b">
                <p className="text-gray-500 text-xs">Email</p>
                <p className="font-medium text-gray-900">{candidate.email}</p>
              </div>

              <div className="p-2 border-r border-b">
                <p className="text-gray-500 text-xs">Contact</p>
                <p className="font-medium text-gray-900">{candidate.contact_num}</p>
              </div>
              <div className="p-2 border-b">
                <p className="text-gray-500 text-xs">Current Org</p>
                <p className="font-medium text-gray-900">{candidate.current_org}</p>
              </div>

              <div className="p-2 border-r border-b">
                <p className="text-gray-500 text-xs">Previous Org</p>
                <p className="font-medium text-gray-900">{candidate.previous_org}</p>
              </div>
              <div className="p-2 border-b">
                <p className="text-gray-500 text-xs">Current CTC</p>
                <p className="font-medium text-gray-900">{candidate.current_ctc}</p>
              </div>

              <div className="p-2 border-r border-b">
                <p className="text-gray-500 text-xs">Accepted CTC</p>
                <p className="font-medium text-gray-900">{candidate.accepted_ctc}</p>
              </div>
              <div className="p-2 border-b">
                <p className="text-gray-500 text-xs">Current Location</p>
                <p className="font-medium text-gray-900">{candidate.current_location}</p>
              </div>

              <div className="p-2 border-r border-b">
                <p className="text-gray-500 text-xs">Preferred Location</p>
                <p className="font-medium text-gray-900">{candidate.preferred_location}</p>
              </div>
              <div className="p-2 border-b">
                <p className="text-gray-500 text-xs">Date of Birth</p>
                <p className="font-medium text-gray-900">{candidate.dob}</p>
              </div>

              <div className="p-2 border-r border-b">
                <p className="text-gray-500 text-xs">Notice Period</p>
                <p className="font-medium text-gray-900">{candidate.notice_period}</p>
              </div>
              <div className="p-2 border-b">
                <p className="text-gray-500 text-xs">Offers Pipeline</p>
                <p className="font-medium text-gray-900">{candidate.offers_pipeline}</p>
              </div>

              <div className="p-2 border-r border-b">
                <p className="text-gray-500 text-xs">Interview Date</p>
                <p className="font-medium text-gray-900">{candidate.interview_schedule_date}</p>
              </div>
              <div className="p-2 border-b">
                <p className="text-gray-500 text-xs">Last Working Date</p>
                <p className="font-medium text-gray-900">{candidate.last_working_date}</p>
              </div>

              <div className="p-2 border-r border-b">
                <p className="text-gray-500 text-xs">Current City</p>
                <p className="font-medium text-gray-900">{candidate.current_city}</p>
              </div>
              <div className="p-2 border-b">
                <p className="text-gray-500 text-xs">Relocate City 1</p>
                <p className="font-medium text-gray-900">{candidate.relocate_city_p1}</p>
              </div>

              <div className="p-2 border-r border-b">
                <p className="text-gray-500 text-xs">Relocate City 2</p>
                <p className="font-medium text-gray-900">{candidate.relocate_city_p2}</p>
              </div>
              <div className="p-2 border-b">
                <p className="text-gray-500 text-xs">Mode of Interview</p>
                <p className="font-medium text-gray-900">{candidate.mode_of_interview}</p>
              </div>

              <div className="p-2 border-r">
                <p className="text-gray-500 text-xs">Candidate Status</p>
                <p className="font-medium text-gray-900">{candidate.candidate_status}</p>
              </div>
              <div className="p-2">
                <p className="text-gray-500 text-xs">Followup Status</p>
                <p className="font-medium text-gray-900">{candidate.followup_status}</p>
              </div>

            </div>
          </div>
          <div className="border border-gray-400 rounded-lg">
            <div className="px-3 py-2 text-sm font-semibold text-black border-b border-gray-400">
              Experience Details
            </div>
            <div className="grid grid-cols-2 text-sm">
              <div className="p-2 border-r border-b">
                <p className="text-gray-500 text-xs">Total Experience</p>
                <p className="font-medium text-gray-900">{candidate.total_exp} Years</p>
              </div>
              <div className="p-2 border-b">
                <p className="text-gray-500 text-xs">Relevant Experience</p>
                <p className="font-medium text-gray-900">{candidate.relevant_exp} Years</p>
              </div>
            </div>
          </div>
          {candidate.description && (
            <div className="border border-gray-400 rounded-lg">
              <div className="px-3 py-2 text-sm font-semibold text-black border-b border-gray-400">
                Description
              </div>
              <div
                className="p-3 text-sm text-gray-800"
                dangerouslySetInnerHTML={{ __html: candidate.description }}
              />
            </div>
          )}

          <Link to="/UpdateCandidate">
            <button className="bg-primary w-full py-2 rounded-lg text-white font-semibold hover:bg-black transition">
              Edit Candidate
            </button>
          </Link>

        </div>
      )}
    </div>
  );
}

export default MainPage;
