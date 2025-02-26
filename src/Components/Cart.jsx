import React, { useContext, useState } from 'react'
import useQueryCart, { getCarts } from '../hooks/useQueryCart'
// import useMutationCart, { clearCart, deleteItem, updateCount } from '../hooks/useMutationCart'
import img from '../assets/images/empty.png'
import useMutationCart, { deleteItem, ClearCart, updateToCart } from '../hooks/useMutationCart'

import Loading from './Loading';
import Payment from './Payment';
import { Helmet } from "react-helmet-async";
import { UserContext } from '../Context/UserContext';
import { Minus, Plus } from 'lucide-react';


export default function Cart() {
  let { setCartNums } = useContext(UserContext)
  let { data, isError, error, isLoading } = useQueryCart(getCarts)
  let { mutate, data: deleteddata, isPending, error: errorCart } = useMutationCart(deleteItem)
  let { mutate: mutateClear, data: clearData, isPending: isPendingClear } = useMutationCart(ClearCart)
  let { mutate: mutateupdate, data: clearUpdate, isPending: isPendingUpdate } = useMutationCart(updateToCart)
  let [isOpen, setOpen] = useState(false)

  console.log(clearUpdate)

  if (!data?.data?.numOfCartItems) {
    return <div className='flex justify-center items-center h-screen'>
      <img src={img} alt="" />
    </div>
  }

  setCartNums(data?.data?.numOfCartItems)
  if (isLoading || isPending || isPendingClear || isPendingUpdate)
    return <Loading />
  if (errorCart)
    toast.error(error?.response?.data?.message)

  // console.log(data?.data?.data)

  return (


    <div className="w-3/4 mx-auto  my-5 relative overflow-x-auto  sm:rounded-lg">
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <div className='flex justify-between items-center px-32 mb-5'>
        <h1 className='font-bold dark:text-gray-400'>Number of Cart Item: {data?.data?.numOfCartItems}</h1>
        <h1 className='font-bold dark:text-gray-400'>Total Price: <span className='text-green-color font-extrabold'>{data?.data?.data?.
          totalCartPrice}</span> EGP</h1>
      </div>
      <table className="w-full shadow-lg text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-16 py-3">
              <span className="sr-only">Image</span>
            </th>
            <th scope="col" className="px-6 py-3">
              Product
            </th>
            <th scope="col" className="px-6 py-3">
              Qty
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.data?.products.map((prod =>
            <tr key={prod?.produt?._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 border-gray-200">
              <td className="p-4">
                <img src={prod?.product?.imageCover} className="w-16 md:w-16 max-w-full max-h-full" alt={prod?.product?.title} />
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-gray-400">
                {prod?.product?.title}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">

                  <button onClick={() => mutateupdate({ productId: prod?.product?._id, count: prod?.count - 1 })} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                    <Minus className="w-6 h-6" />
                  </button>
                  <div>
                    <input type="number" id="first_product" className="text-center px-1 py-1 bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={prod.count} required />
                  </div>
                  <button onClick={() => mutateupdate({ productId: prod?.product?._id, count: prod?.count + 1 })} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                    <Plus className="w-6 h-6" />
                  </button>
                </div>
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {prod?.price}
              </td>
              <td className="px-6 py-4">
                <a
                  onClick={() => mutate(prod?.product?._id)}
                  className="cursor-pointer flex items-center gap-2 font-normal bg-red-500 px-4 py-2 rounded-lg text-white hover:bg-red-600 transition-all">
                  <i className="fa-solid fa-trash"></i> Remove
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className='bg-red-800 px-3 py-2 my-10 float-right cursor-pointer rounded-2xl mx-3 text-white ' onClick={ClearCart}>Clear Your Cart</button>
      <button onClick={() => { setOpen(!isOpen) }} className='bg-blue-500 px-3 py-2 my-10 float-right cursor-pointer rounded-2xl mx-3 text-white ' >Check out</button>
      {isOpen && <Payment cartId={data?.data?.cartId} />}
    </div>


  )
}
