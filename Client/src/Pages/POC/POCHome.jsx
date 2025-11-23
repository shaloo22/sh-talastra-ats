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

  return (
    <div className="flex bg-white">
      <div className="hidden sm:block w-2/12 bg-white h-screen">
        <LeftMenuBar />
      </div>
      <div className="w-full bg-background">
        <div className="p-0">
          <TopNavigationBar title={"POC"} />
          <POCHeader setData={setData} />
        </div>
        <div className="ml-8 flex flex-wrap gap-6 mt-12 w-11/12 m-auto p-2">
          <ShowPOCElement data={data} setData={setData} />
        </div>
      </div>
    </div>
  );
}

export default POCHome;
