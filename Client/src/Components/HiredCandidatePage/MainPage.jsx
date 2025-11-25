// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// function MainPage() {
//   const [candidates, setCandidates] = useState([]);
//   const [selectedCandidate, setSelectedCandidate] = useState("");
//   const [candidate, setCandidate] = useState(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/candidate/get-all")
//       .then((res) => setCandidates(res.data || []))
//       .catch((err) => console.error(err));
//   }, []);

//   useEffect(() => {
//     if (!selectedCandidate) return;

//     axios
//       .post("http://localhost:8080/candidate/get-single", { _id: selectedCandidate })
//       .then((res) => {
//         console.log("Selected Candidate →", res.data);
//         setCandidate(res.data);
//       })
//       .catch((err) => console.error(err));
//   }, [selectedCandidate]);


//   const safeRender = (field) => {
//     if (!field) return "-";
//     if (typeof field === "object") return field.name || field.position || "-";
//     return field;
//   };


//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       <h1 className="text-center text-2xl font-semibold mb-6">Select Candidate</h1>

//       <div className="flex justify-center mb-6">
//         <select
//           value={selectedCandidate}
//           onChange={(e) => setSelectedCandidate(e.target.value)}
//           className="border border-gray-300 rounded-md p-2 w-64"
//         >
//           <option value="">Select Candidate</option>
//           {candidates.map((c) => (
//             <option key={c._id} value={c._id}>
//               {c.candidate_name}
//             </option>
//           ))}
//         </select>
//       </div>

//       {candidate && (
//         <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl border border-gray-400 p-4 space-y-4">
//           <h2 className="text-center text-lg font-semibold tracking-wide mt-2 mb-4">
//             Candidate Details
//           </h2>

//           {/* BASIC INFO */}
//           <div className="border border-gray-400 rounded-lg">
//             <div className="px-3 py-2 text-sm font-semibold text-black border-b border-gray-400">
//               Basic Information
//             </div>

//             <div className="grid grid-cols-3 text-sm">
//               <div className="p-2 border-r border-b">
//                 <p className="text-gray-500 text-xs">Job</p>
//                 <p className="font-medium text-gray-900">
//                   {safeRender(candidate.job_id)}
//                 </p>
//               </div>

//               <div className="p-2 border-r border-b">
//                 <p className="text-gray-500 text-xs">Client</p>
//                 <p className="font-medium text-gray-900">
//                   {safeRender(candidate.client)}
//                 </p>
//               </div>

//               <div className="p-2 border-r border-b">
//                 <p className="text-gray-500 text-xs">POC</p>
//                 <p className="font-medium text-gray-900">
//                   {safeRender(candidate.poc)}
//                 </p>
//               </div>

//               <div className="p-2 border-r border-b">
//                 <p className="text-gray-500 text-xs">Name</p>
//                 <p className="font-medium text-gray-900">
//                   {candidate.candidate_name || "-"}
//                 </p>
//               </div>

//               <div className="p-2 border-b">
//                 <p className="text-gray-500 text-xs">Email</p>
//                 <p className="font-medium text-gray-900">{candidate.email || "-"}</p>
//               </div>

//               <div className="p-2 border-r border-b">
//                 <p className="text-gray-500 text-xs">Contact</p>
//                 <p className="font-medium text-gray-900">
//                   {candidate.contact_num || "-"}
//                 </p>
//               </div>

//               <div className="p-2 border-b">
//                 <p className="text-gray-500 text-xs">Date of Birth</p>
//                 <p className="font-medium text-gray-900">{candidate.dob || "-"}
//                 </p>
//               </div>

//               <div className="p-2 border-b">
//                 <p className="text-gray-500 text-xs">Current Org</p>
//                 <p className="font-medium text-gray-900">
//                   {candidate.current_org || "-"}
//                 </p>
//               </div>

//               <div className="p-2 border-r border-b">
//                 <p className="text-gray-500 text-xs">Previous Org</p>
//                 <p className="font-medium text-gray-900">
//                   {candidate.previous_org || "-"}
//                 </p>
//               </div>

              

