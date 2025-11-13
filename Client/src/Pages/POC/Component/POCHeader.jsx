import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import DownImg from "../../../assets/icons/down.svg";

function PocHeader({ setData }) {
  const [clientStatus, SetClientStatus] = useState(false);
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedClient, setSelectedClient] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  // Fetch clients
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await axios.post("http://localhost:8080/client/list", { status: "ACTIVE" });
        setClients(res.data.clients);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };
    fetchClients();
  }, []);

  // Fetch POCs for selected client
  const handleSelectClient = async (clientId) => {
    setSelectedClient(clientId);
    setDropdownOpen(false); // close dropdown after selection
    try {
      const options = {
        url: "http://localhost:8080/client/poc/list",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        data: { client_id: clientId },
      };
      const response = await axios(options);
      setData(response.data.pocs);
    } catch (error) {
      console.error("Error fetching POCs:", error);
    }
  };

  const filteredClients = clients.filter((c) =>
    c.company_name.toLowerCase().includes(search.toLowerCase())
  );

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Job Status buttons
  const filterShowClosedClients = async () => {
  const dataToSend = selectedClient ? { status: "INACTIVE", client_id: selectedClient } : { status: "INACTIVE" };
  const response = await axios.post("http://localhost:8080/client/poc/list", dataToSend);
  setData(response.data.pocs);
};
  const filterShowActiveJobs = async () => {
  const dataToSend = selectedClient ? { status: "ACTIVE", client_id: selectedClient } : { status: "ACTIVE" };
  const response = await axios.post("http://localhost:8080/client/poc/list", dataToSend);
  setData(response.data.pocs);
};

  return (
    <div className="flex w-10/12 m-auto justify-between items-center topNavigationBoxShadow bg-transparent mt-2 p-4 h-14">
  {/* Add New POC Button */}
  <div>
    <Link to={"/CreatePOC"}>
      <button
        type="submit"
        className="btnfont btn btn-md bg-primary border-none hover:bg-black"
      >
        Add New POC
      </button>
    </Link>
  </div>

  {/* Client Dropdown / SearchBox */}
  <div className="relative w-64">
    <button
      onClick={() => setDropdownOpen(!dropdownOpen)}
      className="w-full border border-gray-300 p-2 rounded-md flex justify-between items-center bg-white"
    >
      {selectedClient
        ? clients.find((c) => c._id === selectedClient)?.company_name
        : "Select Client"}
      <img
        src={DownImg}
        className={`w-4 h-4 ml-2 transition-transform ${
          dropdownOpen ? "rotate-180" : "rotate-0"
        }`}
      />
    </button>
    {dropdownOpen && (
      <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md max-h-60 overflow-y-auto z-50">
        <input
          type="text"
          placeholder="Search client..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-b border-gray-300 p-2 w-full"
        />
        {filteredClients.length > 0 ? (
          filteredClients.map((client) => (
            <div
              key={client._id}
              className={`p-2 cursor-pointer hover:bg-gray-200 ${
                selectedClient === client._id ? "bg-gray-300" : ""
              }`}
              onClick={() => handleSelectClient(client._id)}
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

  {/* Job Status Button */}
  <div className="relative">
    <button
      onClick={() => SetClientStatus(!clientStatus)}
      className="btn bg-transparent text-secondry normal-case gap-2 rounded-lg border-0 border-solid border-secondry hover:bg-primary hover:border-solid hover:border-primary hover:text-white"
    >
      Job Status
      <img className="ml-2 w-4 h-4" src={DownImg}></img>
    </button>
  {clientStatus && (
  <div className="absolute top-full mt-2 right-0 dropdown-bottom z-50">
    <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40 flex justify-between">
      <li onClick={filterShowActiveJobs}>
        <a className="px-2 py-1">Active</a>
      </li>
      <li onClick={filterShowClosedClients}>
        <a className="px-2 py-1">Closed</a>
      </li>
    </ul>
  </div>
)}

  </div>
</div>

  );
}

export default PocHeader;
