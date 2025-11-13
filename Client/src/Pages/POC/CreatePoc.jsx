import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { object, string } from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import {
  Button,
  Modal,
  ModalHeader,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import MainButton from "../../Components/Common/MainButton";
import ErrorLogo from "../../assets/icons/error.png";

function CreatePOC() {
  const [error, setError] = useState();
  const [clients, setClients] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  // Fetch all clients for dropdown
  useEffect(() => {
  const fetchClients = async () => {
    try {
      const res = await axios.get("http://localhost:8080/client/all"); // <-- here
      const options = res.data.clients.map((c) => ({
        value: c._id,
        label: c.company_name,
      }));
      setClients(options); // store for the dropdown
    } catch (err) {
      console.error("Error fetching clients", err);
    }
  };

  fetchClients(); // call the function
}, []);


  
  const pocSchema = object({
    client_id: string().required("*Client is required"),
    poc_name: string().required("*POC Name is required"),
    designation: string().required("*Designation is required"),
    email: string().email("*Invalid email").required("*Email is required"),
    location: string().required("*Location is required"),
    poc_contact_number: string()
      .matches(/^\d{10}$/, "*Contact number must be 10 digits")
      .required("*Contact number is required"),
  });

  const formik = useFormik({
    initialValues: {
      client_id: "",
      poc_name: "",
      designation: "",
      email: "",
      location: "",
      poc_contact_number: "",
    },
    validationSchema: pocSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:8080/client/poc",
          values,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json;charset=UTF-8",
            },
          }
        );
        if (response.status === 200) {
          onOpen(); // Open success modal
        }
      } catch (err) {
        if (err.response?.status === 409) {
          setError("POC Name or Email already exists.");
        } else if (err.response?.status === 400) {
          setError("Enter valid data in all fields.");
        } else {
          setError("An error occurred while saving the POC.");
        }
      }
    },
  });

  return (
    <div className="flex min-h-screen bg-background">
      <div className="m-auto flex flex-col sm:flex-row w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="hidden sm:block sm:w-2/5 h-96 sm:h-auto">
          <img className="h-full w-full object-cover" src="" alt="" />
        </div>

        <div className="w-full sm:w-3/5">
          <h2 className="text-center heading2b mt-5 sm:mt-5 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-black">
            Add a Point of Contact (POC)
          </h2>

          {/* Success Modal */}
          <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                POC has been added successfully
                <hr className="mt-1" />
              </ModalHeader>
              <ModalCloseButton />
              <ModalFooter margin="auto">
                <Button onClick={() => navigate("/pocHome")} colorScheme="blue">
                  Go to POC Home
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <form onSubmit={formik.handleSubmit} className="py-3 px-8">
            {/* Client Dropdown */}
            <div className="mb-3">
              <label className="label block line1">Client ID</label>
              <Select
                options={clients}
                onChange={(option) => formik.setFieldValue("client_id", option?.value)}
                onBlur={() => formik.setFieldTouched("client_id", true)}
                placeholder="Select or search client..."
              />
              {formik.errors.client_id && formik.touched.client_id && (
                <span className="text-blue-600">{formik.errors.client_id}</span>
              )}
            </div>

            {/* POC Name */}
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

            {/* Designation */}
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

            {/* Email */}
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

            {/* Location */}
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

            {/* Contact Number */}
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

            {/* Error message */}
            {error && (
              <div className="border-2 border-blue-700 bg-blue-700 text-white rounded-lg p-2 w-3/4 mt-2 m-auto flex items-center">
                <img src={ErrorLogo} width={20} alt="" className="mr-2" />
                <p className="font-semibold text-center">{error}</p>
              </div>
            )}

            <div className="text-center mt-4">
              <MainButton value="Create POC" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePOC;
