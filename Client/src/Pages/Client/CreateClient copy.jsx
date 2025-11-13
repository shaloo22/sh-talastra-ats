import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
import MainButton from "../../Components/Common/MainButton";
import ErrorLogo from "../../assets/icons/error.png";

function CreateClient() {
  const [error, Seterror] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  // ✅ Validation Schema
  const clientSchema = object({
    company_name: string()
      .max(20, "*Keep it short")
      .required("*Name is required"),
    location: string()
      .max(10, "*Keep it short")
      .required("*Location is required"),
    website: string().required("*Website is must"),
    brief: string().max(150, "*Brief should be short"),
  });

  // ✅ Initial Values
  const values = {
    company_name: "",
    location: "",
    website: "",
    brief: "",
  };

  // ✅ Function to handle form submission
  const handleClient = async (inputData) => {
    console.log("Data being sent:", inputData); // 🧠 for debugging

    const options = {
      url: "http://localhost:8080/client",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: inputData,
    };

    axios(options)
      .then((response) => {
        if (response.status === 200) {
          console.log("Client created successfully");
          onOpen();
        }
      })
      .catch(function (error) {
        if (error.response?.status === 409) {
          Seterror("Client or website already taken");
        } else if (error.response?.status === 400) {
          Seterror(
            "Enter Email in format OR Contact Number greater than 10 character"
          );
        } else {
          Seterror("An error occurred while saving the user.");
        }
      });
  };

  // ✅ Formik Setup
  const formik = useFormik({
    initialValues: values,
    validationSchema: clientSchema,
    onSubmit: (values) => {
      handleClient(values);
    },
  });

  return (
    <div className="flex h-screen bg-background">
      <div className="m-auto flex w-full sm:w-3/4 h-5/6 shadows">
        <div className="w-2/5 shadows hidden sm:block">
          <img className="h-full w-full" src="" alt="" />
        </div>

        <div className="w-full sm:w-3/5">
          <h2 className="text-center heading2b mt-5 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-black">
            Become A Part Of TalAstra
          </h2>

          {/* ✅ Success Modal */}
          <Modal
            closeOnOverlayClick={false}
            isOpen={isOpen}
            onClose={onClose}
            size={"xl"}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                Client has been added to TalAstra
                <hr className="mt-1" />
              </ModalHeader>
              <ModalCloseButton />
              <ModalFooter margin={"auto"}>
                <Button
                  onClick={() => navigate("/clientHome")}
                  colorScheme="blue"
                  mr={3}
                >
                  Go to Client Home
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          {/* ✅ Form Starts */}
          <form onSubmit={formik.handleSubmit}>
            <div className="py-3 px-8">
              {/* Company Name */}
              <div className="flex mb-2">
                <div className="w-1/2 mr-1">
                  <label className="label line1 block" htmlFor="company_name">
                    Client Name
                  </label>
                  <input
                    type="text"
                    value={formik.values.company_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="company_name"
                    id="company_name"
                    placeholder="Client Name"
                    className="input input-bordered h-10 w-full max-w-xs"
                  />
                  <span className="text-blue-600">
                    {formik.errors.company_name}
                  </span>
                </div>
              </div>

              {/* Location */}
              <div className="flex mb-2">
                <div className="w-1/2 mr-1">
                  <label className="label block line1" htmlFor="location">
                    Location
                  </label>
                  <input
                    value={formik.values.location}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="location"
                    id="location"
                    type="text"
                    placeholder="Location"
                    className="input input-bordered h-10 w-4/5 max-w-xs"
                  />
                  {formik.errors.location && formik.touched.location ? (
                    <span className="text-blue-600">
                      {formik.errors.location}
                    </span>
                  ) : null}
                </div>
              </div>

              {/* Website */}
              <div className="mb-2">
                <label className="label line1">Website</label>
                <input
                  value={formik.values.website}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="website"
                  id="website"
                  type="text"
                  placeholder="www.meta.com"
                  className="h-10 input input-bordered w-3/4"
                />
                {formik.errors.website && formik.touched.website ? (
                  <span className="text-blue-600">
                    <br /> {formik.errors.website}
                  </span>
                ) : null}
              </div>

              {/* ✅ Brief Field Fixed */}
              <div className="mb-4">
                <label className="label line1" htmlFor="brief">
                  Brief
                </label>
                <textarea
                  id="brief"
                  name="brief"
                  value={formik.values.brief}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="textarea textarea-bordered w-full h-24"
                  placeholder="Brief about the client..."
                ></textarea>
                {formik.errors.brief && formik.touched.brief ? (
                  <span className="text-blue-600">{formik.errors.brief}</span>
                ) : null}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="border-2 border-blue-700 bg-blue-700 text-white rounded-lg p-2 w-4/5 mt-1 ml-12 m-auto block">
                <img src={ErrorLogo} width={20} alt="" className="inline mr-2" />
                <p className="inline font-semibold text-center">{error}</p>
              </div>
            )}

            <div className="block m-auto text-center mt-2">
              <MainButton value={"Create Client"} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateClient;
