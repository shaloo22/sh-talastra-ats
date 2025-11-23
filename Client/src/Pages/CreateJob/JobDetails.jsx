// import axios from "axios";
// import React, { useEffect } from "react";
// import { useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import FilterProfiles from "../../Components/Dashboard/CreateJob/FIlterProfiles";
// import TopRcruitementCycle from "../../Components/Dashboard/CreateJob/TopRcruitementCycle";
// import LeftMenuBar from "../../Components/Dashboard/LeftMenuBar";
// import TopNavigationBar from "../../Components/Dashboard/TopNavigationBar";
// import ShowMoreIcon from "../../assets/icons/show_more.svg";
// import NoUser from "../../assets/illustrations/no_user.svg";

// function JobDetails() {
//   const { id } = useParams();
//   const [candidates, setCandidates] = useState();
//   useEffect(() => {
//     const fetchData = () => {
//       // dispath(startFetchingCandidatesData());
//       // axios POST request
//       const options = {
//         url: "http://localhost:8080/details/active/applied",
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json;charset=UTF-8",
//         },
//         data: {
//           job_id: id,
//         },
//       };

//       axios(options)
//         .then((response) => {
//           setCandidates(response.data);
//           // dispath(sucessOnFetchingCandidatesData(response.data));
//         })
//         .catch((e) => {
//           // dispath(errorFetchingCandidatesData(e));
//         });
//     };

//     fetchData();
//   }, [0]);
//   //To handle nabvigation and move user to next page
//   const navigate = useNavigate();
//   const handleNavigation = (e) => {
//     navigate(`/JobDetails/applied/${e}`);
//   };

//   return (
//     <div className="flex ">
//       <div className="hidden sm:block w-2/12 h-screen ">
//         <LeftMenuBar />
//       </div>
//       <div className="w-full  bg-">
//         <div className="p-0">
//           <TopNavigationBar title={"Applied"} />
//           <TopRcruitementCycle id={id} />
//           {/* FILTER PROFILE AND APPLICANT LIST SECTION */}
//           <div className="flex flex-row ">
//             <div className="sm:block hidden w-3/12 ml-4 ">
//               <FilterProfiles can={candidates} setCan={setCandidates} />
//             </div>

//             <div className="flex overflow-hidden flex-wrap w-full sm:w-11/12 m-auto  mt-0">
//               {/*  ~~ HANDLING WITH APPLICANT UI CODE DIRECTLY HERE INSTEAD OF
//               COMPONENTS */}
//               {candidates?.length !== 0 ? (
//                 candidates?.map((e, index) => {
//                   return (
//                     <>
//                       <div
//                         key={index}
//                         onClick={(event) => handleNavigation(e._id)}
//                         className=" cursor-pointer  p-6  mt-9 w-11/12 flex  m-auto  rounded-lg border border-solid border-gray-200 hover:bg-gray-100"
//                       >
//                         {/* CANIDATE PROFILE PICTURE */}

//                         <div className="">
//                           <img
//                             width={120}
//                             height={120}
//                             src={e?.ResumeURL}
//                             alt=""
//                             className="rounded-full w-16 md:w-28 lg:w-28"
//                           />
//                         </div>
//                         {/* EDUCATION , CITY AND EXPERINCE STAT UI */}
//                         <div className="flex flex-col w-full ml-4">
//                           {/* NAME FIELD */}
//                           <div>
//                             <h3 className="heading2b">
//                               {e.firstName + " " + e.lastName}
//                             </h3>
//                           </div>
//                           <div className="flex sm:gap-0 gap-4 justify-between mt-4">
//                             <div className="p-2 w-1/4 flex flex-col justify-center text-center border border-solid border-gray-400 rounded-lg  ">
//                               <div>
//                                 <h3 className="line1 font-medium">
//                                   Experience
//                                 </h3>
//                               </div>
//                               <div>
//                                 <h3>{e.duration[0] + "/year"}</h3>
//                               </div>
//                             </div>
//                             {/* EDUCATION STAT */}
//                             <div className=" p-2 flex flex-col justify-center text-center border border-solid border-gray-400 rounded-lg w-2/6 ">
//                               <div>
//                                 <h3 className="line1 font-medium">Education</h3>
//                               </div>
//                               <div>
//                                 <h3>{e.level[0]}</h3>
//                               </div>
//                             </div>
//                             {/* CITY STAT */}
//                             <div className="p-2 flex flex-col justify-center text-center border border-solid border-gray-400 rounded-lg  sm:w-3/12 ">
//                               <div>
//                                 <h3 className="line1 font-medium">City</h3>
//                               </div>
//                               <div>
//                                 <h3>{e.city}</h3>
//                               </div>
//                             </div>
//                             <div className="relative right-16 sm:right-0 w-16">
//                               <button className="bg-gray-800 text-white p-1 h-10 w-20 rounded-3xl relative -top-12">
//                                 Applied
//                               </button>

//                               <img
//                                 className="sm:block hidden float-right ml-2 cursor-pointer"
//                                 src={ShowMoreIcon}
//                                 width={18}
//                                 alt=""
//                               />
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </>
//                   );
//                 })
//               ) : (
//                 <div className="block -ml-10">
//                   <img
//                     src={NoUser}
//                     className="w-2/5 block m-auto  mt-40"
//                     alt=""
//                   />
//                   <h2 className="heading2b text-center mt-6">
//                     No Applied Candidate
//                   </h2>
//                 </div>
//               )}
//               {/* 
//               <AppliedApplicantProfile id={id} />

