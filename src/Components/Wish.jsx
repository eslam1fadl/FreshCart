import React from 'react'
import useQueryWish, { getWish } from '../hooks/useQueryWish'
import useMutationCart, { addToCart, deleteItem } from '../hooks/useMutationCart'
import toast from 'react-hot-toast'
import useMutationWishlist from '../hooks/useMutationWishlist'
import { Helmet } from 'react-helmet-async'

export default function Wish() {

  let { data, isError, error, isLoading } = useQueryWish(getWish)
  let {data:dataCart,mutate:mutateCart,error:errorCart,isError:isErrorCart,isSuccess:isSuccessCart} = useMutationCart(addToCart)


    let { mutate, data: deleteddata, isPending ,error:errorWish  } = useMutationWishlist(deleteItem)
    // let [isOpen, setOpen] = useState(false)
  if (isSuccessCart)
    toast.success(data?.data?.message)
  if (isErrorCart)
    toast.error(error?.response?.data?.message)

  if(errorWish)
    toast.error(error?.data?.message)

  console.log(data?.data?.data);
  return (
    <div className="container mx-auto py-10 px-5 bg-gray-100 dark:bg-black dark:text-gray-400 rounded-lg">
       <Helmet>
        <title>Wish List</title>
      </Helmet>
    <h2 className="text-3xl font-bold text-center mb-6">My Wish List</h2>
    {data?.data?.data.map((prod) => (
      <div 
        key={prod.id} 
        className="w-3/4 sm:w-3/4 mx-auto flex flex-col md:flex-row items-center text-center border-b border-gray-300 p-4 bg-white dark:bg-gray-700 dark:text-gray-400 shadow-md rounded-lg mb-4 gap-4 md:gap-6"
      >
        <div className="w-1/2 sm:w-1/7 md:w-1/6 flex-shrink-0">
          <img className="w-full rounded-lg" src={prod?.imageCover} alt="Product"/>
        </div>
  
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-2 md:px-4 text-left">
          <div className="flex-1">
            <h5 className="text-sm lg:text-lg font-normal">{prod?.category?.name}</h5>
            <h6 className="text-sm  lg:text-lg text-green-600 font-bold">{prod?.price} EGP</h6>
            <button 
              onClick={() => { mutate(prod?._id) }} 
              className="text-red-500 flex items-center mt-0 lg:mt-2 hover:text-red-700"
            >
              <i className="fa fa-trash mr-2" /> Remove
            </button>
          </div>
  
          <div>
            <button 
              onClick={() => { mutateCart(prod?._id) }} 
              className="bg-green-500 text-white  px-3 py-1 text-base  lg:px-4  lg:py-2 rounded-lg lg:text-lg font-medium hover:bg-green-600"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
  
  

  )
}