//               <div className="p-2 border-b">
//                 <p className="text-gray-500 text-xs">Current CTC</p>
//                 <p className="font-medium text-gray-900">
//                   {candidate.current_ctc || "-"}
//                 </p>
//               </div>

//               <div className="p-2 border-r border-b">
//                 <p className="text-gray-500 text-xs">Accepted CTC</p>
//                 <p className="font-medium text-gray-900">
//                   {candidate.accepted_ctc || "-"}
//                 </p>
//               </div>

//               <div className="p-2 border-b">
//                 <p className="text-gray-500 text-xs">Current Location</p>
//                 <p className="font-medium text-gray-900">
//                   {candidate.current_location || "-"}
//                 </p>
//               </div>

//               <div className="p-2 border-r border-b">
//                 <p className="text-gray-500 text-xs">Preferred Location</p>
//                 <p className="font-medium text-gray-900">
//                   {candidate.preferred_location || "-"}
//                 </p>
//               </div>

//               <div className="p-2 border-r border-b">
//                 <p className="text-gray-500 text-xs">Notice Period</p>
//                 <p className="font-medium text-gray-900">
//                   {candidate.notice_period || "-"}
//                 </p>
//               </div>

//               <div className="p-2 border-b">
//                 <p className="text-gray-500 text-xs">Offers Pipeline</p>
//                 <p className="font-medium text-gray-900">
//                   {candidate.offers_pipeline || "-"}
//                 </p>
//               </div>

//               <div className="p-2 border-r border-b">
//                 <p className="text-gray-500 text-xs">Interview Date</p>
//                 <p className="font-medium text-gray-900">
//                   {candidate.interview_date || "-"}
//                 </p>
//               </div>

//               <div className="p-2 border-b">
//                 <p className="text-gray-500 text-xs">Last Working Date</p>
//                 <p className="font-medium text-gray-900">
//                   {candidate.last_working_date || "-"}
//                 </p>
//               </div>

//               <div className="p-2 border-b">
//                 <p className="text-gray-500 text-xs">Mode of Interview</p>
//                 <p className="font-medium text-gray-900">
//                   {candidate.mode_of_interview || "-"}
//                 </p>
//               </div>

//               <div className="p-2 border-r border-b">
//                 <p className="text-gray-500 text-xs">Current City</p>
//                 <p className="font-medium text-gray-900">
//                   {candidate.current_city || "-"}
//                 </p>
//               </div>

//               <div className="p-2 border-b">
//                 <p className="text-gray-500 text-xs">Relocate City 1</p>
//                 <p className="font-medium text-gray-900">
//                   {candidate.relocate_city_p1 || "-"}
//                 </p>
//               </div>

//               <div className="p-2 border-r border-b">
//                 <p className="text-gray-500 text-xs">Relocate City 2</p>
//                 <p className="font-medium text-gray-900">
//                   {candidate.relocate_city_p2 || "-"}
//                 </p>
//               </div>

//               <div className="p-2 border-r">
//                 <p className="text-gray-500 text-xs">Candidate Status</p>
//                 <p className="font-medium text-gray-900">
//                   {candidate.candidate_status || "-"}
//                 </p>
//               </div>

//               <div className="p-2">
//                 <p className="text-gray-500 text-xs">Followup Status</p>
//                 <p className="font-medium text-gray-900">
//                   {candidate.followup_status || "-"}
//                 </p>
//               </div>
//             </div>
//           </div>

//            <div className="border border-gray-400 rounded-lg">
//             <div className="px-3 py-2 text-sm font-semibold text-black border-b border-gray-400">
//               Experience Details
//             </div>
//             <div className="grid grid-cols-2 text-sm">
//               <div className="p-2 border-r border-b">
//                 <p className="text-gray-500 text-xs">Total Experience</p>
//                 <p className="font-medium text-gray-900">{candidate.total_exp} Years</p>
//               </div>
//               <div className="p-2 border-b">
//                 <p className="text-gray-500 text-xs">Relevant Experience</p>
//                 <p className="font-medium text-gray-900">{candidate.relevant_exp} Years</p>
//               </div>
//             </div>
//           </div>

           
//  <div className="border border-gray-400 rounded-lg">
//   <div className="px-3 py-2 text-sm font-semibold text-black border-b border-gray-400">Attachments:</div>

