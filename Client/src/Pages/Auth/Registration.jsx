// import {
//   Button,
//   Modal,
//   ModalBody,
//   ModalHeader,
//   ModalCloseButton,
//   ModalContent,
//   ModalFooter,
//   ModalOverlay,
//   useDisclosure,
// } from "@chakra-ui/react";
// import axios from "axios";
// import { useFormik } from "formik";
// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { object, string, ref, boolean } from "yup";
// import MainButton from "../../Components/Common/MainButton";
// import ErrorLogo from "../../assets/icons/error.png";

// function Registration() {
//   const [error, setError] = useState();
//   const [managerList, setManagerList] = useState([]);
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const navigate = useNavigate();

//   // Fetch all managers from backend
//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/users?designation=Manager")
//       .then((res) => setManagerList(res.data.users || []))
//       .catch((err) => console.error("Managers Error:", err));
//   }, []);

//   const userSchema = object({
//     f_name: string().max(10, "*Keep it short").required("*First Name is required"),
//     last_name: string().required("*Last Name is required"),
//     email: string().email("*Follow abc@domain.com format").required("*Email is must"),
//     company_name: string().max(30, "*Company name too long").required("*Company name is must"),
//     password: string()
//       .max(25, "*Password is too long")
//       .matches(
//         /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z]).{8,}$/,
//         "Must contain [A-Z], [a-z], [0-9] and length >=8"
//       )
//       .required("*Password is must"),
//     confirm_password: string()
//       .required("*Confirm Password is must")
//       .oneOf([ref("password"), null], "*Passwords must match"),
//     designation: string()
//       .required("*Designation is required")
//       .oneOf(["Manager", "Recruiter"], "Must be Manager or Recruiter"),
//     manager: string(), // optional, only for Recruiter
//     isAdmin: boolean(),
//   });

//   const formik = useFormik({
//     initialValues: {
//       f_name: "",
//       last_name: "",
//       email: "",
//       company_name: "",
//       password: "",
//       confirm_password: "",
//       designation: "",
//       manager: "",
//       isAdmin: false, // hidden from UI
//     },
//     validationSchema: userSchema,
//     onSubmit: (values) => handleRegister(values),
//   });

//   const handleRegister = async (inputData) => {
//     const payload = {
//       f_name: inputData.f_name,
//       last_name: inputData.last_name,
//       email: inputData.email,
//       company_name: inputData.company_name,
//       password: inputData.password,
//       designation: inputData.designation,
//       manager: inputData.designation === "Recruiter" ? inputData.manager || null : null,
//       isAdmin: false,
//     };

//     axios
//       .post("http://localhost:8080/register", payload)
//       .then((response) => {
//         if (response.status === 200) onOpen();
//       })
//       .catch((err) => {
//         if (err.response?.status === 409) setError("Last name or email already taken");
//         else if (err.response?.status === 400)
//           setError("Enter Email in correct format OR Password >= 8 characters");
//         else setError("An error occurred while saving the user.");
//       });
//   };

//   return (
//     <div className="flex h-screen bg-background">
//       <div className="m-auto flex w-full sm:w-3/4 h-5/6 shadows">
//         <div className="w-2/5 shadows hidden sm:block">
//           <img className="h-full w-full" src="" alt="" />
//         </div>
//         <div className="w-full sm:w-3/5">
//           <h2 className="text-center heading2b mt-5 sm:mt-5 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-black">
//             Become A Part Of Smart Cruiter
//           </h2>

//           <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size={"xl"}>
//             <ModalOverlay />
//             <ModalContent>
//               <ModalHeader>
//                 Account is Registered
//                 <img className="inline mb-1" width={30} src="" alt="" />
//                 <hr className="mt-1" />
//               </ModalHeader>
//               <ModalCloseButton />
//               <ModalBody>
//                 <h2 className="text-lg">
//                   We have sent you an activation link on your email:{" "}
//                   <span className="inline font-bold text-gray-600">{formik.values.email}</span>. Kindly open your email and click on the link to verify your account.
//                 </h2>
//               </ModalBody>
//               <ModalFooter margin={"auto"}>
//                 <Button onClick={() => navigate("/login")} colorScheme="blue" mr={3}>
//                   Go to Login
//                 </Button>
//               </ModalFooter>
//             </ModalContent>
//           </Modal>

