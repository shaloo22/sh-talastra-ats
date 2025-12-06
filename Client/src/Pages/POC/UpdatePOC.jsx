import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { object, string } from "yup";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Confetti from "react-confetti";
import MainButton from "../../Components/Common/MainButton";
import ErrorLogo from "../../assets/icons/error.png";

function UpdatePOC() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [apiFetched, setAPIFetched] = useState(false); 
  const [pocData, setPocData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPOC = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/poc/${id}`);
        setPocData(res.data.poc);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPOC();
  }, [id]);

  const pocSchema = object({
    poc_name: string().required("*POC Name is required"),
    designation: string().required("*Designation is required"),
    email: string().email("*Invalid email").required("*Email is required"),
    location: string().required("*Location is required"),
    poc_contact_number: string()
      .matches(/^\d{10}$/, "*Contact number must be 10 digits")
      .required("*Contact number is required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      poc_name: pocData?.poc_name || "",
      designation: pocData?.designation || "",
      email: pocData?.email || "",
      location: pocData?.location || "",
      poc_contact_number: pocData?.poc_contact_number || "",
    },
    
    validationSchema: pocSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.put(`http://localhost:8080/poc/${id}`, values);
        if (res.status === 200) {
          setAPIFetched(true); 
        }
      } catch (err) {
        if (err.response?.status === 409) setError("POC Name or Email already exists.");
        else if (err.response?.status === 400) setError("Enter valid data in all fields.");
        else setError("An error occurred while updating the POC.");
      }
    },
  });

  return (
    <div className="flex min-h-screen bg-background">
        <div className="m-auto flex flex-col sm:flex-row w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="hidden sm:block sm:w-2/5 h-96 sm:h-auto">
          <img className="h-full w-full object-cover" src="" alt="" />
        </div>

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
                POC has been updated successfully.
              </p>
              <button
                onClick={() => navigate("/pocHome")}
                className="mt-4 text-lg bg-gray-900 px-5 py-2 text-white rounded-full hover:bg-black"
              >
                Continue...
              </button>
            </div>
          </div>
        </div>
      )}

       
       <div className="w-full sm:w-3/5">
          <h2 className="text-center heading2b mt-5 sm:mt-5 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-black">
            Update Point of Contact (POC)
          </h2>
            <form onSubmit={formik.handleSubmit} className="py-3 px-8">
          <div className="mb-3">
              <label className="label block line1">POC Name</label>
              <input
                type="text"
                name="poc_name"
                value={formik.values.poc_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter POC Name"
                className="input input-bordered h-10 w-3/4"
              />
              {formik.errors.poc_name && formik.touched.poc_name && (
                <span className="text-blue-600">{formik.errors.poc_name}</span>
              )}
            </div>
          <div className="mb-3">
            <label className="label block line1">Designation</label>
            <input
              type="text"
              name="designation"
              value={formik.values.designation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter Designation"
              className="input input-bordered h-10 w-3/4"
            />
            {formik.errors.designation && formik.touched.designation && (
              <span className="text-blue-600">{formik.errors.designation}</span>
            )}
          </div>

          <div className="mb-3">
            <label className="label block line1">Email</label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter Email"
              className="input input-bordered h-10 w-3/4"
            />
            {formik.errors.email && formik.touched.email && (
              <span className="text-blue-600">{formik.errors.email}</span>
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
              placeholder="Enter Location"
              className="input input-bordered h-10 w-3/4"
            />
            {formik.errors.location && formik.touched.location && (
              <span className="text-blue-600">{formik.errors.location}</span>
            )}
          </div>

          <div className="mb-3">
            <label className="label block line1">POC Contact Number</label>
            <input
              type="text"
              name="poc_contact_number"
              value={formik.values.poc_contact_number}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter 10-digit number"
              className="input input-bordered h-10 w-3/4"
            />
            {formik.errors.poc_contact_number && formik.touched.poc_contact_number && (
              <span className="text-blue-600">{formik.errors.poc_contact_number}</span>
            )}
          </div>

          {error && (
            <div className="border-2 border-blue-700 bg-blue-700 text-white rounded-lg p-2 w-3/4 mt-2 m-auto flex items-center">
              <img src={ErrorLogo} width={20} alt="" className="mr-2" />
              <p className="font-semibold text-center">{error}</p>
            </div>
          )}

          <div className="text-center mt-4">
            <MainButton value="Update POC" />
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}

export default UpdatePOC;
