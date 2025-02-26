import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet-async"; 


export default function ForgetPassword() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
  });

  const handleReset = async (values) => {
    setMessage("");
    setError("");
    setLoading(true); 
    try {
      const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", {
        email: values.email
      });
     
      if (data.statusMsg==="success") {
        navigate("/resetcode");
      }
    }
    catch (error) {
      setError("Invalid email. Please try again.");
    }
  };

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema,
    onSubmit: handleReset,
  });

  return (
    <div className="container">
       <Helmet>
        <title>Forget password</title>
      </Helmet>
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto border p-4 shadow-lg">
        <h2 className="text-green-700 text-[1.5rem] font-bold my-3 text-center">
          Forget Password
        </h2>

        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          className="w-full p-2 border rounded"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-500 text-sm">{formik.errors.email}</div>
        )}

        {message && <div className="text-green-500 text-sm mt-2">{message}</div>}
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white p-2 rounded mt-3 w-full" 
         disabled={loading}>
        {loading ? "Sending..." : " Send the code"}
        </button>

      </form>
    </div>
  );
}
