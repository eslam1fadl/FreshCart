import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

export default function CategoriesSlick() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 7, 
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024, 
        settings: {
          slidesToShow: 5,
          dots: false,
        },
      },
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 4,
          dots: false,
        },
      },
      {
        breakpoint: 640, 
        settings: {
          slidesToShow: 2,
          dots: false,
        },
      },
    ],
  };

  let [cats, setCats] = useState([]);

  async function getCat() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories`
    );
    setCats(data.data);
  }

  useEffect(() => {
    getCat();
  }, []);

  return (
    <div className="my-12 container w-full px-4">
      <Slider {...settings}>
        {cats.map((ele) => (
          <CatItem key={ele._id} ele={ele} />
        ))}
      </Slider>
    </div>
  );
}

function CatItem({ ele }) {
  return (
    <div className="px-2">
      <img
        src={ele.image}
        className="h-[150px] md:h-[180px] lg:h-[200px] w-full object-cover rounded-lg shadow-md"
        alt={ele.name}
      />
      <p className="text-center mt-2 text-sm md:text-base font-semibold">{ele.name}</p>
    </div>
  );
}