//   <div>
//     <div className="text-gray-700 font-medium mb-1"></div>
//     {candidate.jdFiles && candidate.jdFiles.length > 0 ? (
//       <div className="grid gap-2">
//         {candidate.jdFiles.map((file, index) => (
//           <a
//             key={index}
//             href={file.url}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="p-2 border border-gray-200 rounded-lg text-blue-600 hover:bg-gray-100 transition"
//           >
//             {file.name}
//           </a>
//         ))}
//       </div>
//     ) : (
//       <div className="text-gray-500">No JD attached.</div>
//     )}
//   </div>

//   {/* CV Files */}
//   <div>
//     <div className="text-gray-700 font-medium mb-1"></div>
//     {candidate.cvFiles && candidate.cvFiles.length > 0 ? (
//       <div className="grid gap-2">
//         {candidate.cvFiles.map((file, index) => (
//           <a
//             key={index}
//             href={file.url}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="p-2 border border-gray-200 rounded-lg text-blue-600 hover:bg-gray-100 transition"
//           >
//             {file.name}
//           </a>
//         ))}
//       </div>
//     ) : (
//       <div className="text-gray-500">No CV attached.</div>
//     )}
//   </div>
// </div>
          
//           {candidate.description && (
//             <div className="border border-gray-400 rounded-lg">
//               <div className="px-3 py-2 text-sm font-semibold text-black border-b border-gray-400">
//                 Description
//               </div>
//               <div
//                 className="p-3 text-sm text-gray-800"
//                 dangerouslySetInnerHTML={{ __html: candidate.description }}
//               />
//             </div>
//           )}

//           <Link to={`/UpdateCandidate/${candidate?._id}`}>
//             <button className="bg-primary w-full py-2 rounded-lg text-white font-semibold hover:bg-black transition">
//               Edit Candidate
//             </button>
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// }

