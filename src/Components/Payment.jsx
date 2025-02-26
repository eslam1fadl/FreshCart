import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useFormik } from 'formik';
import { paymentOnline } from '../Apis/Payment';
import { motion } from 'framer-motion'; // تصحيح استيراد motion

export default function Payment({ cartId }) {
  let { mutate, data } = useMutation(paymentOnline); // إزالة الأقواس {} حول mutationFn

  function handlePayment(values) {
    mutate({ cartId, shippingAddress: values });
  }

  if (data?.data?.status === 'success') {
    window.location.href = data?.data?.session?.url;
  }

  console.log(data);

  let formik = useFormik({
    initialValues: {
      details: '',
      city: '',
      phone: ''
    },
    onSubmit: handlePayment
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
        <form onSubmit={formik.handleSubmit}>
          <input className=' rounded-lg my-1'
            type="text"
            name="details"
            value={formik.values.details}
            onChange={formik.handleChange}
            id="details"
            placeholder="Enter details"
          />
          <br />
          <input className=' rounded-lg my-1'
            type="text"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            id="city"
            placeholder="Enter city"
          />
          <br />
          <input className=' rounded-lg my-1'
            type="text" name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            id="phone"
            placeholder="Enter phone"
          />
          <br />
          <button
            type="submit"
            className="px-5 py-2 text-white bg-green-500 rounded-2xl my-10"
          >
            Submit
          </button>
        </form>
      </div>
    </motion.div>
  );
}
