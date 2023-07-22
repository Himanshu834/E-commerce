import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import Carousel from "react-elastic-carousel";
import "../HomePage/style.css";
import one from "../../images/2.jpg";
import two from "../../images/3.jpg";
import three from "../../images/4.jpg";
// import Rectangle from "../../components/Rectangle";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllProduct } from "../../actions";
import { Card } from "antd";
import { generatePublicUrl } from "../../urlconfig";
import SimilarItems from "../../components/SimilarItems";

export default function HomePage() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(getAllProduct());
  }, []);
  console.log(product);
  var min = 1;
  var max = 100;
  var rand = Math.pow(Math.ceil(min + Math.random() * (max - min)), 4);
  const first = product.products[(rand + 1) % 4];
  const second = product.products[(rand + 2) % 4];
  const third = product.products[(rand + 3) % 4];
  const fourth = product.products[(rand + 4) % 4];
  const items = [
    {
      id: 1,
      url: one,
      slug: "Xiaomi-11T-Pro-5G",
      id: "62263dea9a047e4fc85075ec",
    },
    {
      id: 2,
      url: two,
      slug: "Xiaomi-11Lite-NE-(Jazz-Blue-128-GB)",
      id: "62263e6a9a047e4fc85075ee",
    },
    {
      id: 3,
      url: three,
      slug: "Mi-4A-Pro-108-cm-(43-inch)-Full-HD-LED-Smart-Android-TV",
      id: "62263eb89a047e4fc85075f0",
    },
  ];
  // console.log(breedList);
  return (
    <div>
      <Layout />
      <div className="body">
        <Carousel className="w-full m-0" showArrows={false}>
          {items.map((item) => (
            <Link
              to={`/${item.slug ? item.slug : null}/${
                item.id ? item.id : null
              }`}
            >
              <img
                key={item.id}
                src={item.url}
                className="w-full h-96 object-cover"
              ></img>
            </Link>
          ))}
        </Carousel>
        <div className="mt-4">
          <SimilarItems title="Top Products" />
        </div>
      </div>
      <Footer />
    </div>
  );
}
