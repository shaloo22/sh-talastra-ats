// import axios from "axios";
// import React, { useEffect } from "react";
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import DeleteIcon from "../../../assets/icons/delete.svg";
// import SocialIcon from "../../../assets/icons/share.svg";
// function ShowClientElement({ data = [], setData, onClientClick }) {
//   // if (!data || data.length === 0) { return <p>No clients</p>;
//   const navigate = useNavigate();
//   const handleJob = (id) => {
//     navigate(`/POCHome/${id}`);
//   };
//   // console.log(data);
//   return (
//     <div className="flex flex-wrap gap-6">
//       {data?.map((e, index) => {
//         return (
//           <div
//             key={index}
//             onClick={(event) => handleJob(e._id)}
//             title="Job"
//             className="bg-white hover:bg-gray-100  hover:border hover:border-solid hover:border-gray-300 flex flex-wrap  items-center w-80 pl-4 pr-4 pt-2 modalShadow cursor-pointer "
//           >
//             {/* <Link to={"/JobDetails"}> */}
//             <div className=" w-full p-2 flex justify-between items-center ">
//               <h2 className="heading3 inline font-medium">{e.company_name}</h2>
//               <button
//                 className="inline float-right mr-4 p-2 w-20 rounded-full font-medium text-primarytext  border-2 border-solid
//                border-secondry bg-secondry text-white hover:text-white"
//               >
//                 Active
//               </button>
//             </div>

//             <div className="flex flex-row w-full pb-4">
//               <div className=" w-4/5 ml-4">
//                 <p className="text-sm heading4">Location: {e.location}</p>
//               </div>
//               <div className=" w-4/5 ml-4">
//                 <p className="text-sm heading4">{e.website}</p>
//               </div>
//               {/*}
//               <div className="flex justify-around items-center w-1/4">
//                 <img src={DeleteIcon} alt="" className="inline w-4 h-4" />
//               </div>
//               {*/}
//             </div>

//             {/* </Link> */}
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default ShowClientElement;
import React from "react";
import { MapPinIcon, GlobeAltIcon } from "@heroicons/react/24/solid";

function ShowClientElement({ data = [], onClientClick }) {
  if (!data || data.length === 0) {
    return <p className="text-gray-500">No clients available.</p>;
  }
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full border border-gray-200 bg-white">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="py-3 px-5 border-b text-sm font-semibold text-gray-700">
              Client Name
            </th>
            <th className="py-3 px-5 border-b text-sm font-semibold text-gray-700">
              Location
            </th>
            <th className="py-3 px-5 border-b text-sm font-semibold text-gray-700">
              Website
            </th>
            <th className="py-3 px-5 border-b text-sm font-semibold text-gray-700">
              Brief
            </th>
            <th className="py-3 px-5 border-b text-sm font-semibold text-gray-700">
              Status
            </th>
          </tr>
        </thead>
        <tbody >
          {data.map((client) => (
            <tr
              key={client._id}
              onClick={() => onClientClick(client._id)}
              className="hover:bg-gray-50 cursor-pointer"
            >
              <td className="py-3 px-5 border-b font-medium text-gray-900 align-middle">
                {client.company_name}
              </td>
              <td className="py-3 px-5 border-b text-gray-700 align-middle">
              
                <div className="flex items-center gap-2">
                  <MapPinIcon className="w-4 h-4 text-gray-400" />
                  <span>{client.location}</span>
                </div>
              </td>
              <td className="py-3 px-5 border-b text-gray-700 align-middle">
                <div className="flex items-center gap-2">
                  <GlobeAltIcon className="w-4 h-4 text-gray-400" />
                  <a
                    href={client.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline break-all"
                  >
                    {client.website}
                  </a>
                </div>
              </td>
              <td className="py-3 px-5 border-b text-gray-700 align-middle max-w-xs truncate">
                {client.brief ? client.brief : "No brief provided."}
              </td>
              <td className="py-3 px-5 border-b text-center align-middle">
                <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full ">
                  Active
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShowClientElement;



