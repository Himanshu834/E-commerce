import React from "react";
import "../containers/ProductListPage/ClothingAndAccessories/style.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProduct } from "../actions";
import { Card } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { generatePublicUrl } from "../urlconfig";
import { useState } from "react";
const SimilarItems = ({
  price = "",
  className,
  title = "",
  productId = "",
}) => {
  const product = useSelector((state) => state.product);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllProduct());
  }, []);
  useEffect(() => {
    if (price) {
      setProducts(
        product.products
          .filter(
            (item) =>
              item.price <= price + 10000 &&
              item.price >= price - 10000 &&
              item._id !== productId
          )
          .slice(0, 7)
      );
    } else {
      setProducts(product.products.slice(0, 7));
    }
  }, [price]);
  return (
    products.length > 0 && (
      <Card title={title}>
        <div className={`grid ${className}`}>
          {products.map((product) => {
            return (
              <div
                className="caContainer cursor-pointer"
                onClick={() => {
                  //   navigate(`/${product.slug}/${product._id}`, {
                  //     replace: true,
                  //   });
                  window.location.href = `/${product.slug}/${product._id}`;
                }}
              >
                <div className="caImgContainer">
                  <img
                    src={generatePublicUrl(product?.productPictures[0]?.img)}
                    alt={product.name}
                  />
                </div>
                <div>
                  <div className="caProductName">{product.name}</div>
                  <div className="caProductPrice">
                    &#8377;
                    {product.price}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    )
  );
};

export default SimilarItems;