//           <form onSubmit={formik.handleSubmit}>
//             <div className="flex flex-col gap-4 py-3 px-8">

//               {/* First Name and Last Name */}
//               <div className="flex gap-4">
//                 <div className="flex-1">
//                   <label className="label block">First Name</label>
//                   <input
//                     type="text"
//                     name="f_name"
//                     value={formik.values.f_name}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     placeholder="Ali"
//                     className="input input-bordered h-10 w-full"
//                   />
//                   {formik.errors.f_name && formik.touched.f_name && (
//                     <span className="text-blue-600">{formik.errors.f_name}</span>
//                   )}
//                 </div>

//                 <div className="flex-1">
//                   <label className="label block">Last Name</label>
//                   <input
//                     type="text"
//                     name="last_name"
//                     value={formik.values.last_name}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     placeholder="Ahmad"
//                     className="input input-bordered h-10 w-full"
//                   />
//                   {formik.errors.last_name && formik.touched.last_name && (
//                     <span className="text-blue-600">{formik.errors.last_name}</span>
//                   )}
//                 </div>
//               </div>

//               {/* Email and Company Name */}
//               <div className="flex gap-4">
//                 <div className="flex-1">
//                   <label className="label block">Email</label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formik.values.email}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     placeholder="alexa@meta.com"
//                     className="input input-bordered h-10 w-full"
//                   />
//                   {formik.errors.email && formik.touched.email && (
//                     <span className="text-blue-600">{formik.errors.email}</span>
//                   )}
//                 </div>

//                 <div className="flex-1">
//                   <label className="label block">Company Name</label>
//                   <input
//                     type="text"
//                     name="company_name"
//                     value={formik.values.company_name}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     placeholder="META Inc"
//                     className="input input-bordered h-10 w-full"
//                   />
//                   {formik.errors.company_name && formik.touched.company_name && (
//                     <span className="text-blue-600">{formik.errors.company_name}</span>
//                   )}
//                 </div>
//               </div>

//               {/* Password and Confirm Password */}
//               <div className="flex gap-4">
//                 <div className="flex-1">
//                   <label className="label block">Password</label>
//                   <input
//                     type="password"
//                     name="password"
//                     value={formik.values.password}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     placeholder="***"
//                     className="input input-bordered h-10 w-full"
//                   />
//                   {formik.errors.password && formik.touched.password && (
//                     <span className="text-blue-600">{formik.errors.password}</span>
//                   )}
//                 </div>

//                 <div className="flex-1">
//                   <label className="label block">Confirm Password</label>
//                   <input
//                     type="password"
//                     name="confirm_password"
//                     value={formik.values.confirm_password}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     placeholder="***"
//                     className="input input-bordered h-10 w-full"
//                   />
//                   {formik.errors.confirm_password && formik.touched.confirm_password && (
//                     <span className="text-blue-600">{formik.errors.confirm_password}</span>
//                   )}
//                 </div>
//               </div>

//               {/* Designation */}
//               <div className="flex gap-4">
//                 <div className="flex-1">
//                   <label className="label block">Designation</label>
//                   <select
//                     name="designation"
//                     value={formik.values.designation}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className="input input-bordered h-10 w-full"
//                   >
//                     <option value="">Select Designation</option>
//                     <option value="Manager">Manager</option>
//                     <option value="Recruiter">Recruiter</option>
//                   </select>
//                   {formik.errors.designation && formik.touched.designation && (
//                     <span className="text-blue-600">{formik.errors.designation}</span>
//                   )}
//                 </div>

