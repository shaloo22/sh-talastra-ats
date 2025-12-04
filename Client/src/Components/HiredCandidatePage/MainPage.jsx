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

//   // Fetch all jobs for dropdown
//   useEffect(() => {
//     axios.get("http://localhost:8080/job/get-all-jobs")
//       .then(res => setJobs(res.data?.jobs || []))
//       .catch(() => setJobs([]));
//   }, []);

//   // When Job is selected, fetch its Client & POC for dropdowns
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

//         // Set dropdowns
//         setClients(job?.client ? [job.client] : []);
//         setPocs(job?.poc ? [job.poc] : []);

//         // Auto-select client & poc
//         if (job?.client) setSelectedClient(job.client._id);
//         if (job?.poc) setSelectedPoc(job.poc._id);

//         setCandidates([]); // reset candidates before fetching
//       })
//       .catch(err => console.error("Error fetching job details:", err));
//   }, [selectedJob]);

//   // Fetch candidates based on selected filters
//   useEffect(() => {
//     if (!selectedJob || !selectedClient || !selectedPoc) return;

//     const fetchCandidates = async () => {
//       try {
//         const res = await axios.post("http://localhost:8080/candidate/filter", {
//           job_id: selectedJob,
//           client_id: selectedClient,
//           poc_id: selectedPoc
//         });
//         setCandidates(res.data?.candidates || []);
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

//       {/* Header with dropdowns */}
//       <div className="bg-white shadow-md rounded-lg p-4 mb-6 flex flex-col md:flex-row gap-4 items-center">
//         <h1 className="text-xl font-semibold text-gray-800 flex-1">Select Candidate</h1>

//         {/* Job Dropdown */}
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

//         {/* Client Dropdown */}
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

//         {/* POC Dropdown */}
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

//       {/* Candidate List Table */}
//       {selectedJob && selectedClient && selectedPoc ? (
//         candidates.length > 0 ? (
//           <div className="overflow-x-auto mb-6">
//             <table className="min-w-full border border-gray-300">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="px-4 py-2 border">Name</th>
//                   <th className="px-4 py-2 border">Job</th>
//                   <th className="px-4 py-2 border">Client</th>
//                   <th className="px-4 py-2 border">POC</th>
//                   <th className="px-4 py-2 border">Email</th>
//                   <th className="px-4 py-2 border">Contact</th>
//                 </tr>
//               </thead>
//               <tbody>
//                {candidates.map(c => (
//                 <tr
//                   key={c._id}
//                   className="cursor-pointer hover:bg-gray-50"
//                   onClick={() => navigate(`/candidatedetails/${c._id}`)}
//                 >
//                   <td className="px-4 py-2 border">{c.candidate_name}</td>
//                   <td className="px-4 py-2 border">{safeRender(c.job_id, "position")}</td>
//                   <td className="px-4 py-2 border">{safeRender(c.job_id?.client, "company_name")}</td>
//                   <td className="px-4 py-2 border">{safeRender(c.job_id?.poc, "poc_name")}</td>
//                   <td className="px-4 py-2 border">{c.email || "-"}</td>
//                   <td className="px-4 py-2 border">{c.contact_num || "-"}</td>
//                 </tr>
//               ))}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <p className="text-center text-gray-500">No candidates found.</p>
//         )
//       ) : (
//         <p className="text-center text-gray-500">Please select Job, Client, and POC to see candidates.</p>
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

  useEffect(() => {
    axios.get("http://localhost:8080/job/get-all-jobs")
      .then(res => setJobs(res.data?.jobs || res.data || []))
      .catch(() => setJobs([]));
  }, []);

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

      <div className="bg-white shadow-md rounded-lg p-4 mb-6 flex flex-col md:flex-row gap-4 items-center">
        <h1 className="text-xl font-semibold text-gray-800 flex-1">Select Candidate</h1>

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
// import DownImg from "../../assets/icons/down.svg";

// function MainPage() {
//   const navigate = useNavigate();

//   const [clients, setClients] = useState([]);
//   const [pocs, setPocs] = useState([]);
//   const [jobs, setJobs] = useState([]);
//   const [candidates, setCandidates] = useState([]);

//   const [selectedClient, setSelectedClient] = useState("");
//   const [selectedPoc, setSelectedPoc] = useState("");
//   const [selectedJob, setSelectedJob] = useState("");

//   const [clientDropdownOpen, setClientDropdownOpen] = useState(false);
//   const [pocDropdownOpen, setPocDropdownOpen] = useState(false);
//   const [jobDropdownOpen, setJobDropdownOpen] = useState(false);

//   const [clientSearch, setClientSearch] = useState("");
//   const [pocSearch, setPocSearch] = useState("");
//   const [jobSearch, setJobSearch] = useState("");

//   const normalizeId = (id) => id?._id?.$oid || id?._id || id;

//   const filteredClients = clients.filter((c) =>
//     c?.company_name?.toLowerCase().includes(clientSearch.toLowerCase())
//   );

