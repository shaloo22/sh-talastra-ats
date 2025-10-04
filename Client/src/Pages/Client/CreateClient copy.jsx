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
import { Link, useNavigate } from "react-router-dom";
import { object, string, ref } from "yup";
import MainButton from "../../Components/Common/MainButton";
import ErrorLogo from "../../assets/icons/error.png";

function CreateClient() {
  const [error, Seterror] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();
  let clientSchema = object({
    f_name: string().max(20, "*Keep it short").required("*Name is required"),
    location: string().max(10, "*Keep it short").required("*Location is required"),
    email: string()
      .email("*Follow abc@domain.com format")
      .required("*Email is must"),
    poc_name: string()
      .max(30, "*Name is too long")
      .required("*POC name is must"),
    poc_contact_number: string()
      .max(10, "*poc_contact_number is too long")
      .matches(
        /^(?=.*?[0-9]).{10,}$/,
        "Must contain  [A-Z], [a-z] , [0-1] and length >=10"
      )
      .required("*POC contact number is must"),
  });

  const values = {
    f_name: "",
    location: "",
    email: "",
    poc_name: "",
    poc_contact_number: ""
  };

  const handleClient = async (inputData) => {
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
        console.log(response);
        if (response.status == 200) {
          console.log(200);
          onOpen();
        }
      })
      .catch(function (error) {
        if (error.response.status == 409) {
          console.log("alredy exsists");
          Seterror("Client or email already taken");
        } else if (error.response.status == 400) {
          Seterror(
            "Enter Email in format OR Contact Number greater than 10 character"
          );
        } else {
          Seterror("An error occurred while saving the user.");
        }
      });
  };
  const formik = useFormik({
    initialValues: values,
    validationSchema: clientSchema,
    onSubmit: (values) => {
      handleClient(values);
    },
  });

  return (
    <div className="flex h-screen bg-background">
      <div className="m-auto flex  w-full sm:w-3/4 h-5/6 sm:h-5/6  shadows">
        <div className="w-2/5 shadows hidden sm:block ">
          <img
            className="h-full w-full"
            src=""
            alt=""
          />
        </div>

        <div className="w-full sm:w-3/5">
          <h2 className="text-center heading2b mt-5 sm:mt-5 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-black">
            Become A Part Of TalAstra
          </h2>

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
                </Button>{" "}
              </ModalFooter>
            </ModalContent>
          </Modal>

          <form action="" onSubmit={formik.handleSubmit}>
            <div className="py-3 px-8">
              <div className="flex mb-0">
                <div className="w-1/2 mr-1">
                  <label className="label line1 block " htmlFor="first_name">
                    Client Name
                  </label>
                  <input
                    type="text"
                    value={formik.values.f_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="f_name"
                    id="f_name"
                    placeholder="Client Name"
                    autoComplete="on"
                    className="input input-bordered h-10 w-full max-w-xs"
                  />
                  {/* ERROR MSG */}
                  <span className="text-blue-600">
                    {formik.errors.f_name}
                  </span>{" "}
                </div>
                <div className="w-1/2 mr-1  ml-6">
                  <label className="label block line1" htmlFor="location">
                    Location{" "}
                  </label>
                  <input
                    value={formik.values.location}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="location"
                    id="location"
                    type="text"
                    placeholder="Location"
                    autoComplete="on"
                    className="input input-bordered h-10 w-4/5 max-w-xs"
                  />
                  {/* ERROR MSG */}
                  {formik.errors.location && formik.touched.location ? (
                    <span className="text-blue-600">
                      {" "}
                      {formik.errors.location}
                    </span>
                  ) : null}
                </div>
              </div>
              <div className="mb-0">
                <label className="label line1">
                  POC Name{" "}
                  {formik.errors.poc_name && formik.touched.poc_name ? (
                    <span className="text-blue-600 relative -left-52">
                      {" "}
                      {formik.errors.poc_name}
                    </span>
                  ) : null}
                </label>

                <input
                  type="text"
                  placeholder="POC Name"
                  className="h-10 input input-bordered w-3/4"
                  value={formik.values.poc_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="poc_name"
                  id="poc_name"
                />
                {/* ERROR MSG */}
              </div>

              <div className="mb-0">
                <label className="label line1">POC Email</label>
                <input
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="email"
                  id="email"
                  type="email"
                  placeholder="alexa@meta.com"
                  className="h-10 input input-bordered w-3/4"
                />
                {/* ERROR MSG */}
                {formik.errors.email && formik.touched.email ? (
                  <span className="text-blue-600">
                    <br /> {formik.errors.email}
                  </span>
                ) : null}
              </div>

              

              <div className="flex mb-0">
                <div className="w-1/2 mr-1">
                  <label className="label line1 block " htmlFor="poc_contact_number">
                    POC Contact Number
                  </label>
                  <input
                    type="poc_contact_number"
                    placeholder=""
                    className="input input-bordered h-10 w-full max-w-xs"
                    value={formik.values.poc_contact_number}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="poc_contact_number"
                    id="poc_contact_number"
                    autoComplete="on"
                  />
                  {/* ERROR MSG */}
                  {formik.errors.poc_contact_number && formik.touched.poc_contact_number ? (
                    <span className="text-blue-600">
                      {" "}
                      {formik.errors.poc_contact_number}
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
            {/* Error message part */}
            {error == null ? null : (
              <div className="border-2 solid border-blue-700 bg-blue-700 text-white rounded-lg p-2 w-4/5  mt-1 ml-12  m-auto block ">
                <img
                  src={ErrorLogo}
                  width={20}
                  alt=""
                  className="inline mr-2"
                />
                <p className="inline font-semibold text-center">{error}</p>{" "}
              </div>
            )}
            <div className="block m-auto text-center mt-2">
              <MainButton value={"Create Client"}></MainButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateClient;
