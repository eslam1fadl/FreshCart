import axios from "axios"
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"; 


export default function Categories() {

  let [cats,setCats]=useState([])
  let [error,setError]=useState([])

 async function getCat(){
  try{
    let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    setCats(data.data)
  }
   catch(error){
    setError(error.message)

   }
  }
  useEffect(()=>{
    getCat();
  },[])

  return (
    <div className="my-12 container">
       <Helmet>
        <title>Categorie</title>
      </Helmet>
      <div className="flex flex-wrap">

      {cats.map(ele=><CatItem key={ele._id} ele={ele}></CatItem>)}
    </div>
    </div>

  )
}

function CatItem({ele}){
return <div className="product flex flex-col gap-4 cursor-pointer lg:w-1/3 md:w-1/3 sm:w-1/2 w-full p-5 my-2 bg-white dark:bg-black dark:text-white">
<div className=" space-ss">
    <div className="overflow-hidden w-full br-pr">
    <img
            src={ele.image}
            className="w-full h-60  object-cover transition-transform duration-1000 hover:scale-125"
          />
    </div>
    <div className=" cat-text flex justify-center overflow-hidden py-4 br-prt">
    <h1 className="text-green-600 text-2xl font-bold dark:text-green-400">{ele.name}</h1>
    </div>
 
  </div>
</div>
}