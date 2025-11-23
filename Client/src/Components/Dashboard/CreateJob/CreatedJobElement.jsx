// import React from "react";
// import { useNavigate } from "react-router-dom";

// function CreatedJobElement({ data }) {
//   const navigate = useNavigate();

//   const handleJobClick = (id) => {
//     navigate(`/JobDetails/${id}`); 
//   };

//   return (
//     <div className="overflow-x-auto w-full mt-8">
//       <table className="min-w-full border border-gray-200 bg-white">
//         <thead>
//           <tr className="bg-gray-100 text-left">
//              <th className="py-3 px-5 border-b text-sm font-semibold text-gray-700">Skills</th>
//             <th className="py-3 px-5 border-b text-sm font-semibold text-gray-700">Position</th>
//             <th className="py-3 px-5 border-b text-sm font-semibold text-gray-700">Client</th>
//             <th className="py-3 px-5 border-b text-sm font-semibold text-gray-700">POC</th>
//             <th className="py-3 px-5 border-b text-sm font-semibold text-gray-700">Recruiter</th>
//             <th className="py-3 px-5 border-b text-sm font-semibold text-gray-700">Manager</th>
//             <th className="py-3 px-5 border-b text-sm font-semibold text-gray-700">Total Exp</th>
//             <th className="py-3 px-5 border-b text-sm font-semibold text-gray-700">Recent Exp</th>
//             <th className="py-3 px-5 border-b text-sm font-semibold text-gray-700">Job Location</th>
//             <th className="py-3 px-5 border-b text-sm font-semibold text-gray-700">Notice Period</th>
//             <th className="py-3 px-5 border-b text-sm font-semibold text-gray-700">Budget</th>
//             <th className="py-3 px-5 border-b text-sm font-semibold text-gray-700">JD</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data?.map((job) => (
//             <tr
//               key={job._id}
//               onClick={() => handleJobClick(job._id)}
//               className="cursor-pointer hover:bg-gray-50"

//             > 
//             <td className="py-3 px-5 border-b">{Array.isArray(job.technology) ? job.technology.join(", ") : job.technology}</td>
// <td className="py-3 px-5 border-b">{job.position}</td>
// <td className="py-3 px-5 border-b">{job.client?.company_name || "-"}</td>
// <td className="py-3 px-5 border-b">{job.poc?.poc_name || "-"}</td>
// <td className="py-3 px-5 border-b">{job.internal_recruiter}</td>
// <td className="py-3 px-5 border-b">{job.internal_manager}</td>
// <td className="py-3 px-5 border-b">{job.total_experience} yrs</td>
// <td className="py-3 px-5 border-b">{job.recent_experience} yrs</td>
// <td className="py-3 px-5 border-b">{job.job_location}</td>
// <td className="py-3 px-5 border-b">{job.notice_period} months</td>
// <td className="py-3 px-5 border-b">₹{job.budget_from} - ₹{job.budget_to}</td>
// <td className="py-3 px-5 border-b text-center">
//   {job.attachments?.length > 0 ? (
//     <a href={job.attachments[0].url} target="_blank" rel="noreferrer" className="text-blue-600 underline">
//       JD
//     </a>
//   ) : "-"}
// </td>

//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default CreatedJobElement;

import React from "react";
import { useNavigate } from "react-router-dom";

function CreatedJobElement({ data = [] }) {
  const navigate = useNavigate();

  const handleJobClick = (id) => {
    navigate(`/JobDetails/${id}`);
  };
  if (!data || data.length === 0) {
    return <p className="text-gray-500 mt-8">No jobs available.</p>;
  }

  return (
    <div className="overflow-x-auto w-full mt-8">
      <table className="min-w-full border border-gray-200 bg-white">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="py-3 px-5 border-b text-sm font-semibold text-gray-700">Skills</th>
            <th className="py-3 px-5 border-b text-sm font-semibold text-gray-700">Position</th>
            <th className="py-3 px-5 border-b text-sm font-semibold text-gray-700">Client</th>
            <th className="py-3 px-5 border-b text-sm font-semibold text-gray-700">POC</th>
            <th className="py-3 px-5 border-b text-sm font-semibold text-gray-700">Recruiter</th>
            <th className="py-3 px-5 border-b text-sm font-semibold text-gray-700">Manager</th>
            <th className="py-3 px-5 border-b text-sm font-semibold text-gray-700">Total Exp</th>
            <th className="py-3 px-5 border-b text-sm font-semibold text-gray-700">Recent Exp</th>
            <th className="py-3 px-5 border-b text-sm font-semibold text-gray-700">Job Location</th>
            <th className="py-3 px-5 border-b text-sm font-semibold text-gray-700">Notice Period</th>
            <th className="py-3 px-5 border-b text-sm font-semibold text-gray-700">Budget</th>
            <th className="py-3 px-5 border-b text-sm font-semibold text-gray-700">JD</th>
          </tr>
        </thead>

        <tbody>
          {data.map((job) => (
            <tr
              key={job._id}
              onClick={() => handleJobClick(job._id)}
              className="cursor-pointer hover:bg-gray-50"
            >
              <td className="py-3 px-5 border-b">
                {Array.isArray(job.technology) ? job.technology.join(", ") : job.technology}
              </td>
              <td className="py-3 px-5 border-b">{job.position}</td>
              <td className="py-3 px-5 border-b">{job.client?.company_name || "-"}</td>
              <td className="py-3 px-5 border-b">{job.poc?.poc_name || "-"}</td>
              <td className="py-3 px-5 border-b">{job.internal_recruiter}</td>
              <td className="py-3 px-5 border-b">{job.internal_manager}</td>
              <td className="py-3 px-5 border-b">{job.total_experience} yrs</td>
              <td className="py-3 px-5 border-b">{job.recent_experience} yrs</td>
              <td className="py-3 px-5 border-b">{job.job_location}</td>
              <td className="py-3 px-5 border-b">{job.notice_period} months</td>
              <td className="py-3 px-5 border-b">₹{job.budget_from} - ₹{job.budget_to}</td>
              <td className="py-3 px-5 border-b text-center">
                {job.attachments?.length > 0 ? (
                  <a
                    href={job.attachments[0].url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline"
                  >
                    JD
                  </a>
                ) : (
                  "-"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default CreatedJobElement;
