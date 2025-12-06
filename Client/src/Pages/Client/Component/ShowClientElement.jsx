
import React from "react";
import { MapPinIcon, GlobeAltIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

function ShowClientElement({ data = [], onClientClick }) {
const nevigate = useNavigate()

  if (!data || data.length === 0) {
    return <p className="text-gray-500">No clients available.</p>;
  }

  const handleEditClick = (e, client) => {
    e.stopPropagation();
    nevigate(`/UpdateClient/${client._id}`)
  }
  return (
    <div className="overflow-x-auto w-full mt-8">
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
            <th className="py-3 px-5 border-b  text-sm font-semibold text-gray-700">
              Update
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
               <td className="px-4 py-2 border-b  text-center">
                <button
                  onClick={(e) => handleEditClick(e, client)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-black"
                >
                  Edit-Client
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShowClientElement;



