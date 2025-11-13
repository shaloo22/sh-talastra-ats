//  import axios from "axios";
// import React, { useEffect } from "react";
//  import { useState } from "react";
//  import { Link, useNavigate } from "react-router-dom";
// import DeleteIcon from "../../../assets/icons/delete.svg";
// import SocialIcon from "../../../assets/icons/share.svg";
// function ShowPocElement({ data, setData }) {
//   const navigate = useNavigate();

//   const handlePOCClick = (id) => {
//     navigate(`/POCHome/${id}`);
//   };

//   const handleDelete = (event, id) => {
//     event.stopPropagation(); // prevent navigation
//     // Optional: call API to delete POC and update state
//     console.log("Delete POC with ID:", id);
//   };

//   const handleShare = (event, id) => {
//     event.stopPropagation(); // prevent navigation
//     // Optional: implement share logic
//     console.log("Share POC with ID:", id);
//   };

//   useEffect(() => {
//   console.log(data); // Check kya aapko actual data mil raha hai
// }, [data]);

//   return (
//     <div className="flex flex-wrap gap-6">
//       {data?.map((poc, index) => (
//         <div
//           key={index}
//           onClick={() => handlePOCClick(poc._id)}
//           className="bg-white hover:bg-gray-100 hover:border hover:border-solid hover:border-gray-300 flex flex-col w-80 pl-4 pr-4 pt-2 modalShadow cursor-pointer"
//         >
//           {/* Header: Company Name & Status */}
//           <div className="w-full p-2 flex justify-between items-center">
//             <h2 className="heading3 font-medium">{poc.clien_name || "No Company"}</h2>
//             <button className="inline mr-4 p-2 w-20 rounded-full font-medium text-primarytext border-2 border-solid border-secondry bg-secondry text-white hover:text-white">
//               {poc.status || "ACTIVE"}
//             </button>
//           </div>

//           {/* POC Details */}
//           <div className="flex flex-col w-full pl-4 pb-4 space-y-1">
//             <p className="text-sm heading4">Client ID: {poc.client_id}</p>
//             <p className="text-sm heading4">POC Name: {poc.poc_name}</p>
//             <p className="text-sm heading4">Email: {poc.email}</p>
//             <p className="text-sm heading4">Location: {poc.location}</p>
//             <p className="text-sm heading4">Contact: {poc.poc_contact_number}</p>
//           </div>

//           {/* Action Icons */}
//           <div className="flex justify-end items-center gap-4 pb-2">
//             <img
//               src={SocialIcon}
//               alt="Share"
//               className="w-5 h-5 cursor-pointer"
//               onClick={(e) => handleShare(e, poc._id)}
//             />
//             <img
//               src={DeleteIcon}
//               alt="Delete"
//               className="w-5 h-5 cursor-pointer"
//               onClick={(e) => handleDelete(e, poc._id)}
//             />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default ShowPocElement;



// import React from "react";
// import { useNavigate } from "react-router-dom";
// import DeleteIcon from "../../../assets/icons/delete.svg";
// import SocialIcon from "../../../assets/icons/share.svg";

// function ShowPocElement({ data, setData }) {
//   const navigate = useNavigate();

//   const handlePOCClick = (id) => {
//     navigate(`/POCHome/${id}`);
//   };

//   const handleDelete = (event, id) => {
//     event.stopPropagation(); // prevent navigation
//     // Optional: call API to delete POC and update state
//     console.log("Delete POC with ID:", id);
//   };

//   const handleShare = (event, id) => {
//     event.stopPropagation(); // prevent navigation
//     // Optional: implement share logic
//     console.log("Share POC with ID:", id);
//   };

//   useEffect(() => {
//   console.log(data); // Check kya aapko actual data mil raha hai
// }, [data]);