//   const filteredPocs = pocs.filter((p) =>
//     p?.poc_name?.toLowerCase().includes(pocSearch.toLowerCase())
//   );

//   const filteredJobs = jobs.filter((j) =>
//     j?.position?.toLowerCase().includes(jobSearch.toLowerCase())
//   );
//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/client/all")
//       .then((res) => {
//         const normalizedClients = (res.data.clients || []).map((c) => ({
//           ...c,
//           _id: normalizeId(c),
//         }));
//         setClients(normalizedClients);
//       })
//       .catch(() => setClients([]));
//   }, []);

//   useEffect(() => {
//     if (!selectedClient) {
//       setPocs([]);
//       setSelectedPoc("");
//       setJobs([]);
//       setSelectedJob("");
//       setCandidates([]);
//       return;
//     }

//     axios
//       .post("http://localhost:8080/poc/list", { client_id: selectedClient })
//       .then((res) => {
//         const normalizedPocs = (res.data.pocs || []).map((p) => ({
//           ...p,
//           _id: normalizeId(p),
//         }));
//         setPocs(normalizedPocs);
//       })
//       .catch(() => setPocs([]));

//     setSelectedPoc("");
//     setJobs([]);
//     setSelectedJob("");
//     setCandidates([]);
//   }, [selectedClient]);

//   useEffect(() => {
//     if (!selectedClient || !selectedPoc) {
//       setJobs([]);
//       setSelectedJob("");
//       setCandidates([]);
//       return;
//     }

//     axios
//       .get(
//         `http://localhost:8080/job/get-jobs/filter?clientId=${selectedClient}&pocId=${selectedPoc}`
//       )
//       .then((res) => {
//         const normalizedJobs = (res.data || []).map((j) => ({
//           ...j,
//           _id: normalizeId(j),
//         }));
//         setJobs(normalizedJobs);
//       })
//       .catch(() => setJobs([]));

//     setSelectedJob("");
//     setCandidates([]);
//   }, [selectedClient, selectedPoc]);

//   useEffect(() => {
//     if (!selectedClient || !selectedPoc || !selectedJob) return;

//     axios
//       .post("http://localhost:8080/candidate/filter", {
//         client_id: selectedClient,
//         poc_id: selectedPoc,
//         job_id: selectedJob,
//       })
//       .then((res) => {
//         const normalizedCandidates = (res.data.candidates || []).map((c) => ({
//           ...c,
//           _id: normalizeId(c),
//           client: c.client?._id ? { ...c.client, _id: normalizeId(c.client) } : c.client,
//           poc: c.poc?._id ? { ...c.poc, _id: normalizeId(c.poc) } : c.poc,
//           job_id: c.job_id?._id ? { ...c.job_id, _id: normalizeId(c.job_id) } : c.job_id,
//         }));
//         setCandidates(normalizedCandidates);
//       })
//       .catch(() => setCandidates([]));
//   }, [selectedClient, selectedPoc, selectedJob]);

//   const handleSelectClient = (id) => {
//     if (!id) return;
//     setSelectedClient(id);
//     setClientSearch("");
//     setClientDropdownOpen(false);

//     setSelectedPoc("");
//     setSelectedJob("");
//   };

//   const handleSelectPoc = (id) => {
//     if (!id) return;
//     setSelectedPoc(id);
//     setPocSearch("");
//     setPocDropdownOpen(false);

//     setSelectedJob("");
//   };

//   const handleSelectJob = (id) => {
//     if (!id) return;
//     setSelectedJob(id);
//     setJobSearch("");
//     setJobDropdownOpen(false);
//   };

//   const safeRender = (field, subField) => {
//     if (!field) return "-";
//     if (subField && typeof field === "object") return field[subField] || "-";
//     return field;
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6 flex flex-col gap-6">
//       <div className="flex flex-col md:flex-row gap-4 items-center">
//         <div className="relative w-64">
//           <button
//             onClick={() => setClientDropdownOpen(!clientDropdownOpen)}
//             className="w-full border border-gray-300 p-2 rounded-md flex justify-between items-center bg-white"
//           >
//             {selectedClient
//               ? clients.find((c) => c._id === selectedClient)?.company_name
//               : "Select Client"}
//             <img
//               src={DownImg}
//               className={`w-4 h-4 ml-2 transition-transform ${
//                 clientDropdownOpen ? "rotate-180" : "rotate-0"
//               }`}
//             />
//           </button>

//           {clientDropdownOpen && (
//             <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md max-h-60 overflow-y-auto z-50">
//               <input
//                 type="text"
//                 placeholder="Search client..."
//                 value={clientSearch}
//                 onChange={(e) => setClientSearch(e.target.value)}
//                 className="border-b border-gray-300 p-2 w-full"
//               />
//               {filteredClients.length > 0 ? (
//                 filteredClients.map((c) => (
//                   <div
//                     key={c._id}
//                     onMouseDown={(e) => e.preventDefault()}
//                     className={`p-2 cursor-pointer hover:bg-gray-200 ${
//                       selectedClient === c._id ? "bg-gray-300" : ""
//                     }`}
//                     onClick={() => handleSelectClient(c._id)}
//                   >
//                     {c.company_name}
//                   </div>
//                 ))
//               ) : (
//                 <div className="p-2 text-gray-500">No clients found</div>
//               )}
//             </div>
//           )}
//         </div>

