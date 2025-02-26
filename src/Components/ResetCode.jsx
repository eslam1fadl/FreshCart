import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet-async";

export default function ResetCode() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    resetCode: Yup.string().required("Reset code is required"),
  });

  async function handleReset(values) {
    setError("");
    setMessage("");
    try {
      setLoading(true);
      console.log("Sending Data:", values);

      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        { resetCode: String(values.resetCode) },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Response:", response.data);

      if (response.data.status === "Success") {
        setMessage("Code verified successfully!");
        navigate("/newpassword");
      } else {
        setError("Invalid code, please try again.");
      }
    } catch (error) {
      console.error("Error:", error.response);
      setError(error.response?.data?.message || "Failed to verify code.");
    } finally {
      setLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: { resetCode: "" },
    validationSchema,
    onSubmit: handleReset,
  });

  return (
    <div className="container mx-auto max-w-md my-10 border p-4 shadow-lg">
       <Helmet>
        <title>Send code</title>
      </Helmet>
      <h2 className="text-green-700 text-[1.5rem] font-bold my-3 text-center">
        Enter the code
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-3">
        <input
          type="text"
          id="resetCode"
          name="resetCode"
          placeholder="Enter reset code"
          value={formik.values.resetCode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full p-2 border rounded"
        />
        {formik.touched.resetCode && formik.errors.resetCode && (
          <div className="text-red-500">{formik.errors.resetCode}</div>
        )}

        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        {message && <div className="text-green-500 text-sm mt-2">{message}</div>}

        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white p-2 rounded mt-3 w-full" 

          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify Code"}
        </button>
      </form>
    </div>
  );
}
