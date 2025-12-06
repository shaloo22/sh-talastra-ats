import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { object, string } from "yup";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Confetti from "react-confetti";
import MainButton from "../../Components/Common/MainButton";
import ErrorLogo from "../../assets/icons/error.png";

function UpdateClient() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [apiFetched, setAPIFetched] = useState(false);
  const [clientData, setClientData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const clientSchema = object({
    company_name: string().max(20, "*Keep it short").required("*Name is required"),
    location: string().max(10, "*Keep it short").required("*Location is required"),
    website: string().required("*Website is must"),
    brief: string().max(150, "*Brief should be short"),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      company_name: clientData?.company_name || "",
      location: clientData?.location || "",
      website: clientData?.website || "",
      brief: clientData?.brief || "",
    },
    validationSchema: clientSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.put(`http://localhost:8080/client/update/${id}`, values);
        if (res.status === 200) setAPIFetched(true); // trigger popup
      } catch (err) {
        setError(err.response?.data?.message || "Error updating client");
      }
    },
  });


  useEffect(() => {
    if (!id) return;
    axios
      .get(`http://localhost:8080/client/${id}`)
      .then((res) => {
        setClientData(res.data.client);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Error fetching client data");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading client data...</p>;

  return (
    <div className="flex min-h-screen bg-background">
      <div className="m-auto flex flex-col sm:flex-row w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden">
     
        {apiFetched && (
          <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="absolute bg-black opacity-50 inset-0" />
            <div className="w-full max-w-lg p-6 relative rounded-xl shadow-lg bg-white">
              <Confetti width={300} height={200} />
              <div className="text-center p-4">
                <svg
                  fill="rgb(1,160,20)"
                  className="w-16 h-16 m-auto"
                  viewBox="0 0 24 24"
                >
                  <path d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0ZM11.52,17L6,12.79l1.83-2.37L11.14,13l4.51-5.08,2.24,2Z" />
                </svg>
                <h2 className="text-xl font-bold py-4">Updated Successfully</h2>
                <p className="text-sm text-gray-500 px-8">
                  Client has been updated successfully.
                </p>
                <button
                  onClick={() => navigate("/clientHome")}
                  className="mt-4 text-lg bg-gray-900 px-5 py-2 text-white rounded-full hover:bg-black"
                >
                  Continue...
                </button>
              </div>
            </div>
          </div>
        )}


        <div className="w-full sm:w-3/5 p-6">
          <h2 className="text-center heading2b mt-5 sm:mt-5 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-black">
            Update Client
          </h2>
          <form onSubmit={formik.handleSubmit} className="py-3 px-8">
            <div className="mb-3">
              <label className="label block line1">Client Name</label>
              <input
                type="text"
                name="company_name"
                value={formik.values.company_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Client Name"
                className="input input-bordered h-10 w-3/4"
              />
              {formik.errors.company_name && formik.touched.company_name && (
                <span className="text-blue-600">{formik.errors.company_name}</span>
              )}
            </div>

            <div className="mb-3">
              <label className="label block line1">Location</label>
              <input
                type="text"
                name="location"
                value={formik.values.location}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Location"
                className="input input-bordered h-10 w-3/4"
              />
              {formik.errors.location && formik.touched.location && (
                <span className="text-blue-600">{formik.errors.location}</span>
              )}
            </div>

            <div className="mb-3">
              <label className="label block line1">Website</label>
              <input
                type="text"
                name="website"
                value={formik.values.website}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="www.meta.com"
                className="input input-bordered h-10 w-3/4"
              />
              {formik.errors.website && formik.touched.website && (
                <span className="text-blue-600">{formik.errors.website}</span>
              )}
            </div>

            <div className="mb-3">
              <label className="label block line1">Brief</label>
              <textarea
                name="brief"
                value={formik.values.brief}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Brief about the client..."
                className="textarea textarea-bordered w-full h-24"
              />
              {formik.errors.brief && formik.touched.brief && (
                <span className="text-blue-600">{formik.errors.brief}</span>
              )}
            </div>

            {error && (
              <div className="border-2 border-blue-700 bg-blue-700 text-white rounded-lg p-2 w-3/4 mt-2 m-auto flex items-center">
                <img src={ErrorLogo} width={20} alt="" className="mr-2" />
                <p className="font-semibold text-center">{error}</p>
              </div>
            )}

            <div className="text-center mt-4">
              <MainButton value="Update Client" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateClient;
