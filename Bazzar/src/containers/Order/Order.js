import React from "react";
import { useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../actions";
import Footer from "../../components/Footer";
import Layout from "../../components/Layout/index";
import { Card } from "antd";
import { generatePublicUrl } from "../../urlconfig";
import "./style.css";
import SEO from "../../components/SEO";
import { useNavigate } from "react-router-dom";

function Order() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  return (
    <>
      <SEO title="Orders" />
      <Layout />
      {user.orders.map((order) => {
        return order.items.map((item) => (
          <Card
            // style={{ margin: "5px auto", width: "80%" }}
            className="w-full md:w-[80%] sm:my-[5px] mx-auto cursor-pointer"
            onClick={() => {
              navigate(`/${item.productId.slug}/${item.productId._id}`);
            }}
          >
            <div className="orderItemContainer">
              <div
                style={{
                  width: 80,
                  fontFamily: "Salsa",
                  height: 80,
                  overflow: "hidden",
                  textAlign: "center",
                }}
              >
                <img
                  style={{ maxWidth: 80, maxHeight: 80 }}
                  src={generatePublicUrl(item.productId.productPictures[0].img)}
                ></img>
              </div>
              <div style={{ fontFamily: "Salsa" }}>
                {item.productId.name.slice(0, 30)} {"..."}
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <div style={{ fontFamily: "Salsa" }}>{item.payablePrice}</div>
                <div style={{ fontFamily: "Salsa" }}>{order.paymentStatus}</div>
              </div>
            </div>
          </Card>
        ));
      })}
      <Footer />
    </>
  );
}

export default Order;
