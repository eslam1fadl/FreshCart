import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import Productitem from "./Productitem";
import { useQuery } from "@tanstack/react-query";
import useMutationCart, { addToCart } from "../hooks/useMutationCart";
import useMutationWishlist, { addToWish } from "../hooks/useMutationWishlist";
import toast from "react-hot-toast";

export default function ProductDetails() {
  let { data, mutate, error, isError, isSuccess } = useMutationCart(addToCart);
  let { data: dataWish, mutate: mutateWish, error: errorWish, isError: isErrorWish, isSuccessWish } = useMutationWishlist(addToWish)

  let [Relatedproducts, setRelatedproducts] = useState([]);
  let [imgSrc, setImgSrc] = useState("");
  let [ind, setIndex] = useState(0);
  let { id, catId } = useParams();

  if (isSuccess)
    toast.success(data?.data?.message)
  if (isError)
    toast.error(error?.response?.data?.message)

  if (isSuccessWish)
    toast.success(data?.message)


  function changeSrc(img, index) {
    setIndex(index);
    setImgSrc(img);
  }


  async function getProductDetails() {
    return await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
  }

  let {
    data: dataobj,
    isLoading,
    isError: isQueryError,
  } = useQuery({
    queryKey: ["ProductDetails", id],
    queryFn: getProductDetails,
    select: (response) => response?.data?.data,
  });

  async function getRelatedproducts() {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?category[in]=${catId}`
      );
      setRelatedproducts(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getRelatedproducts();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (isQueryError) {
    return <p className="text-red-500">Failed to load product details.</p>;
  }

  return (
    <div className="container dark:bg-black dark:text-white">
      <div className="flex items-center gap-6 py-5 dark:bg-black dark:text-white">
        <div className="w-1/3">
          <img
            src={imgSrc ? imgSrc : dataobj?.imageCover}
            className="w-full"
            alt="Product"
          />
          <div className="flex gap-2">
            {dataobj?.images?.map((img, index) => (
              <img
                onClick={() => changeSrc(img, index)}
                src={img}
                className={`w-[20%] transition-all cursor-pointer my-2 ${index === ind ? " opacity-100 scale-95" : "opacity-50"
                  }`}
                key={img}
                alt={`Product ${index}`}
              />
            ))}
          </div>
        </div>

        <div className="w-2/3">
          <h2 className=" text-[1rem] md:text-[2rem] font-bold my-4">{dataobj?.title ?? "No Title Available"}</h2>
          <p>{dataobj?.description ?? "No Description Available"}</p>
          <h3 className="font-semibold text-sm">
                {dataobj?.category?.name ?? "No Category"}
              </h3>
          <div className="flex justify-between">

              <div>
              <div>
             
            </div>
            <div>
              <span>
                {dataobj?.ratingsAverage ?? "No Rating"}{" "}
                <i className="fa-solid fa-star text-rating-color"></i>
              </span>
              <p>{dataobj?.price ? `${dataobj.price} EGP` : "Price Not Available"}</p>
             
            </div>
              </div>
              <div>
              <button onClick={() => { mutateWish(id) }} className="btn1 font-bold text-black focus:text-red-700 ">
                <i className=" fa-solid fa-heart h3"></i>
            </button>
              </div>
              
          </div>
          


          <button onClick={() => { mutate(id) }} className="btn w-full py-3 text-white my-3 bg-green-400">
            Add to Cart
          </button>
        </div>
      </div>

      <h2 className="my-4 text-[2rem] font-bold">Related products</h2>
      <div className="row">
        <div className="flex flex-wrap">
          {Relatedproducts.length ? (
            Relatedproducts.map((prod) => (
              <Productitem key={prod._id} prod={prod}></Productitem>
            ))
          ) : (
            <Loading></Loading>
          )}
        </div>
      </div>
    </div>
  );
}
