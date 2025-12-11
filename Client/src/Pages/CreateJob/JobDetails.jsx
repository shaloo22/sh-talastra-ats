import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/job/get-job/${id}`)
      .then((res) => setJob(res.data.job))
      .catch((err) => console.error(err));
  }, [id]);

  if (!job) return <div className="text-center mt-10 text-gray-500">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto mt-6 bg-white shadow-lg rounded-xl border border-black-400">
      <h1 className="text-center text-lg font-semibold tracking-wide mt-4">
        Job Details
      </h1>

      <div className="p-4 space-y-4">
        <div className="border border-black-400 rounded-lg">
          <div className=" px-3 py-2 text-sm font-semibold text-black border-b border-black-400">
            Basic Information
          </div>
          <div className="grid grid-cols-2 text-sm">
            <div className="p-2 border-r border-b">
              <p className="text-gray-500 text-xs">Client</p>
              <p className="font-medium text-gray-900">{job.client?.company_name}</p>
            </div>
            <div className="p-2 border-b">
              <p className="text-gray-500 text-xs">POC Name</p>
              <p className="font-medium text-gray-900">{job.poc?.poc_name}</p>
            </div>
            <div className="p-2 border-r border-b">
              <p className="text-gray-500 text-xs">Manager</p>
              <p className="font-medium text-gray-900">{job.internal_manager || "-"}</p>
            </div>
            <div className="p-2 border-b">
              <p className="text-gray-500 text-xs">Recruiter</p>
              <p className="font-medium text-gray-900">{job.internal_recruiter}</p>
            </div>
            <div className="p-2 border-r border-b">
              <p className="text-gray-500 text-xs">Position</p>
              <p className="font-medium text-gray-900">{job.position}</p>
            </div>
            <div className="p-2 border-b">
              <p className="text-gray-500 text-xs">Technology</p>
              <p className="font-medium text-gray-900">
                {Array.isArray(job.technology) ? job.technology.join(", ") : job.technology}
              </p>
            </div>
            <div className="p-2 border-r">
              <p className="text-gray-500 text-xs">Location</p>
              <p className="font-medium text-gray-900">{job.job_location}</p>
            </div>
            <div className="p-2">
              <p className="text-gray-500 text-xs">Notice Period</p>
              <p className="font-medium text-gray-900">{job.notice_period} Months</p>
            </div>
          </div>
        </div>

        <div className="border border-black-400 rounded-lg">
          <div className=" px-3 py-2 text-sm font-semibold text-black border-b border-black-400">
            Experience Details
          </div>
          <div className="grid grid-cols-2 text-sm">
            <div className="p-2 border-r border-b">
              <p className="text-gray-500 text-xs">Total Experience</p>
              <p className="font-medium text-gray-900">{job.total_experience} Years</p>
            </div>
            <div className="p-2 border-b">
              <p className="text-gray-500 text-xs">Relevant Experience</p>
              <p className="font-medium text-gray-900">{job.recent_experience} Years</p>
            </div>
            <div className="p-2 border-r">
              <p className="text-gray-500 text-xs">Budget Range</p>
              <p className="font-medium text-gray-900">
                ₹{job.budget_from} - ₹{job.budget_to}
              </p>
            </div>
            <div className="p-2">
              <p className="text-gray-500 text-xs">Job Type</p>
              <p className="font-medium text-gray-900">{job.job_type || "Full Time"}</p>
            </div>
          </div>
        </div>

        <div className="border border-black-400 rounded-lg">
          <div className="px-3 py-2 text-sm font-semibold text-black border-b border-black-400">
            attach_jd
          </div>
         <div className="p-3 text-sm">
  {job.attach_jd?.length > 0 ? (
    <ul>
      {job.attach_jd.map((file, index) => {
        const url = file.url.startsWith("/uploads/")
          ? `http://localhost:8080${file.url}`
          : file.url;
        return (
          <li key={index}>
            <a href={url} target="_blank" rel="noreferrer">
              {file.filename || `Attachment ${index + 1}`}
            </a>
          </li>
        );
      })}
    </ul>
  ) : (
    <p className="text-gray-500 text-xs">No Attachments</p>
  )}
</div>
        </div>
        <div className="border border-black-400 rounded-lg">
          <div className=" px-3 py-2 text-sm font-semibold text-black border-b border-black-400">
            Job Description
          </div>
          <div className="p-3 text-sm text-gray-800" dangerouslySetInnerHTML={{ __html: job.description }} />
        </div>

        <div className="flex flex-col gap-2">
          <Link to={`/create-candidate/${job._id}`}>
            <button className="bg-primary w-full py-2 rounded-lg text-white font-semibold hover:bg-black transition">
              Add Candidate
            </button>
          </Link>
          <Link to={`/update-job/${job._id}`}>
            <button className="bg-primary w-full py-2 rounded-lg text-white font-semibold hover:bg-black transition">
              Edit Job
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