//                 {/* Manager Dropdown only if Recruiter */}
//                 {formik.values.designation === "Recruiter" && (
//                   <div className="flex-1">
//                     <label className="label block">Manager</label>
//                     <input
//   list="manager-options"
//   name="manager"
//   value={formik.values.manager}
//   onChange={formik.handleChange}
//   placeholder="Type to search manager..."
//   className="input input-bordered h-10 w-full"
// />
// <datalist id="manager-options">
//   {managerList.map((mgr) => (
//     <option key={mgr._id} value={mgr._id}>
//       {mgr.f_name} {mgr.last_name}
//     </option>
//   ))}
// </datalist>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Error message */}
//             {error && (
//               <div className="border-2 solid border-blue-700 bg-blue-700 text-white rounded-lg p-2 w-4/5 mt-1 ml-12 m-auto block">
//                 <img src={ErrorLogo} width={20} alt="" className="inline mr-2" />
//                 <p className="inline font-semibold text-center">{error}</p>
//               </div>
//             )}

//             <div className="block m-auto text-center mt-2">
//               <MainButton value={"Register"} />
//               <p className="line2 text-secondrytext mt-3">
//                 Already have an account?
//                 <Link to={"/"}>
//                   <span className="inline ml-2 cursor-pointer text-black">Login</span>
//                 </Link>
//               </p>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Registration;
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