//               <AppliedApplicantProfile /> */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default JobDetails;
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/job/get-job/${id}`)
      .then((res) => setJob(res.data.job))
      .catch((err) => console.error(err));
  }, [id]);

  if (!job) return <div className="text-center mt-10 text-gray-500">Loading...</div>;

  const field = (label, value) => (
    <div className="flex justify-between border-b border-gray-200 py-1">
      <span className="text-gray-600 text-sm font-medium">{label}</span>
      <span className="text-gray-800 text-sm">{value || "-"}</span>
    </div>
  );

 return (
  <div className="max-w-3xl mx-auto mt-6 bg-white shadow-lg rounded-xl border border-black-400">

    {/* HEADER */}
      <h1 className="text-center text-lg font-semibold tracking-wide mt-4">
        Job Details
      </h1>
    

    <div className="p-4 space-y-4">

      {/* BASIC INFO */}
      <div className="border border-black-400 rounded-lg">
        <div className=" px-3 py-2 text-sm font-semibold text-black border-b border-black-400">
          Basic Information
        </div>

        <div className="grid grid-cols-2 text-sm">
          
          {/* Row */}
          <div className="p-2 border-r border-b">
            <p className="text-gray-500 text-xs">Client</p>
            <p className="font-medium text-gray-900">{job.client?.company_name}</p>
          </div>

          <div className="p-2 border-b">
            <p className="text-gray-500 text-xs">POC Name</p>
            <p className="font-medium text-gray-900">{job.poc?.poc_name}</p>
          </div>

          {/* Row */}
          <div className="p-2 border-r border-b">
            <p className="text-gray-500 text-xs">Manager</p>
            <p className="font-medium text-gray-900">
              {job.internal_manager || "-"}
            </p>
          </div>

          <div className="p-2 border-b">
            <p className="text-gray-500 text-xs">Recruiter</p>
            <p className="font-medium text-gray-900">{job.internal_recruiter}</p>
          </div>

          {/* Row */}
          <div className="p-2 border-r border-b">
            <p className="text-gray-500 text-xs">Position</p>
            <p className="font-medium text-gray-900">{job.position}</p>
          </div>

          <div className="p-2 border-b">
            <p className="text-gray-500 text-xs">Technology</p>
            <p className="font-medium text-gray-900">
              {Array.isArray(job.technology)
                ? job.technology.join(", ")
                : job.technology}
            </p>
          </div>

          {/* Row */}
          <div className="p-2 border-r">
            <p className="text-gray-500 text-xs">Location</p>
            <p className="font-medium text-gray-900">{job.job_location}</p>
          </div>

          <div className="p-2">
            <p className="text-gray-500 text-xs">Notice Period</p>
            <p className="font-medium text-gray-900">{job.notice_period} Months</p>
          </div>

        </div>
      </div>

      {/* EXPERIENCE */}
      <div className="border border-black-400 rounded-lg">
        <div className=" px-3 py-2 text-sm font-semibold text-black border-b border-black-400">
          Experience Details
        </div>

        <div className="grid grid-cols-2 text-sm">

          <div className="p-2 border-r border-b">
            <p className="text-gray-500 text-xs">Total Experience</p>
            <p className="font-medium text-gray-900">{job.total_experience} Years</p>
          </div>

          <div className="p-2 border-b">
            <p className="text-gray-500 text-xs">Relevant Experience</p>
            <p className="font-medium text-gray-900">{job.recent_experience} Years</p>
          </div>

          <div className="p-2 border-r">
            <p className="text-gray-500 text-xs">Budget Range</p>
            <p className="font-medium text-gray-900">
              ₹{job.budget_from} - ₹{job.budget_to}
            </p>
          </div>

          <div className="p-2">
            <p className="text-gray-500 text-xs">Job Type</p>
            <p className="font-medium text-gray-900">
              {job.job_type || "Full Time"}
            </p>
          </div>

        </div>
      </div>

      {/* ATTACHMENTS */}
      <div className="border border-black-400 rounded-lg">
        <div className=" px-3 py-2 text-sm font-semibold text-black border-b border-black-400">
          Attachments
        </div>

        <div className="p-3 text-sm">
          {job.attachments?.length > 0 ? (
            <ul className="list-disc list-inside text-blue-600">
              {job.attachments.map((file, index) => (
                <li key={index}>
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-blue-800"
                  >
                    {file.filename || `Attachment ${index + 1}`}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-xs">No Attachments</p>
          )}
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="border border-black-400 rounded-lg">
        <div className=" px-3 py-2 text-sm font-semibold text-black border-b border-black-400">
          Job Description
        </div>
        <div
          className="p-3 text-sm text-gray-800"
          dangerouslySetInnerHTML={{ __html: job.description }}
        />
      </div>

      {/* BUTTON */}
      <Link to="/createCandidate">
        <button className="bg-primary w-full py-2 rounded-lg text-white font-semibold hover:bg-black transition">
          Add Candidate
        </button>
      </Link>

    </div>
  </div>
);


}
export default JobDetails;
