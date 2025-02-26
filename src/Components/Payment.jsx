import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useFormik } from "formik";
import { paymentOnline } from "../Apis/Payment";
import { motion } from "framer-motion"; 

export default function Payment({ cartId }) {
  const mutation = useMutation({
    mutationFn: paymentOnline,
    onSuccess: (response) => {
      if (response?.data?.status === "success") {
        window.location.href = response?.data?.session?.url;
      }
    },
  });

  function handlePayment(values) {
    mutation.mutate({ cartId, shippingAddress: values });
  }

  const formik = useFormik({
    initialValues: {
      details: "",
      city: "",
      phone: "",
    },
    onSubmit: handlePayment,
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <div>
        <h2 className="my-5 text-2xl font-bold">Payment</h2>
        <form className="form-payment" onSubmit={formik.handleSubmit}>
          <input
            className="rounded-lg my-1 p-2 border border-gray-300 w-full"
            type="text"
            name="details"
            value={formik.values.details}
            onChange={formik.handleChange}
            placeholder="Enter details"
          />
          <br />
          <input
            className="rounded-lg my-1 p-2 border border-gray-300 w-full"
            type="text"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            placeholder="Enter city"
          />
          <br />
          <input
            className="rounded-lg my-1 p-2 border border-gray-300 w-full"
            type="text"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            placeholder="Enter phone"
          />
          <br />
          <button
            type="submit"
            className="px-5 py-2 text-white bg-green-500 rounded-2xl my-5 w-full hover:bg-green-600 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </motion.div>
  );
}
