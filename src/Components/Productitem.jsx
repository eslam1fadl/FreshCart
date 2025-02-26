import { Link } from "react-router-dom";
import useMutationCart, { addToCart } from "../hooks/useMutationCart";
import toast from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import useMutationWishlist, { addToWish } from "../hooks/useMutationWishlist";


export default function Productitem({ prod }) {
  let { imageCover, id, title, price, category, ratingsAverage, priceAfterDiscount } = prod


  let { data, mutate, error, isError, isSuccess } = useMutationCart(addToCart)
  let { data: dataWish, mutate: mutateWish, error: errorWish, isError: isErrorWish, isSuccess: isSuccessWish } = useMutationWishlist(addToWish)

  if (isSuccess)
    toast.success(data?.data?.message)
  if (isError)
    toast.error(error?.response?.data?.message)

  if (isSuccessWish)
    toast.success(dataWish?.data?.message)


  return (
    <div className="product flex flex-col gap-4 cursor-pointer lg:w-1/4 md:w-1/3 sm:w-1/2 w-full p-5 my-2 bg-white dark:bg-black dark:text-white rounded-lg">
      <div className=" space-sh p-2">
        <Link to={`/productdetails/${id}/${category._id}`}>
          <div className="overflow-hidden rounded">
            <img
              src={imageCover}
              className="w-full rounded object-cover transition-transform duration-1000 hover:scale-125"
              alt={title}
            />
          </div>
          <p className="text-green-500 dark:text-green-400">{category.name}</p>
          <p className="dark:text-white">{title}</p>
          <div className="flex justify-between my-3 dark:text-white">
            <p className={`${priceAfterDiscount ? 'line-through dark:text-white' : ''}`}>
              {price} EGP
            </p>
            <p className="dark:text-white">{priceAfterDiscount ? `${priceAfterDiscount} EGP` : ''}</p>
            <div>
              <span className="dark:text-white">{ratingsAverage}</span>
              <i className="text-yellow-500 fa-solid fa-star"></i>
            </div>
          </div>
        </Link>
        <div className="flex flex-row justify-between">
          <button onClick={() => { mutate(id) }} className="btn bg-green-500 text-white px-3 py-3 rounded hover:bg-green-600">
            Add to Cart
          </button>
          <button onClick={() => { mutateWish(id) }} className="btn1 font-bold text-black dark:text-white focus:text-red-700 dark:focus:text-red-700">
            <i className="fa-solid fa-heart h3"></i>
          </button>
        </div>
      </div>
    </div>


  );

}