//         <div className="relative w-64">
//           <button
//             onClick={() => setPocDropdownOpen(!pocDropdownOpen)}
//             className="w-full border border-gray-300 p-2 rounded-md flex justify-between items-center bg-white"
//             disabled={!selectedClient}
//           >
//             {selectedPoc
//               ? pocs.find((p) => p._id === selectedPoc)?.poc_name
//               : "Select POC"}
//             <img
//               src={DownImg}
//               className={`w-4 h-4 ml-2 transition-transform ${
//                 pocDropdownOpen ? "rotate-180" : "rotate-0"
//               }`}
//             />
//           </button>

//           {pocDropdownOpen && (
//             <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md max-h-60 overflow-y-auto z-50">
//               <input
//                 type="text"
//                 placeholder="Search POC..."
//                 value={pocSearch}
//                 onChange={(e) => setPocSearch(e.target.value)}
//                 className="border-b border-gray-300 p-2 w-full"
//               />
//               {filteredPocs.length > 0 ? (
//                 filteredPocs.map((p) => (
//                   <div
//                     key={p._id}
//                     onMouseDown={(e) => e.preventDefault()}
//                     className={`p-2 cursor-pointer hover:bg-gray-200 ${
//                       selectedPoc === p._id ? "bg-gray-300" : ""
//                     }`}
//                     onClick={() => handleSelectPoc(p._id)}
//                   >
//                     {p.poc_name}
//                   </div>
//                 ))
//               ) : (
//                 <div className="p-2 text-gray-500">No POCs found</div>
//               )}
//             </div>
//           )}
//         </div>

//         <div className="relative w-64">
//           <button
//             onClick={() => setJobDropdownOpen(!jobDropdownOpen)}
//             className="w-full border border-gray-300 p-2 rounded-md flex justify-between items-center bg-white"
//             disabled={!selectedPoc}
//           >
//             {selectedJob
//               ? jobs.find((j) => j._id === selectedJob)?.position
//               : "Select Job"}
//             <img
//               src={DownImg}
//               className={`w-4 h-4 ml-2 transition-transform ${
//                 jobDropdownOpen ? "rotate-180" : "rotate-0"
//               }`}
//             />
//           </button>

//           {jobDropdownOpen && (
//             <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md max-h-60 overflow-y-auto z-50">
//               <input
//                 type="text"
//                 placeholder="Search Job..."
//                 value={jobSearch}
//                 onChange={(e) => setJobSearch(e.target.value)}
//                 className="border-b border-gray-300 p-2 w-full"
//               />
//               {filteredJobs.length > 0 ? (
//                 filteredJobs.map((j) => (
//                   <div
//                     key={j._id}
//                     onMouseDown={(e) => e.preventDefault()}
//                     className={`p-2 cursor-pointer hover:bg-gray-200 ${
//                       selectedJob === j._id ? "bg-gray-300" : ""
//                     }`}
//                     onClick={() => handleSelectJob(j._id)}
//                   >
//                     {j.position}
//                   </div>
//                 ))
//               ) : (
//                 <div className="p-2 text-gray-500">No jobs found</div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//       {selectedClient && selectedPoc && selectedJob ? (
//         candidates.length > 0 ? (
//           <div className="overflow-x-auto">
//             <table className="min-w-full border border-gray-300">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="px-4 py-2 border">Name</th>
//                   <th className="px-4 py-2 border">Job</th>
//                   <th className="px-4 py-2 border">Client</th>
//                   <th className="px-4 py-2 border">POC</th>
//                   <th className="px-4 py-2 border">Email</th>
//                   <th className="px-4 py-2 border">Contact</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {candidates.map((c) => (
//                   <tr
//                     key={c._id}
//                     className="cursor-pointer hover:bg-gray-50"
//                     onClick={() => navigate(`/candidatedetails/${c._id}`)}
//                   >
//                     <td className="px-4 py-2 border">{c.candidate_name || "-"}</td>
//                     <td className="px-4 py-2 border">
//                       {safeRender(c.job_id, "position")}
//                     </td>
//                     <td className="px-4 py-2 border">
//                       {safeRender(c.client, "company_name")}
//                     </td>
//                     <td className="px-4 py-2 border">
//                       {safeRender(c.poc, "poc_name")}
//                     </td>
//                     <td className="px-4 py-2 border">{c.email || "-"}</td>
//                     <td className="px-4 py-2 border">{c.contact_num || "-"}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <p className="text-center text-gray-500">No candidates found.</p>
//         )
//       ) : (
//         <p className="text-center text-gray-500">
         
//         </p>
//       )}
//     </div>
//   );
// }

// export default MainPage;

