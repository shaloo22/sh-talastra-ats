import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ShowPocElement({ data, setData }) {
  const navigate = useNavigate();

  const handlePOCClick = (id) => {
    navigate(`/POCHome/${id}`);
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      await axios.delete(`http://localhost:8080/poc/${id}`);
      setData((prev) => prev.filter((poc) => poc._id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  if (!data || data.length === 0) {
    return <p className="text-gray-500 text-center mt-4">No POCs available.</p>;
  }

  return (
    <div className="overflow-x-auto w-full max-w-6xl mx-auto mt-8">
      <table className="min-w-full border border-gray-200 rounded-md bg-white">
        <thead className="bg-gray-100">
          <tr>
           
            <th className="py-3 px-5 text-left font-semibold text-gray-700">POC Name</th>
            <th className="py-3 px-5 text-left font-semibold text-gray-700">Email</th>
            <th className="py-3 px-5 text-left font-semibold text-gray-700">Location</th>
            <th className="py-3 px-5 text-left font-semibold text-gray-700">Contact</th>
            <th className="py-3 px-5 text-left font-semibold text-gray-700">Designation</th>
            <th className="py-3 px-5 text-left font-semibold text-gray-700">Status</th>
            
          </tr>
        </thead>
        <tbody>
          {data.map((poc) => (
            <tr
              key={poc._id}
              onClick={() => handlePOCClick(poc._id)}
              className="hover:bg-gray-50 cursor-pointer transition-colors"
            >
              
              <td className="px-4 py-2 border-b">{poc.poc_name}</td>
              <td className="px-4 py-2 border-b">{poc.email}</td>
              <td className="px-4 py-2 border-b">{poc.location}</td>
              <td className="px-4 py-2 border-b">{poc.poc_contact_number}</td>
              <td className="px-4 py-2 border-b">{poc.designation || "-"}</td>
              <td className="px-4 py-2 border-b text-center">
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${poc.status === "ACTIVE" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                  {poc.status}
                </span>
              </td>
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShowPocElement;
