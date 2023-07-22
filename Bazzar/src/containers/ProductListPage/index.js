import React, { useState } from "react";
import Footer from "../../components/Footer";
import getParams from "../../utils/getParams";
import ClothingAndAccessories from "./ClothingAndAccessories/ClothingAndAccessories";
import ProductPage from "./ProductPage/ProductPage";
import ProductStore from "./ProductStore/productStore";
import "./style.css";
import Header from "../../components/Header";
import { useLocation } from "react-router-dom";
import Layout from "../../components/Layout";
const ProductListPage = (props) => {
  const location = useLocation();
  const renderProduct = () => {
    const params = getParams(location.search);
    let content = null;
    switch (params.type) {
      case "Store":
        content = <ProductStore {...props} />;
        break;
      case "Page":
        content = <ProductPage {...props} />;
        break;
      default:
        content = <ClothingAndAccessories {...props} />;
    }
    return content;
  };

  return (
    <div>
      <Layout />
      {/* {renderProduct()} */}
      <ClothingAndAccessories {...props} />
      <Footer />
    </div>
  );
};

export default ProductListPage;
