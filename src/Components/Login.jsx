import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useState, useContext } from 'react';
import { UserContext } from '../Context/UserContext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function Login() {

  let { setLogin } = useContext(UserContext)
  let navigate = useNavigate();
  let [errMsg, setErrMsg] = useState('');
  let [loading, setLoading] = useState(false);

  async function handleLogin(values) {
    setLoading(true);
    try {
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values);
      console.log(data)
      if (data.message === 'success') {
        setLogin(data.token);
        localStorage.setItem('token', data.token)
        navigate('/');
        window.location.reload();
      }
      setLoading(false);
      setErrMsg('');
    } catch (error) {
      setErrMsg('email or password incorrect');
      setLoading(false);
    }
  }

  let validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Email is required'),

    password: Yup.string()
      .required('Password is required')
      .matches(/^[A-Z][a-z0-9]{2,5}$/, 'Password must start with an uppercase letter and be 3-6 characters long, containing only letters and numbers'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: handleLogin
  });

  return (
    <div className="container m-auto ">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <form className="max-w-md mx-auto mt-2 p-4 shadow-lg" onSubmit={formik.handleSubmit}>
        <h2 className=" text-green-700 text-[1.5rem] font-bold my-3 text-center">Login</h2>

        <div className="relative z-0 w-full mb-5 group p-2">
          <input
            type="email"
            name="email"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" " />
          {formik.touched.email && formik.errors.email && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span className="font-medium">{formik.errors.email}</span>
            </div>
          )}
          {errMsg ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{errMsg}</span>
          </div> : ''}

          <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Email address
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group p-2">
          <input
            type="password"
            name="password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          {formik.touched.password && formik.errors.password && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span className="font-medium">{formik.errors.password}</span>
            </div>
          )}
          <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Password
          </label>
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center w-full gap-3">
          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 flex items-center justify-center"
          >
            {loading ? <i className="fa-solid fa-spinner animate-spin text-white"></i> : "Login"}
          </button>

          <Link
            to="/forgetpassword"
            className=" bg-transparent text-black border  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-[#F0F3F2]  dark:text-black dark:border-none  flex items-center justify-center"
          >
            Forget your password ?
          </Link>
        </div>
      </form>
    </div>
  );
}