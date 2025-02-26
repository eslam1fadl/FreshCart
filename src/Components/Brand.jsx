import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async"; 

export default function Brand({ children }) {
  let [error, setError] = useState(null);
  let [cats, setCats] = useState([]);

  async function getBrands() {
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
      setCats(data.data);
    } catch (error) {
      setError(error.message);
    }
  }

  useEffect(() => {
    getBrands(); 
  }, []);

  return (
    <div className="my-12 container">
      <Helmet>
        <title>Brand</title>
      </Helmet>

      <div className="flex justify-center items-center align-middle">
        <h1 className="text-4xl font-bold text-green-color mb-5">All Brands</h1>
      </div>
      {error && <p className="text-red-500">Error: {error}</p>}
      <div className="flex flex-wrap">
        {cats.map(ele => <CatItem key={ele._id} ele={ele} />)}
      </div>
    </div>
  );
}

function CatItem({ ele }) {
  return (
    <div className="product flex flex-col gap-4 cursor-pointer lg:w-1/4 md:w-1/3 sm:w-1/2 w-full p-5 my-2 bg-white dark:bg-black dark:text-white">
      <div className="space-ss transition-transform duration-1000 hover:scale-105 br-pr2">
        <div className="overflow-hidden w-full">
          <img src={ele.image} className="w-full h-30 object-cover" />
        </div>
        <div className="cat-text flex justify-center overflow-hidden py-4">
          <h1 className="text-green-600 text-2xl font-bold dark:text-green-400">{ele.name}</h1>
        </div>
      </div>
    </div>
  );
}
