
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ShowClientElelement from "./Component/ShowClientElement";
import ClientHeadaer from "./Component/ClientHeader";
import LeftMenuBar from "../../Components/Dashboard/LeftMenuBar";
import TopNavigationBar from "../../Components/Dashboard/TopNavigationBar";
function ClientHome() {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      // axios POST request
      const options = {
        url: "http://localhost:8080/client/list",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        data: { status : "ACTIVE" },
      };

      axios(options).then((response) => {
         console.log(response);
        setData(response.data.clients);
      });
    };
    fetchData();
  }, []);

  return (
    <div className="flex bg-white">
      <div className="hidden sm:block w-2/12 bg-white h-screen ">
        <LeftMenuBar />
      </div>
      <div className="w-full bg-background ">
        <div className="p-0">
          <TopNavigationBar title={"Clients"} />

          <ClientHeadaer setData={setData} />
        </div>

        <div className="ml-8 flex flex-wrap  gap-6 mt-12 w-11/12 m-auto p-2">
          <ShowClientElelement data={data} setData={setData} />
        </div>
      </div>
    </div>
  );
}

export default ClientHome;