// export default MainPage;



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MainPage() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [clients, setClients] = useState([]);
  const [pocs, setPocs] = useState([]);
  const [candidates, setCandidates] = useState([]);

  const [selectedJob, setSelectedJob] = useState("");
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedPoc, setSelectedPoc] = useState("");

  // Fetch all jobs for dropdown
  useEffect(() => {
    axios.get("http://localhost:8080/job/get-all-jobs")
      .then(res => setJobs(res.data?.jobs || res.data || []))
      .catch(() => setJobs([]));
  }, []);

  // When a Job is selected, fetch its Client & POC for dropdowns
  useEffect(() => {
    if (!selectedJob) {
      setClients([]);
      setPocs([]);
      setSelectedClient("");
      setSelectedPoc("");
      setCandidates([]);
      return;
    }

    axios.get(`http://localhost:8080/job/get-job/${selectedJob}`)
      .then(res => {
        const job = res.data.job;
        setClients(job?.client ? [job.client] : []);
        setPocs(job?.poc ? [job.poc] : []);
        setSelectedClient("");
        setSelectedPoc("");
      })
      .catch(err => console.error("Error fetching job details:", err));
  }, [selectedJob]);

  // Fetch candidates based on selected filters
  useEffect(() => {
    if (!selectedJob) {
      setCandidates([]);
      return;
    }

    const fetchCandidates = async () => {
      try {
        const res = await axios.post("http://localhost:8080/candidate/filter", {
          job_id: selectedJob,
          client_id: selectedClient || undefined,
          poc_id: selectedPoc || undefined,
        });
        setCandidates(res.data || []);
      } catch (err) {
        console.error("Error fetching candidates:", err);
        setCandidates([]);
      }
    };

    fetchCandidates();
  }, [selectedJob, selectedClient, selectedPoc]);

  const safeRender = (field, subField) => {
    if (!field) return "-";
    if (subField && typeof field === "object") return field[subField] || "-";
    return field;
  };

  return (
    <div className="max-w-6xl mx-auto p-6">

      {/* Header with dropdowns */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6 flex flex-col md:flex-row gap-4 items-center">
        <h1 className="text-xl font-semibold text-gray-800 flex-1">Select Candidate</h1>

        {/* Job Dropdown */}
        <select
          className="border border-gray-300 rounded-md p-2 w-full md:w-48"
          value={selectedJob}
          onChange={(e) => setSelectedJob(e.target.value)}
        >
          <option value="">Select Job</option>
          {jobs.map(job => (
            <option key={job._id} value={job._id}>{job.position}</option>
          ))}
        </select>

        {/* Client Dropdown */}
        <select
          className="border border-gray-300 rounded-md p-2 w-full md:w-48"
          value={selectedClient}
          onChange={(e) => setSelectedClient(e.target.value)}
          disabled={!clients.length}
        >
          <option value="">Select Client</option>
          {clients.map(client => (
            <option key={client._id} value={client._id}>{client.company_name}</option>
          ))}
        </select>

        {/* POC Dropdown */}
        <select
          className="border border-gray-300 rounded-md p-2 w-full md:w-48"
          value={selectedPoc}
          onChange={(e) => setSelectedPoc(e.target.value)}
          disabled={!pocs.length}
        >
          <option value="">Select POC</option>
          {pocs.map(poc => (
            <option key={poc._id} value={poc._id}>{poc.poc_name}</option>
          ))}
        </select>
      </div>

      {/* Candidate List Table */}
      {candidates.length > 0 ? (
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Job</th>
                <th className="px-4 py-2 border">Client</th>
                <th className="px-4 py-2 border">POC</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Contact</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map(c => (
                <tr
                  key={c._id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => navigate(`/candidatedetails/${c._id}`)}
                >
                  <td className="px-4 py-2 border">{c.candidate_name}</td>
                  <td className="px-4 py-2 border">{safeRender(c.job_id, "position")}</td>
                  <td className="px-4 py-2 border">{safeRender(c.job_id?.client, "company_name")}</td>
                  <td className="px-4 py-2 border">{safeRender(c.job_id?.poc, "poc_name")}</td>
                  <td className="px-4 py-2 border">{c.email || "-"}</td>
                  <td className="px-4 py-2 border">{c.contact_num || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        selectedJob && <p className="text-center text-gray-500">No candidates found.</p>
      )}

    </div>
  );
}

export default MainPage;


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// function MainPage() {
//   const navigate = useNavigate();

//   const [jobs, setJobs] = useState([]);
//   const [clients, setClients] = useState([]);
//   const [pocs, setPocs] = useState([]);
//   const [candidates, setCandidates] = useState([]);

//   const [selectedJob, setSelectedJob] = useState("");
//   const [selectedClient, setSelectedClient] = useState("");
//   const [selectedPoc, setSelectedPoc] = useState("");

//   // Fetch all jobs
//   useEffect(() => {
//     axios.get("http://localhost:8080/job/get-all-jobs")
//       .then(res => setJobs(res.data?.jobs || res.data || []))
//       .catch(() => setJobs([]));
//   }, []);

//   // Fetch clients & POCs when Job is selected
//   useEffect(() => {
//     if (!selectedJob) {
//       setClients([]);
//       setPocs([]);
//       setSelectedClient("");
//       setSelectedPoc("");
//       setCandidates([]);
//       return;
//     }

//     axios.get(`http://localhost:8080/job/get-job/${selectedJob}`)
//       .then(res => {
//         const job = res.data.job;
//         setClients(job?.client ? [job.client] : []);
//         setPocs(job?.poc ? [job.poc] : []);
//         setSelectedClient("");
//         setSelectedPoc("");
//         setCandidates([]);
//       })
//       .catch(err => console.error("Error fetching job details:", err));
//   }, [selectedJob]);

//   // Fetch candidates only when Job, Client, POC are selected
//   useEffect(() => {
//     if (!selectedJob || !selectedClient || !selectedPoc) {
//       setCandidates([]);
//       return;
//     }

//     const fetchCandidates = async () => {
//       try {
//         const res = await axios.post("http://localhost:8080/candidate/filter", {
//           job_id: selectedJob,
//           client_id: selectedClient,
//           poc_id: selectedPoc,
//         });
//         setCandidates(res.data || []);
//       } catch (err) {
//         console.error("Error fetching candidates:", err);
//         setCandidates([]);
//       }
//     };

//     fetchCandidates();
//   }, [selectedJob, selectedClient, selectedPoc]);

//   const safeRender = (field, subField) => {
//     if (!field) return "-";
//     if (subField && typeof field === "object") return field[subField] || "-";
//     return field;
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6">

//       {/* Dropdowns */}
//       <div className="bg-white shadow-md rounded-lg p-4 mb-6 flex flex-col md:flex-row gap-4 items-center">
//         <h1 className="text-xl font-semibold text-gray-800 flex-1">Select Candidate</h1>

//         <select
//           className="border border-gray-300 rounded-md p-2 w-full md:w-48"
//           value={selectedJob}
//           onChange={(e) => setSelectedJob(e.target.value)}
//         >
//           <option value="">Select Job</option>
//           {jobs.map(job => (
//             <option key={job._id} value={job._id}>{job.position}</option>
//           ))}
//         </select>

//         <select
//           className="border border-gray-300 rounded-md p-2 w-full md:w-48"
//           value={selectedClient}
//           onChange={(e) => setSelectedClient(e.target.value)}
//           disabled={!clients.length}
//         >
//           <option value="">Select Client</option>
//           {clients.map(client => (
//             <option key={client._id} value={client._id}>{client.company_name}</option>
//           ))}
//         </select>

//         <select
//           className="border border-gray-300 rounded-md p-2 w-full md:w-48"
//           value={selectedPoc}
//           onChange={(e) => setSelectedPoc(e.target.value)}
//           disabled={!pocs.length}
//         >
//           <option value="">Select POC</option>
//           {pocs.map(poc => (
//             <option key={poc._id} value={poc._id}>{poc.poc_name}</option>
//           ))}
//         </select>
//       </div>

//       {/* Candidate List */}
//       {candidates.length > 0 ? (
//         <div className="overflow-x-auto mb-6">
//           <table className="min-w-full border border-gray-300">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-4 py-2 border">Name</th>
//                 <th className="px-4 py-2 border">Job</th>
//                 <th className="px-4 py-2 border">Client</th>
//                 <th className="px-4 py-2 border">POC</th>
//                 <th className="px-4 py-2 border">Email</th>
//                 <th className="px-4 py-2 border">Contact</th>
//               </tr>
//             </thead>
//             <tbody>
//               {candidates.map(c => (
//                 <tr
//                   key={c._id}
//                   className="cursor-pointer hover:bg-gray-50"
//                   onClick={() => navigate(`/candidate-details/${c._id}`)}
//                 >
//                   <td className="px-4 py-2 border">{c.candidate_name}</td>
//                   <td className="px-4 py-2 border">{safeRender(c.job_id, "position")}</td>
//                   <td className="px-4 py-2 border">{safeRender(c.job_id?.client, "company_name")}</td>
//                   <td className="px-4 py-2 border">{safeRender(c.job_id?.poc, "poc_name")}</td>
//                   <td className="px-4 py-2 border">{c.email || "-"}</td>
//                   <td className="px-4 py-2 border">{c.contact_num || "-"}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         (selectedJob && selectedClient && selectedPoc) &&
//         <p className="text-center text-gray-500">No candidates found.</p>
//       )}

//     </div>
//   );
// }

// export default MainPage;

