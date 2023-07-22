import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySlug } from "../../../actions";
import { Card, Empty } from "antd";
import { BiRupee } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";

import "./style.css";
import { generatePublicUrl } from "../../../urlconfig";
import SEO from "../../../components/SEO";

const ClothingAndAccessories = (props) => {
  const params = useParams();
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsBySlug(params.slug));
  }, []);

  return (
    <div className="md:p-10">
      <SEO title={params.slug} />
      {product.products.length > 0 ? (
        <Card>
          <div className="grid">
            {product.products.map((product) => {
              return (
                <Link
                  className="caContainer"
                  to={`/${product.slug}/${product._id}`}
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
                </Link>
              );
            })}
          </div>
        </Card>
      ) : (
        <Empty
          description={<span>No Products Found. Please try again later.</span>}
        />
      )}
    </div>
  );
};

export default ClothingAndAccessories;
