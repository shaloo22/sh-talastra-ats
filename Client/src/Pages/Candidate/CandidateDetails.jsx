import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function CandidateDetails() {
  const { id } = useParams();
  const [candidate, setCandidate] = useState(null);

useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const res = await axios.post("http://localhost:8080/candidate/get-single", { _id: id });
        setCandidate(res.data);
      } catch (err) {
        console.error("Error fetching candidate:", err);
      }
    };

    fetchCandidate();
  }, [id]);

  if (!candidate) return <div className="text-center mt-10 text-gray-500">Loading...</div>;

  const field = (label, value) => (
    <div className="flex justify-between border-b border-gray-200 py-1">
      <span className="text-gray-600 text-sm font-medium">{label}</span>
      <span className="text-gray-800 text-sm">{value || "-"}</span>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto mt-6 bg-white shadow-lg rounded-xl border border-gray-400">
      {/* HEADER */}
      <h1 className="text-center text-lg font-semibold tracking-wide mt-4">
        Candidate Details
      </h1>

      <div className="p-4 space-y-4">

        {/* BASIC INFO */}
        <div className="border border-gray-400 rounded-lg">
          <div className="px-3 py-2 text-sm font-semibold text-black border-b border-gray-400">
            Basic Information
          </div>
          <div className="grid grid-cols-3 text-sm">
            <div className="p-2 border-r border-b">
              <p className="text-gray-500 text-xs">Candidate Name</p>
              <p className="font-medium text-gray-900">{candidate.candidate_name}</p>
            </div>
            <div className="p-2 border-b">
              <p className="text-gray-500 text-xs">Email</p>
              <p className="font-medium text-gray-900">{candidate.email}</p>
            </div>

            <div className="p-2 border-r border-b">
              <p className="text-gray-500 text-xs">Contact Number</p>
              <p className="font-medium text-gray-900">{candidate.contact_num}</p>
            </div>
            <div className="p-2 border-b">
              <p className="text-gray-500 text-xs">DOB</p>
              <p className="font-medium text-gray-900">{candidate.dob}</p>
            </div>

            <div className="p-2 border-r border-b">
              <p className="text-gray-500 text-xs">Job Position</p>
              <p className="font-medium text-gray-900">{candidate.job_position || candidate.job_id?.position}</p>
            </div>
            <div className="p-2 border-b">
              <p className="text-gray-500 text-xs">Client</p>
              <p className="font-medium text-gray-900">{candidate.job_id?.client?.company_name}</p>
            </div>

            <div className="p-2 border-r border-b">
              <p className="text-gray-500 text-xs">POC</p>
              <p className="font-medium text-gray-900">{candidate.job_id?.poc?.poc_name}</p>
            </div>
            <div className="p-2 border-b">
              <p className="text-gray-500 text-xs">Mode of Interview</p>
              <p className="font-medium text-gray-900">{candidate.mode_of_interview}</p>
            </div>

            <div className="p-2 border-r">
              <p className="text-gray-500 text-xs">Status</p>
              <p className="font-medium text-gray-900">{candidate.status}</p>
            </div>
            <div className="p-2">
              <p className="text-gray-500 text-xs">Follow-up Status</p>
              <p className="font-medium text-gray-900">{candidate.followup_status_id}</p>
            </div>
          </div>
        </div>

        {/* EXPERIENCE & CTC */}
        <div className="border border-gray-400 rounded-lg">
          <div className="px-3 py-2 text-sm font-semibold text-black border-b border-gray-400">
            Experience & CTC
          </div>
          <div className="grid grid-cols-3 text-sm">
            <div className="p-2 border-r border-b">
              <p className="text-gray-500 text-xs">Total Experience</p>
              <p className="font-medium text-gray-900">{candidate.total_exp} Years</p>
            </div>
            <div className="p-2 border-b">
              <p className="text-gray-500 text-xs">Relevant Experience</p>
              <p className="font-medium text-gray-900">{candidate.relevant_exp} Years</p>
            </div>

            <div className="p-2 border-r border-b">
              <p className="text-gray-500 text-xs">Current CTC (Fixed + Variable)</p>
              <p className="font-medium text-gray-900">{candidate.current_ctc}</p>
            </div>
            <div className="p-2 border-b">
              <p className="text-gray-500 text-xs">Accepted CTC (Fixed + Variable)</p>
              <p className="font-medium text-gray-900">{candidate.accepted_ctc}</p>
            </div>

            <div className="p-2 border-r">
              <p className="text-gray-500 text-xs">Current Organization</p>
              <p className="font-medium text-gray-900">{candidate.current_org}</p>
            </div>
            <div className="p-2">
              <p className="text-gray-500 text-xs">Previous Organization</p>
              <p className="font-medium text-gray-900">{candidate.previous_org}</p>
            </div>
          </div>
        </div>

        {/* LOCATIONS */}
        <div className="border border-gray-400 rounded-lg">
          <div className="px-3 py-2 text-sm font-semibold text-black border-b border-gray-400">
            Location Details
          </div>
          <div className="grid grid-cols-3 text-sm">
            <div className="p-2 border-r border-b">
              <p className="text-gray-500 text-xs">Current Location</p>
              <p className="font-medium text-gray-900">{candidate.current_location}</p>
            </div>
            <div className="p-2 border-b">
              <p className="text-gray-500 text-xs">Preferred Location</p>
              <p className="font-medium text-gray-900">{candidate.preferred_location}</p>
            </div>

            <div className="p-2 border-r border-b">
              <p className="text-gray-500 text-xs">Current City</p>
              <p className="font-medium text-gray-900">{candidate.current_city}</p>
            </div>
            <div className="p-2 border-b">
              <p className="text-gray-500 text-xs">Relocate City P1</p>
              <p className="font-medium text-gray-900">{candidate.relocate_city_p1}</p>
            </div>

            <div className="p-2 border-r">
              <p className="text-gray-500 text-xs">Relocate City P2</p>
              <p className="font-medium text-gray-900">{candidate.relocate_city_p2}</p>
            </div>
            <div className="p-2">
              <p className="text-gray-500 text-xs">Notice Period</p>
              <p className="font-medium text-gray-900">{candidate.notice_period} Days</p>
            </div>
          </div>
        </div>

        {/* ATTACHMENTS */}
        <div className="border border-gray-400 rounded-lg">
          <div className="px-3 py-2 text-sm font-semibold text-black border-b border-gray-400">
            Attachments
          </div>
          <div className="p-3 text-sm">
            {candidate.cv_attachment || candidate.jd_attachments?.length > 0 ? (
              <ul className="list-disc list-inside text-blue-600">
                {candidate.cv_attachment && (
                  <li>
                    <a href={candidate.cv_attachment.url} target="_blank" rel="noreferrer">
                      CV
                    </a>
                  </li>
                )}
                {candidate.jd_attachments?.map((file, i) => (
                  <li key={i}>
                    <a href={file.url} target="_blank" rel="noreferrer">
                      {file.filename || `JD ${i + 1}`}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-xs">No Attachments</p>
            )}
          </div>
        </div>

        {/* DESCRIPTION / REMARKS */}
        <div className="border border-gray-400 rounded-lg">
          <div className="px-3 py-2 text-sm font-semibold text-black border-b border-gray-400">
            Remarks / Description
          </div>
          <div className="p-3 text-sm text-gray-800"
            dangerouslySetInnerHTML={{ __html: candidate.description }} />
        </div>

        {/* EDIT BUTTON */}
        <Link to={`/UpdateCandidate/${candidate?._id}`}>
          <button className="bg-primary w-full py-2 rounded-lg text-white font-semibold hover:bg-black transition">
            Edit Candidate
          </button>
        </Link>

      </div>
    </div>
  );
}

export default CandidateDetails;
