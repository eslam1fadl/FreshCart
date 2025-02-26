import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/freshcart-logo.svg';
import 'flowbite';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../Context/UserContext';

export default function Navbar() {
  let { isLogin, setLogin } = useContext(UserContext);
  let { cartNum } = useContext(UserContext);
  let ref = useRef(null);
  let navigate = useNavigate();
  
  const [isOpen, setIsOpen] = useState(false);

  function logout() {
    localStorage.removeItem('token');
    setLogin(null);
    navigate('/login');
    setIsOpen(false); 
  }

  useEffect(() => {
    if (localStorage.getItem('theme')) {
      document.body.classList.add('dark');
      if (ref.current) ref.current.checked = true;
    }
  }, []);

  function toggleMe() {
    let body = document.body;
    if (ref.current?.checked) {
      body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.remove('dark');
      localStorage.removeItem('theme');
    }
  }

  return (
    <nav className="bg-light-color dark:text-white border-gray-200 dark:bg-gray-900 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-screen-xl w-[90%] flex flex-wrap justify-between lg:justify-start mx-auto p-4 dark:text-white">
        
        <Link to="/" className="flex w-[20%] items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} alt="Logo" />
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>

        <div className={`${isOpen ? "block" : "hidden"} lg:flex w-[80%] lg:justify-between`} id="navbar-default">
          <ul className="font-medium flex flex-col p-4 lg:p-0 mt-4 lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0">
            
            <li>
              <Link to="/" className="block py-2 px-3 text-gray-500 rounded lg:bg-transparent lg:p-0 dark:text-white" onClick={() => setIsOpen(false)}>Home</Link>
            </li>
            <li>
              <Link to="/products" className="block py-2 px-3 text-gray-500 rounded lg:bg-transparent lg:p-0 dark:text-white" onClick={() => setIsOpen(false)}>Products</Link>
            </li>
            {isLogin && (
              <>
                <li>
                  <Link to="/wish" className="block py-2 px-3 text-gray-500 rounded lg:bg-transparent lg:p-0 dark:text-white" onClick={() => setIsOpen(false)}>Wish List</Link>
                </li>
                <li>
                  <Link to="/cart" className="block py-2 px-3 text-gray-500 rounded lg:bg-transparent lg:p-0 dark:text-white" onClick={() => setIsOpen(false)}>Cart</Link>
                </li>
              </>
            )}
            <li>
              <Link to="/categories" className="block py-2 px-3 text-gray-500 rounded lg:bg-transparent lg:p-0 dark:text-white" onClick={() => setIsOpen(false)}>Categories</Link>
            </li>
            <li>
              <Link to="/brand" className="block py-2 px-3 text-gray-500 rounded lg:bg-transparent lg:p-0 dark:text-white" onClick={() => setIsOpen(false)}>Brands</Link>
            </li>
          </ul>

          <ul className="font-medium flex flex-col p-4 lg:p-0 mt-4 lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0">
            {isLogin ? (
              <>
                <li>
                  <Link to="/cart" className="font-bold block py-2 px-3 text-green-500 rounded lg:bg-transparent lg:p-0 dark:text-green-400" onClick={() => setIsOpen(false)}>
                    <i className="text-2xl fa-solid fa-shopping-cart px-2"></i>
                    {cartNum}
                  </Link>
                </li>
                <li>
                  <span onClick={logout} className="block py-2 px-3 text-gray-500 rounded lg:bg-transparent lg:p-0 dark:text-white cursor-pointer">Logout</span>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="block py-2 px-3 text-gray-500 rounded lg:bg-transparent lg:p-0 dark:text-white" onClick={() => setIsOpen(false)}>Login</Link>
                </li>
                <li>
                  <Link to="/register" className="block py-2 px-3 text-gray-500 rounded lg:bg-transparent lg:p-0 dark:text-white" onClick={() => setIsOpen(false)}>Register</Link>
                </li>
              </>
            )}
            <li>
              <div className="tog relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                <input type="checkbox" name="toggle" ref={ref} onChange={toggleMe} id="toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
                <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
