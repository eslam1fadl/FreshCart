import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios"

let token = localStorage.getItem('token')
export function addToWish(productId) {

    return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, { productId }, {
        headers: {
            token
        }
    })
}
export function deleteItem(productId) {

    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers: {
            token
        }
    })

}


export default function useMutationWishlist(fn) {

    const queryClient = useQueryClient(); 
    return useMutation({
        mutationFn: fn, onSuccess: () => {

            queryClient.invalidateQueries({ queryKey: ['wish'] })




        }
    })


}