import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function NewPassword() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleReset(values) {
    try {
      setLoading(true);
      const response = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        {
          email: values.email,
          newPassword: values.password
        }
      );
      
      if (response.data.token) {
        setMessage("Password reset successful! Redirecting...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Reset password error:", err.response?.data);
      setError(err.response?.data?.message || "Failed to reset password. Try again.");
    } finally {
      setLoading(false);
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(/^[A-Z][a-z0-9]{2,5}$/, "Password must start with an uppercase letter and be 3-6 characters long."),
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: handleReset,
  });

  return (
    <div className="container mx-auto max-w-md my-10 border p-4 shadow-lg">
       <Helmet>
        <title>New password</title>
      </Helmet>
      <h2 className="text-green-700 text-[1.5rem] font-bold my-3 text-center">
        Reset Your Password
      </h2>
      {message && <p className="text-green-500 text-center">{message}</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={formik.handleSubmit} className="space-y-3">
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full p-2 border rounded"
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-500">{formik.errors.email}</p>
        )}
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter new password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full p-2 border rounded"
        />
        {formik.touched.password && formik.errors.password && (
          <p className="text-red-500">{formik.errors.password}</p>
        )}
 <button type="submit" className="bg-green-500 hover:bg-green-700 text-white p-2 rounded mt-3 w-full" 
disabled={loading}
>          {loading ? "Processing..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}