import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const [createdJobs, setCreatedJobs] = useState();

  useEffect(() => {
    const fetchData = () => {
      // axios POST request
      const options = {
        url: "http://localhost:8080/job/get-jobs",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        data: { id: localStorage.getItem("organization_id") },
      };

      axios(options).then((response) => {
        setCreatedJobs(response.data.jobs);
      });
    };

    fetchData();
  }, [0]);

  const navigate = useNavigate();
  return (
    <div className="p-6">
      <h2 className="heading3 sm:text-justify text-center sm:font-normal font-medium">
        Hired Candidate Details
      </h2>
      <div className="flex p-2 mt-12 flex-wrap gap-12 items-center justify-center">
        {createdJobs?.map((element, index) => {
          return (
            <div
              onClick={() => navigate(`details/${element._id}`)}
              key={index}
              className="cursor-pointer bg-white border border-solid border-gray-200 shadow-md rounded-lg w-80 h-72 pb-2
        hover:bg-gray-50
        "
            >
              <div className="flex-wrap gap-0 flex justify-around p-4">
                <div className="">
                  <h3 className="heading3 font-medium inline">
                    {element.jobPosition}
                  </h3>
                </div>
                <div className="mt-2">
                  <h2 className="inline bg-black text-white p-4 rounded-3xl">
                    {element.department}
                  </h2>
                </div>
              </div>

              <div className="overflow-hidden">
                {element.department == "HR" ? (
                  <img
                    className="w-1/2 block m-auto p-2"
                    src=""
                    alt=""
                  />
                ) : element.department == "IT" ? (
                  <img
                    className="w-1/2 block m-auto p-2"
                    src=""
                    alt=""
                  />
                ) : (
                  <img
                    className="w-1/2 block m-auto p-2"
                    src="0k="
                    alt=""
                  />
                )}

                <h2 className="text-center heading3 font-medium text-xl underline">
                  {element.applicants_no} Applied
                </h2>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MainPage;
