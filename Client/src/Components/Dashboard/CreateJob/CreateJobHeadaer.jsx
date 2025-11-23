// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import DownImg from "../../../assets/icons/down.svg";

// function CreateJobHeader({ setData }) {
//   const [jobStatus, setJobStatus] = useState(false);

//   const [clients, setClients] = useState([]);
//   const [filteredClients, setFilteredClients] = useState([]);
//   const [selectedClient, setSelectedClient] = useState("");
//   const [clientDropdownOpen, setClientDropdownOpen] = useState(false);
//   const [clientSearch, setClientSearch] = useState("");

//   const [pocs, setPocs] = useState([]);
//   const [selectedPOC, setSelectedPOC] = useState("");

//   // Fetch all jobs initially
//   // useEffect(() => {
//   //   axios
//   //     .get("http://localhost:8080/job/get-all-jobs")
//   //     .then((res) => setData(res.data.jobs || []))
//   //     .catch((err) => console.error("Fetch all jobs error:", err));
//   // }, [setData]);

//   // Fetch all clients
//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/clients/all")
//       .then((res) => setClients(res.data.clients || []))
//       .catch((err) => console.error("Clients fetch error:", err));
//   }, []);

//   // Filter clients based on search input
//   useEffect(() => {
//     setFilteredClients(
//       clients.filter((c) =>
//         c.company_name.toLowerCase().includes(clientSearch.toLowerCase())
//       )
//     );
//   }, [clientSearch, clients]);

//   useEffect(() => {
//     if (selectedClient) {
//       axios
//         .post("http://localhost:8080/poc/by-client", { client_id: selectedClient })
//         .then((res) => setPocs(res.data.pocs || []))
//         .catch((err) => console.error("POCs fetch error:", err));
//     } else {
//       setPocs([]);
//       setSelectedPOC("");
//     }
//   }, [selectedClient]);

//   useEffect(() => {
//     if (selectedClient && selectedPOC) {
//      axios.get("http://localhost:8080/job/get-jobs/filter", {
//   params: {
//     clientId: selectedClient,
//     pocId: selectedPOC,
//     status: "Active", 
//   }
// })
// .then(res => setData(res.data))
// .catch(err => console.error("Job filter error:", err));
//     }
//   }, [selectedClient, selectedPOC, setData]);

//   return (
//     <div className="flex flex-wrap w-11/12 mx-auto justify-between items-center bg-white shadow-md rounded-lg p-4 mt-4">
    
//       <div className="w-full sm:w-1/4 mb-2 sm:mb-0 text-center">
//         <Link to="/postjob">
//           <button className="w-full sm:w-auto btnfont btn btn-md bg-primary text-white border-none hover:bg-black rounded-lg px-6 py-2">
//             Create New Job
//           </button>
//         </Link>
//       </div>

//       <div className="flex flex-wrap gap-4 items-center w-full sm:w-3/4 justify-end">
       
//         <div className="relative w-64">
//           <button
//             onClick={() => setClientDropdownOpen(!clientDropdownOpen)}
//             className="w-full border border-gray-300 p-2 rounded-lg flex justify-between items-center bg-white hover:border-primary focus:outline-none"
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
//             <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg max-h-60 overflow-y-auto z-50 shadow-lg mt-1">
//               <input
//                 type="text"
//                 placeholder="Search client..."
//                 value={clientSearch}
//                 onChange={(e) => setClientSearch(e.target.value)}
//                 className="border-b border-gray-300 p-2 w-full focus:outline-none"
//               />
//               {filteredClients.length > 0 ? (
//                 filteredClients.map((client) => (
//                   <div
//                     key={client._id}
//                     className={`p-2 cursor-pointer hover:bg-gray-100 ${
//                       selectedClient === client._id ? "bg-gray-200" : ""
//                     }`}
//                     onClick={() => {
//                       setSelectedClient(client._id);
//                       setClientDropdownOpen(false);
//                       setSelectedPOC("");
//                     }}
//                   >
//                     {client.company_name}
//                   </div>
//                 ))
//               ) : (
//                 <div className="p-2 text-gray-500">No clients found</div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* POC Dropdown */}
//         <select
//           value={selectedPOC}
//           onChange={(e) => setSelectedPOC(e.target.value)}
//           className="border border-gray-300 rounded-lg p-2 bg-white hover:border-primary focus:outline-none"
//           disabled={!selectedClient || pocs.length === 0}
//         >
//           <option value="">Select POC</option>
//           {pocs.map((poc) => (
//             <option key={poc._id} value={poc._id}>
//               {poc.poc_name}
//             </option>
//           ))}
//         </select>

//         {/* Job Status */}
//         <div className="relative">
//           <button
//             onClick={() => setJobStatus(!jobStatus)}
//             className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white hover:bg-primary hover:text-white transition"
//           >
//             Job Status <img className="w-4 h-4" src={DownImg} />
//           </button>
//           {jobStatus && (
//             <div className="absolute top-12 right-0 w-40 bg-white shadow-lg rounded-md z-50">
//               <ul className="menu p-2">
//                 <li
//                   onClick={() => {
//                     axios
//                       .post("http://localhost:8080/job/get-jobs/active", {
//                         id: localStorage.getItem("organization_id"),
//                       })
//                       .then((res) => setData(res.data.jobs || []));
//                   }}
//                 >
//                   <a className="hover:bg-gray-100 rounded-md p-1">Active</a>
//                 </li>
//                 <li
//                   onClick={() => {
//                     axios
//                       .post("http://localhost:8080/job/get-jobs/closed", {
//                         id: localStorage.getItem("organization_id"),
//                       })
//                       .then((res) => setData(res.data.jobs || []));
//                   }}
//                 >
//                   <a className="hover:bg-gray-100 rounded-md p-1">Closed</a>
//                 </li>
//               </ul>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CreateJobHeader;

