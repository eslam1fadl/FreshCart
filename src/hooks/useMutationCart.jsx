import { useMutation, useQueryClient } from '@tanstack/react-query'


import axios from 'axios'
import React from 'react'

let token = localStorage.getItem('token')
//add to cart
export function addToCart(productId) {

    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, { productId }, {
        headers: {
            token
        }
    })
}

//updata to cart
export function updateToCart({productId, count}) {
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{ count }, {
        headers: {
            token
        }
    })
    // console.log(productId)
    // console.log(count)

}



//delate item from cart

export function deleteItem(productId) {

    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers: {
            token
        }
    })

}

//clear
export function ClearCart() {

    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/`, {
        headers: {
            token
        }
    })

}

export default function useMutationCart(fn) {

    const queryClient = useQueryClient(); 
    return useMutation({
        mutationFn: fn, onSuccess: () => {

            queryClient.invalidateQueries({ queryKey: ['cart'] })




        }
    })


}
