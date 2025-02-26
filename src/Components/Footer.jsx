import React, { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('Email submitted:', email);
  };

  return (
    <div className="bg-gray-100 mt-10 p-8 dark:bg-gray-900 dark:text-white">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Get the FreshCart app</h2>
          <p className="text-gray-600 mb-4 dark:text-gray-300">
            We will send you a link, open it on your phone to download the app.
          </p>
          
          <form onSubmit={handleSubmit} className=" form-footer flex gap-1 flex-wrap">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email..." 
              className="flex-grow p-2 border  md:w-[83%] w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:border-gray-600"
            />
            <button 
              type="submit" 
              className="bg-green-500  text-white md:px-2  px-0 md:w-[16%]  w-full py-2 rounded-md hover:bg-green-600 transition-colors"
            >
              Share App Link
            </button>
          </form>
        </div>

      
      </div>
    </div>
  );
}