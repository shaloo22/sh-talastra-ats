// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import CreatedJobElement from "../components/CreatedJobElement";

// function JobsList() {
//     const [clients, setClients] = useState([]);
//     const [pocs, setPocs] = useState([]);
//     const [clientId, setClientId] = useState("");
//     const [pocId, setPocId] = useState("");
//     const [jobs, setJobs] = useState([]);

//     useEffect(() => {
//         axios.get("http://localhost:8080/api/clients").then(res => setClients(res.data));
//     }, []);

//     useEffect(() => {
//         if(clientId){
//             axios.get(`http://localhost:8080/api/pocs/${clientId}`).then(res => setPocs(res.data));
//             setPocId("");
//         }
//     }, [clientId]);

//     useEffect(() => {
//         if(clientId){
//             axios.get(`http://localhost:8080/api/jobs/filter?clientId=${clientId}&pocId=${pocId}`)
//                 .then(res => setJobs(res.data))
//                 .catch(err => console.log(err));
//         }
//     }, [clientId, pocId]);

//     return (
//         <div className="p-4">
//             <select value={clientId} onChange={(e)=>setClientId(e.target.value)}>
//                 <option value="">Select Client</option>
//                 {clients.map(c => <option key={c._id} value={c._id}>{c.client_name}</option>)}
//             </select>

//             <select value={pocId} onChange={(e)=>setPocId(e.target.value)}>
//                 <option value="">Select POC</option>
//                 {pocs.map(p => <option key={p._id} value={p._id}>{p.poc_name}</option>)}
//             </select>

//             <CreatedJobElement data={jobs} />
//         </div>
//     );
// }

// export default JobsList;