import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DownImg from "../../../assets/icons/down.svg";

function CreateJobHeader({ setData }) {
  const [jobStatus, setJobStatus] = useState(false);

  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [clientDropdownOpen, setClientDropdownOpen] = useState(false);
  const [clientSearch, setClientSearch] = useState("");

  const [pocs, setPocs] = useState([]);
  const [selectedPOC, setSelectedPOC] = useState("");

  // Fetch all clients
  useEffect(() => {
    axios
      .get("http://localhost:8080/clients/all")
      .then((res) => setClients(res.data.clients || []))
      .catch((err) => console.error("Clients fetch error:", err));
  }, []);

  // Client search
  useEffect(() => {
    setFilteredClients(
      clients.filter((c) =>
        c.company_name.toLowerCase().includes(clientSearch.toLowerCase())
      )
    );
  }, [clientSearch, clients]);

  // Fetch POCs when client changes
  useEffect(() => {
    if (selectedClient) {
      axios
        .post("http://localhost:8080/poc/by-client", { client_id: selectedClient })
        .then((res) => setPocs(res.data.pocs || []))
        .catch((err) => console.error("POCs fetch error:", err));

      setSelectedPOC("");
      setData([]); // Clear table
    } else {
      setPocs([]);
      setSelectedPOC("");
      setData([]);
    }
  }, [selectedClient]);

  useEffect(() => {
    if (selectedPOC) {
      axios
        .post("http://localhost:8080/job/get-jobs/active", {
          client_id: selectedClient,
          poc_id: selectedPOC,
        })
        .then((res) => setData(res.data.jobs || []))
        .catch((err) => console.error("Job fetch error:", err));
    } else if (selectedClient) {
      setData([]);
    }
  }, [selectedPOC, selectedClient]);

  return (
    <div className="flex flex-wrap w-11/12 mx-auto justify-between items-center bg-white shadow-md rounded-lg p-4 mt-4">

      {/* Create Job Button */}
      <div className="w-full sm:w-1/4 mb-2 sm:mb-0 text-center">
        <Link to="/postjob">
          <button className="w-full sm:w-auto bg-primary text-white hover:bg-black rounded-lg px-6 py-2">
            Create New Job
          </button>
        </Link>
      </div>

      <div className="flex flex-wrap gap-4 items-center w-full sm:w-3/4 justify-end">

        <div className="relative w-64">
          <button
            onClick={() => setClientDropdownOpen(!clientDropdownOpen)}
            className="w-full border border-gray-300 p-2 rounded-lg flex justify-between items-center bg-white"
          >
            {selectedClient
              ? clients.find((c) => c._id === selectedClient)?.company_name
              : "Select Client"}
            <img
              src={DownImg}
              className={`w-4 h-4 ml-2 transition-transform ${
                clientDropdownOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>

          {clientDropdownOpen && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg max-h-60 overflow-y-auto z-50 shadow-lg mt-1">
              <input
                type="text"
                placeholder="Search client..."
                value={clientSearch}
                onChange={(e) => setClientSearch(e.target.value)}
                className="border-b border-gray-300 p-2 w-full"
              />

              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <div
                    key={client._id}
                    className="p-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setSelectedClient(client._id);
                      setClientDropdownOpen(false);
                    }}
                  >
                    {client.company_name}
                  </div>
                ))
              ) : (
                <div className="p-2 text-gray-500">No clients found</div>
              )}
            </div>
          )}
        </div>

        <select
          value={selectedPOC}
          onChange={(e) => setSelectedPOC(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 bg-white"
          disabled={!selectedClient || pocs.length === 0}
        >
          <option value="">Select POC</option>
          {pocs.map((poc) => (
            <option key={poc._id} value={poc._id}>
              {poc.poc_name}
            </option>
          ))}
        </select>

        <div className="relative">
          <button
            onClick={() => setJobStatus(!jobStatus)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white hover:bg-primary hover:text-white"
          >
            Job Status <img className="w-4 h-4" src={DownImg} />
          </button>

          {jobStatus && (
            <div className="absolute top-12 right-0 w-40 bg-white shadow-lg rounded-md z-50">
              <ul className="menu p-2">
                <li
                  onClick={() => {
                    if (!selectedClient || !selectedPOC) {
                      alert("Please select Client and POC first");
                      return;
                    }
                    axios
                      .post("http://localhost:8080/job/get-jobs/active", {
                        client_id: selectedClient,
                        poc_id: selectedPOC,
                      })
                      .then((res) => {
                        setData(res.data.jobs || []);
                        setJobStatus(false);
                      });
                  }}
                >
                  <a className="hover:bg-gray-100 rounded-md p-1">Active</a>
                </li>

                <li
                  onClick={() => {
                    if (!selectedClient || !selectedPOC) {
                      alert("Please select Client and POC first");
                      return;
                    }
                    axios
                      .post("http://localhost:8080/job/get-jobs/closed", {
                        client_id: selectedClient,
                        poc_id: selectedPOC,
                      })
                      .then((res) => {
                        setData(res.data.jobs || []);
                        setJobStatus(false);
                      });
                  }}
                >
                  <a className="hover:bg-gray-100 rounded-md p-1">Closed</a>
                </li>
              </ul>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default CreateJobHeader;
