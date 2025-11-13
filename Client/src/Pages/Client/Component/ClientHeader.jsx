import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import DownImg from "../../../assets/icons/down.svg";

function ClientHeader({ setData }) {
  const [clientStatus, SetClientStatus] = useState(false);

  const filterShowClosedClients = async () => {
    try {
      const response = await axios.post("http://localhost:8080/client/list", {
        status: "INACTIVE",
      });
      setData(response.data.clients);
    } catch (error) {
      console.error("Error fetching closed clients:", error);
    }
  };

  const filterShowActiveJobs = async () => {
    try {
      const response = await axios.post("http://localhost:8080/client/list", {
        status: "ACTIVE",
      });
      setData(response.data.clients);
    } catch (error) {
      console.error("Error fetching active clients:", error);
    }
  };

  return (
    <div className="flex w-10/12 m-auto justify-between items-center topNavigationBoxShadow bg-transparent mt-2 p-4 h-14">
      {/* Add New Client Button */}
      <div>
        <Link to={"/createClient"}>
          <button
            type="submit"
            className="btnfont btn btn-md bg-primary border-none hover:bg-black"
          >
            Add New Client
          </button>
        </Link>
      </div>

      {/* Job Status Dropdown */}
      <div className="relative">
        <button
          onClick={() => SetClientStatus(!clientStatus)}
          className="btn bg-transparent text-secondry normal-case gap-2 rounded-lg border-0 border-solid border-secondry hover:bg-primary hover:border-solid hover:border-primary hover:text-white"
        >
          Job Status
          <img className="ml-2 w-4 h-4" src={DownImg}></img>
        </button>
              {clientStatus && (
          <div className="absolute top-full mt-2 right-0 z-50">
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

export default ClientHeader;
