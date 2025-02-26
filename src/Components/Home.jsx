import Categories from "./Categories";
import CategoriesSlick from "./CategoriesSlick";
import FeaturedProducts from "./FeaturedProducts";
import Header from "./Header";
import { Helmet } from "react-helmet-async"; 


export default function Home() {
  return (
    <div>
       <Helmet>
        <title>Home</title>
      </Helmet>

      <Header></Header>
      <CategoriesSlick></CategoriesSlick>
      <FeaturedProducts/>

    </div>

   
  )
}
