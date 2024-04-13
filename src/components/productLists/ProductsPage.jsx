import React from "react";
import { useParams } from "react-router-dom";
import PhonesProductPage from "./PhonesProductPage";
import LaptopsProductPage from "./LaptopsProductPage";
import TabletsProductPage from "./TabletsProductPage";
import AccessoriesProductPage from "./AccessoriesProductPage";

const ProductsPage = () => {
  const { categoryName } = useParams();
  // const displayProducts = ()=>{

  //   if (categoryName = "phones") {
  //     return <PhonesProductPage/>
  //   }

  // }
  return (
    <div>
      {categoryName === "phones" && <PhonesProductPage />}
      {categoryName === "laptops" && <LaptopsProductPage />}
      {categoryName === "tablets" && <TabletsProductPage />}
      {categoryName === "accessories" && <AccessoriesProductPage />}
    </div>
  );
};

export default ProductsPage;