function Registration() {
  const [error, Seterror] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  // Validation schema
  const userSchema = object({
    f_name: string().max(10, "*Keep it short").required("*Name is required"),
    last_name: string().max(10, "*Keep it short").required("*Username is required"),
    email: string().email("*Follow abc@domain.com format").required("*Email is required"),
    company_name: string().max(30, "*Name is too long").required("*Company name is required"),
    password: string()
      .matches(/^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z]).{8,}$/, "Must contain [A-Z], [a-z], [0-9] and length >=8")
      .required("*Password is required"),
    confirm_password: string()
      .oneOf([ref("password"), null], "*Passwords must match")
      .required("*Confirm password is required"),
    designation: string().required("*Designation is required"),
    manager: string().when("designation", {
      is: "Recruiter",
      then: string().required("*Manager is required"),
      otherwise: string().notRequired(),
    }),
  });

  const initialValues = {
    f_name: "",
    last_name: "",
    email: "",
    company_name: "",
    password: "",
    confirm_password: "",
    designation: "Recruiter",
    manager: "",
  };

  const handleRegister = async (values) => {
    // Add isAdmin field based on designation
    const inputData = { ...values };
    if (values.designation === "Manager") {
      inputData.isAdmin = true;
      inputData.manager = "";
    } else {
      inputData.isAdmin = false;
    }

    try {
      const res = await axios.post("http://localhost:8080/register", inputData);
      if (res.status === 200) {
        onOpen();
      }
    } catch (err) {
      if (err.response?.status === 409) Seterror("Username or email already taken");
      else if (err.response?.status === 400)
        Seterror("Enter Email in correct format OR Password >= 8 characters");
      else Seterror("An error occurred while saving the user.");
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: userSchema,
    onSubmit: handleRegister,
  });

  return (
    <div className="flex h-screen bg-background">
      <div className="m-auto flex w-full sm:w-3/4 h-5/6 shadows">
        <div className="w-2/5 shadows hidden sm:block">
          <img className="h-full w-full" src="" alt="" />
        </div>

        <div className="w-full sm:w-3/5">
          <h2 className="text-center heading2b mt-5 sm:mt-5 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-black">
            Become A Part Of Smart Recruiter
          </h2>

          {/* Success Modal */}
          <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size={"xl"}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Account Registered</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <h2 className="text-lg">
                  We have sent you an activation link on your email: <b>{formik.values.email}</b>. Kindly click it to verify your account.
                </h2>
              </ModalBody>
              <ModalFooter margin={"auto"}>
                <Button onClick={() => navigate("/login")} colorScheme="blue">
                  Go to Login
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          {/* Form */}
          <form onSubmit={formik.handleSubmit}>
            <div className="py-3 px-8">
              {/* First Name & Username */}
              <div className="flex mb-0">
                <div className="w-1/2 mr-1">
                  <label className="label block">First Name</label>
                  <input
                    type="text"
                    name="f_name"
                    value={formik.values.f_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Ali"
                    className="input input-bordered h-10 w-full max-w-xs"
                  />
                  <span className="text-blue-600">{formik.errors.f_name && formik.touched.f_name && formik.errors.f_name}</span>
                </div>

                <div className="w-1/2 ml-6">
                  <label className="label block">Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    value={formik.values.last_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Ahmad"
                    className="input input-bordered h-10 w-full max-w-xs"
                  />
                  <span className="text-blue-600">{formik.errors.last_name && formik.touched.last_name && formik.errors.last_name}</span>
                </div>
              </div>

              {/* Email */}
              <div className="mb-0">
                <label className="label block">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="alexa@meta.com"
                  className="h-10 input input-bordered w-3/4"
                />
                <span className="text-blue-600">{formik.errors.email && formik.touched.email && formik.errors.email}</span>
              </div>

              {/* Company Name */}
              <div className="mb-0">
                <label className="label block">Company Name</label>
                <input
                  type="text"
                  name="company_name"
                  value={formik.values.company_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="META Inc"
                  className="h-10 input input-bordered w-3/4"
                />
                <span className="text-blue-600">{formik.errors.company_name && formik.touched.company_name && formik.errors.company_name}</span>
              </div>

              {/* Password & Confirm Password */}
              <div className="flex mb-0">
                <div className="w-1/2 mr-1">
                  <label className="label block">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="***"
                    className="input input-bordered h-10 w-full max-w-xs"
                  />
                  <span className="text-blue-600">{formik.errors.password && formik.touched.password && formik.errors.password}</span>
                </div>

                <div className="w-1/2 ml-6">
                  <label className="label block">Confirm Password</label>
                  <input
                    type="password"
                    name="confirm_password"
                    value={formik.values.confirm_password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="***"
                    className="input input-bordered h-10 w-full max-w-xs"
                  />
                  <span className="text-blue-600">{formik.errors.confirm_password && formik.touched.confirm_password && formik.errors.confirm_password}</span>
                </div>
              </div>

              {/* Designation */}
              <div className="mb-0">
                <label className="label block">Designation</label>
                <select
                  name="designation"
                  value={formik.values.designation}
                  onChange={formik.handleChange}
                  className="input input-bordered h-10 w-3/4"
                >
                  <option value="Recruiter">Recruiter</option>
                  <option value="Manager">Manager</option>
                </select>
                <span className="text-blue-600">{formik.errors.designation && formik.touched.designation && formik.errors.designation}</span>
              </div>

              {/* Manager */}
              {formik.values.designation === "Recruiter" && (
                <div className="mb-0 mt-2">
                  <label className="label block">Manager</label>
                  <input
                    type="text"
                    name="manager"
                    value={formik.values.manager}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Manager Name"
                    className="input input-bordered h-10 w-3/4"
                  />
                  <span className="text-blue-600">{formik.errors.manager && formik.touched.manager && formik.errors.manager}</span>
                </div>
              )}

              {/* Error display */}
              {error && (
                <div className="border-2 border-blue-700 bg-blue-700 text-white rounded-lg p-2 w-4/5 mt-1 ml-12 m-auto block">
                  <img src={ErrorLogo} width={20} alt="" className="inline mr-2" />
                  <p className="inline font-semibold text-center">{error}</p>
                </div>
              )}

              <div className="block m-auto text-center mt-2">
                <MainButton value={"Register"} />
                <p className="line2 text-secondrytext mt-3">
                  Already have an account?
                  <Link to={"/"} className="inline ml-2 cursor-pointer text-black">
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registration;
