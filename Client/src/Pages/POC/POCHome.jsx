import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ShowPOCElement from "./Component/ShowPOCElement";
import POCHeader from "./Component/POCHeader";
import LeftMenuBar from "../../Components/Dashboard/LeftMenuBar";
import TopNavigationBar from "../../Components/Dashboard/TopNavigationBar";

function POCHome() {
  const [data, setData] = useState([]);

  // Load default Active POCs on page load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          url: "http://localhost:8080/client/poc/list",
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
          data: { status: "ACTIVE" }, // default: show all active POCs
        };

        const response = await axios(options);
        setData(response.data.pocs); // update state
      } catch (error) {
        console.error("Error fetching POC:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex bg-white">
      {/* Left Menu */}
      <div className="hidden sm:block w-2/12 bg-white h-screen">
        <LeftMenuBar />
      </div>

      {/* Main Content */}
      <div className="w-full bg-background">
        <div className="p-0">
          <TopNavigationBar title={"POC"} />

          {/* Header with Job Status & Client Dropdown */}
          <POCHeader setData={setData} />
        </div>

        {/* POC List */}
        <div className="ml-8 flex flex-wrap gap-6 mt-12 w-11/12 m-auto p-2">
          <ShowPOCElement data={data} setData={setData} />
        </div>
      </div>
    </div>
  );
}

export default POCHome;
