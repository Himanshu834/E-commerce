import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getProductsBySlug } from "../../../actions";
import { Card } from "antd";
import { generatePublicUrl } from "../../../urlconfig";
function ProductStore(props) {
  const dispatch = useDispatch();
  const params = useParams();
  const [priceRange, setPriceRange] = useState({
    under5k: 5000,
    under10k: 10000,
    under15k: 15000,
    under20k: 20000,
    under30k: 30000,
  });
  const product = useSelector((state) => state.product);
  // console.log(product);
  useEffect(() => {
    dispatch(getProductsBySlug(params.slug));
  }, []);
  console.log(product);
  return (
    <>
      {Object.keys(product.productsByPrice).map((key, index) => {
        return (
          <Card
            style={{ width: "calc(100%-100px)", margin: "20px" }}
            headerLeft={`${params.slug} mobile under ${priceRange[key]}`}
            headerRight={<button>view all</button>}
          >
            <div style={{ display: "flex" }}>
              {product.productsByPrice[key].map((product) => (
                <Link
                  to={`/${product.slug}/${product._id}`}
                  style={{ display: "block" }}
                  className="productContainer"
                >
                  <div className="productImgContainer">
                    <img
                      src={generatePublicUrl(product.productPictures[0].img)}
                    ></img>
                  </div>
                  <div className="productInfo">
                    <div style={{ margin: "5px 0" }}>{product.name}</div>
                    <div>
                      <span>4.3</span>&nbsp;
                      <span>3353</span>
                    </div>
                    <div className="productPrice">{product.price}</div>
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        );
      })}
    </>
  );
}

export default ProductStore;
