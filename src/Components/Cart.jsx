import React, { useContext, useState } from 'react'
import useQueryCart, { getCarts } from '../hooks/useQueryCart'
import img from '../assets/images/empty.png'
import useMutationCart, { deleteItem, ClearCart, updateToCart } from '../hooks/useMutationCart'
import toast from 'react-hot-toast'
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
      <img src={img} alt="Empty Cart" className="max-w-full" />
    </div>
  }

  setCartNums(data?.data?.numOfCartItems)
  if (isLoading || isPending || isPendingClear || isPendingUpdate)
    return <Loading />
  if (errorCart)
    toast.error(error?.response?.data?.message)

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      mutateClear();
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 my-5 relative sm:rounded-lg">
      <Helmet>
        <title>Cart</title>
      </Helmet>
      
      <div className="mb-6">
        <h1 className='text-xl font-bold dark:text-gray-400 mb-2'>Number of Cart Items: {data?.data?.numOfCartItems}</h1>
        <h1 className='text-xl font-bold dark:text-gray-400'>Total Price: <span className='text-green-600 font-extrabold'>{data?.data?.data?.totalCartPrice}</span> EGP</h1>
      </div>

      <div className="hidden md:block overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-3">
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
            {data?.data?.data?.products.map((prod) => (
              <tr key={prod?.product?._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 border-gray-200">
                <td className="p-4">
                  <img src={prod?.product?.imageCover} className="w-16 max-w-full max-h-full" alt={prod?.product?.title} />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-gray-400">
                  {prod?.product?.title}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <button 
                      onClick={() => mutateupdate({ productId: prod?.product?._id, count: prod?.count - 1 })} 
                      disabled={prod?.count <= 1}
                      className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" 
                      type="button"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <div>
                      <input 
                        type="number" 
                        id={`product_${prod?.product?._id}`} 
                        className="text-center px-1 py-1 bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder={prod.count} 
                        readOnly
                        value={prod.count}
                        required 
                      />
                    </div>
                    <button 
                      onClick={() => mutateupdate({ productId: prod?.product?._id, count: prod?.count + 1 })} 
                      className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" 
                      type="button"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {prod?.price} EGP
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => mutate(prod?.product?._id)}
                    type="button"
                    className="cursor-pointer flex items-center gap-2 font-normal bg-red-500 px-4 py-2 rounded-lg text-white hover:bg-red-600 transition-all">
                    <i className="fa-solid fa-trash"></i> Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4">
        {data?.data?.data?.products.map((prod) => (
          <div key={prod?.product?._id} className="bg-white p-4 rounded-lg shadow-md dark:bg-gray-800 dark:text-gray-400">
            <div className="flex items-center mb-3">
              <img src={prod?.product?.imageCover} className="w-16 h-16 object-cover rounded-md mr-3" alt={prod?.product?.title} />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-300">{prod?.product?.title}</h3>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{prod?.price} EGP</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center">
                <button 
                  onClick={() => mutateupdate({ productId: prod?.product?._id, count: prod?.count - 1 })} 
                  disabled={prod?.count <= 1}
                  className="inline-flex items-center justify-center p-1 text-sm font-medium h-8 w-8 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" 
                  type="button"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="mx-2">
                  <input 
                    type="number" 
                    className="text-center px-2 py-1 bg-gray-50 w-12 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    readOnly
                    value={prod.count}
                    required 
                  />
                </div>
                <button 
                  onClick={() => mutateupdate({ productId: prod?.product?._id, count: prod?.count + 1 })} 
                  className="inline-flex items-center justify-center h-8 w-8 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" 
                  type="button"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              
              <button
                onClick={() => mutate(prod?.product?._id)}
                type="button"
                className="cursor-pointer flex items-center gap-1 font-normal bg-red-500 px-3 py-1 rounded-lg text-white hover:bg-red-600 transition-all text-sm">
                <i className="fa-solid fa-trash"></i> Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex flex-col sm:flex-row sm:justify-end gap-3 mt-6">
        <button 
          type="button"
          onClick={handleClearCart} 
          className='bg-red-800 px-3 py-2 cursor-pointer rounded-lg text-white hover:bg-red-900 transition-all w-full sm:w-auto'
        >
          Clear Your Cart
        </button>
        <button 
          type="button"
          onClick={() => { setOpen(!isOpen) }} 
          className='bg-blue-500 px-3 py-2 cursor-pointer rounded-lg text-white hover:bg-blue-600 transition-all w-full sm:w-auto'
        >
          Check out
        </button>
      </div>
      
      {isOpen && <Payment cartId={data?.data?.data?.cartId} />}
    </div>
  )
}