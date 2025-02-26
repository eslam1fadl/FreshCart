import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

let token = localStorage.getItem('token')

  export function getWish() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers: {

            token
        }
    })
}

    export default function useQueryWish(fn) {
        
        return useQuery({queryKey:['wish'],queryFn:fn,

            refetchInterval:1000,
            refetchOnWindowFocus:false
        })
        

    }
   


