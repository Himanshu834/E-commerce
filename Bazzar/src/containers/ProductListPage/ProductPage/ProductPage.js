import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductPage } from "../../../actions";
import getParams from "../../../utils/getParams";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Card } from "antd";
import { useLocation } from "react-router-dom";

function ProductPage(props) {
  const dispatch = useDispatch();
  const location = useLocation();
  const product = useSelector((state) => state.product);
  const { page } = product;
  useEffect(() => {
    const params = getParams(location.search);
    const payload = {
      params,
    };
    dispatch(getProductPage(payload));
  }, []);

  return (
    <div style={{ margin: "0 10px" }}>
      <h3>{page.title}</h3>
      <Carousel renderThumbs={() => {}}>
        {page.banners &&
          page.banners.map((banner, index) => (
            <a
              key={index}
              style={{ display: "block" }}
              href={banner.navigateTo}
            >
              <img src={banner.img} alt=""></img>
            </a>
          ))}
      </Carousel>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          margin: "10px 0",
        }}
      >
        {page.products &&
          page.products.map((product, index) => (
            <Card key={index}>
              <img
                style={{ maxWidth: "100%", maxHeight: "100%" }}
                src={product.img}
              ></img>
            </Card>
          ))}
      </div>
    </div>
  );
}

export default ProductPage;