//   return (
//     <div className="flex flex-wrap gap-6">
//       {data?.map((poc, index) => (
//         <div
//           key={index}
//           onClick={() => handlePOCClick(poc._id)}
//           className="bg-white hover:bg-gray-100 hover:border hover:border-solid hover:border-gray-300 flex flex-col w-80 pl-4 pr-4 pt-2 modalShadow cursor-pointer"
//         >
//           {/* Header: Company Name & Status */}
//           <div className="w-full p-2 flex justify-between items-center">
//             <h2 className="heading3 font-medium">{poc.company_name || "No Company"}</h2>
//             <button className="inline mr-4 p-2 w-20 rounded-full font-medium text-primarytext border-2 border-solid border-secondry bg-secondry text-white hover:text-white">
//               {poc.status || "ACTIVE"}
//             </button>
//           </div>

//           {/* POC Details */}
//           <div className="flex flex-col w-full pl-4 pb-4 space-y-1">
//             {/* <p className="text-sm heading4">Client ID: {poc.client_id}</p> */}
//             <p className="text-sm heading4">POC Name: {poc.poc_name}</p>
//             <p className="text-sm heading4">Email: {poc.email}</p>
//             <p className="text-sm heading4">Location: {poc.location}</p>
//             <p className="text-sm heading4">Contact: {poc.poc_contact_number}</p>
//           </div>

//           {/* Action Icons */}
//           <div className="flex justify-end items-center gap-4 pb-2">
//             <img
//               src={SocialIcon}
//               alt="Share"
//               className="w-5 h-5 cursor-pointer"
//               onClick={(e) => handleShare(e, poc._id)}
//             />
//             <img
//               src={DeleteIcon}
//               alt="Delete"
//               className="w-5 h-5 cursor-pointer"
//               onClick={(e) => handleDelete(e, poc._id)}
//             />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default ShowPocElement;

import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import DeleteIcon from "../../../assets/icons/delete.svg";
// import SocialIcon from "../../../assets/icons/share.svg";

function ShowPocElement({ data, setData }) {
  const navigate = useNavigate();

  // Navigate to POC details page
  const handlePOCClick = (id) => {
    navigate(`/POCHome/${id}`);
  };

  // Delete POC
  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      await axios.delete(`http://localhost:8080/poc/${id}`);
      setData((prev) => prev.filter((poc) => poc._id !== id));
      console.log("POC deleted:", id);
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete POC");
    }
  };

  // Share POC
  const handleShare = (e, id) => {
    e.stopPropagation();
    console.log("Share POC:", id);
    alert(`Share POC with id: ${id}`);
  };

  if (!data || data.length === 0) {
    return <p className="text-gray-500">No POCs available.</p>;
  }

  return (
    <ul className="space-y-2 w-full max-w-4xl mx-auto">
      {data.map((poc) => (
        <li
          key={poc._id}
          onClick={() => handlePOCClick(poc._id)}
          className="flex items-center justify-between px-3 py-2 hover:bg-gray-50 rounded-md cursor-pointer transition-colors"
        >
          {/* POC Info */}
          <div className="flex flex-wrap gap-4 items-center">
            <span className="font-semibold text-gray-800">{poc.company_name || "No Company"}</span>
            <span className="text-sm text-gray-600">POC: {poc.poc_name}</span>
            <span className="text-sm text-gray-600">Email: {poc.email}</span>
            <span className="text-sm text-gray-600">Location: {poc.location}</span>
            <span className="text-sm text-gray-600">Contact: {poc.poc_contact_number}</span>
            {poc.designation && (
              <span className="text-sm text-gray-600">Designation: {poc.designation}</span>
            )}

            <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
              {poc.status || "ACTIVE"}
            </span>
          </div>

          {/* Action Icons */}
          {/* <div className="flex gap-3">
            <img
              src={SocialIcon}
              alt="Share"
              className="w-5 h-5 cursor-pointer"
              onClick={(e) => handleShare(e, poc._id)}
            />
            <img
              src={DeleteIcon}
              alt="Delete"
              className="w-5 h-5 cursor-pointer"
              onClick={(e) => handleDelete(e, poc._id)}
            />
          </div> */}
        </li>
      ))}
    </ul>
  );
}

export default ShowPocElement;
