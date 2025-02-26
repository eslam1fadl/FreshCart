import React from "react";
import Productitem from "./Productitem";
import Loading from "./Loading";
import useProduct from "../hooks/useProduct";
import { Helmet } from "react-helmet-async";

export default function Products() {
  const { data, isError, isLoading, error } = useProduct();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div className="container">
       <Helmet>
        <title>Products</title>
      </Helmet>
      <div className="flex flex-wrap">
        {data?.map(prod => (
          <Productitem key={prod._id} prod={prod} />
        ))}
      </div>
    </div>
  );
}
