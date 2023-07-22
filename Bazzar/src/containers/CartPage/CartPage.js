import React, { useEffect, useState } from "react";
import "./style.css";
import Layout from "../../components/Layout/index";
import { Card, Empty } from "antd";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItems/CartItem";
import {
  AddToCart,
  getCartItems,
  removeCartItem,
} from "../../actions/cart.action";
// import PriceDetails from "../../components/PriceDetails";
import Footer from "../../components/Footer";
import SEO from "../../components/SEO";
import { useNavigate } from "react-router-dom";
import { formatter } from "../../components/helper";
import { Affix, Input, Button } from "antd";

function CartPage(props) {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const [cartItems, setCartItems] = useState(cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [discount, setDiscount] = useState("");
  const [coupon, setCoupon] = useState("");
  const [discountError, setDiscountError] = useState("");

  const handleChangeDiscount = (value) => {
    setCoupon(value);
  };
  const onqtyIncrement = (_id, qty) => {
    const { name, price, img } = cartItems[_id];
    // console.log(qty);
    dispatch(AddToCart({ _id, name, price, img }, 1));
  };
  const onqtyDecrement = (_id, qty) => {
    const { name, price, img } = cartItems[_id];
    // console.log(qty);
    dispatch(AddToCart({ _id, name, price, img }, -1));
  };
  const onRemoveCartItem = (_id) => {
    dispatch(removeCartItem({ productId: _id }));
  };
  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getCartItems());
    }
  }, [auth.authenticate]);
  useEffect(() => {
    setCartItems(cart.cartItems);
    console.log(cart.cartItems);
  }, [cart.cartItems]);
  if (props.onlyCartItems) {
    return (
      <>
        {Object.keys(cartItems).map((key, index) => (
          <CartItem
            onRemoveCartItem={onRemoveCartItem}
            key={index}
            cartItem={cartItems[key]}
            onqtyInc={onqtyIncrement}
            onqtyDec={onqtyDecrement}
          />
        ))}
      </>
    );
  }

  const handleDiscount = (e) => {
    console.log(e.target.value);
  };
  return (
    <div>
      <SEO title="Cart" />
      <Layout />
      {Object.keys(cart.cartItems).length > 0 ? (
        <div className="cartContainer">
          <Card
            style={{
              width: "calc(100%)",
              overflow: "hidden",
              border: "5px solid #cecece",
              fontFamily: "Salsa",
            }}
            headerLeft={<div style={{ fontFamily: "Salsa" }}>My Cart</div>}
            headerRight={<div style={{ fontFamily: "Salsa" }}>Deliver In</div>}
          >
            {Object.keys(cartItems).map((key, index) => (
              <CartItem
                onRemoveCartItem={onRemoveCartItem}
                key={index}
                cartItem={cartItems[key]}
                onqtyInc={onqtyIncrement}
                onqtyDec={onqtyDecrement}
              />
            ))}
          </Card>
          {/* <PriceDetails
          totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
            return qty + cart.cartItems[key].qty;
          }, 0)}
          totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
            const { price, qty } = cart.cartItems[key];
            return totalPrice + price * qty;
          }, 0)}
        /> */}
          <Affix
            offsetBottom={20}
            className="flex flex-col w-full md:w-3/5 h-max"
          >
            <Card className="h-max">
              <div className="flex flex-col gap-2">
                <h1 className="text-[16px] font-medium">Have a coupon?</h1>
                <div className="flex flex-row gap-4">
                  <div className="flex flex-col gap-2 w-full">
                    <Input
                      className="w-full"
                      placeholder="Enter Coupon Code"
                      value={coupon}
                      onChange={(e) => handleChangeDiscount(e.target.value)}
                    />
                    {discountError && (
                      <div className="text-red-500 text-[12px]">
                        {discountError}
                      </div>
                    )}
                  </div>
                  <Button
                    className="text-[14px] flex items-center justify-center rounded-full
                            hover:shadow-lg
                            bg-black text-white
                            transition duration-500 ease-in-out h-[30px] w-[80px]
                          "
                    onClick={handleDiscount}
                  >
                    <div
                      className="flex items-center justify-center gap-2
                    "
                    >
                      Apply
                    </div>
                  </Button>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-4">
                <h1 className="text-[16px] font-medium">Order Summary</h1>
                <div className="flex flex-col">
                  <div className="flex flex-row justify-between">
                    <h1 className="text-[15px] opacity-90">Subtotal</h1>
                    <h1 className="text-[14px] opacity-90  font-sans">
                      {formatter.format(
                        Object.keys(cart.cartItems).reduce(
                          (totalPrice, key) => {
                            const { price, qty } = cart.cartItems[key];
                            return totalPrice + price * qty;
                          },
                          0
                        )
                      )}
                    </h1>
                  </div>
                  <div className="flex flex-row justify-between">
                    <h1 className="text-[15px] opacity-90">Shipping</h1>
                    <h1 className="text-[14px] opacity-90  font-sans">
                      {formatter.format(0)}
                    </h1>
                  </div>
                  <div className="flex flex-row justify-between">
                    <h1 className="text-[15px] opacity-90">Discount</h1>
                    <h1 className="text-[14px] opacity-90  font-sans">
                      {formatter.format(
                        Object.keys(cart.cartItems).length > 0
                          ? Object.keys(cart.cartItems).reduce(
                              (totalPrice, key) => {
                                const { price, qty } = cart.cartItems[key];
                                return totalPrice + price * qty;
                              },
                              0
                            ) *
                              (discount / 100)
                          : 0
                      )}
                    </h1>
                  </div>
                  <div className="flex flex-row justify-between">
                    <h1 className="text-[15px] opacity-90">Total</h1>
                    <h1 className="text-[14px] opacity-90 font-sans">
                      {formatter.format(
                        Object.keys(cart.cartItems).length > 0
                          ? Object.keys(cart.cartItems).reduce(
                              (totalPrice, key) => {
                                const { price, qty } = cart.cartItems[key];
                                return totalPrice + price * qty;
                              },
                              0
                            ) -
                              Object.keys(cart.cartItems).reduce(
                                (totalPrice, key) => {
                                  const { price, qty } = cart.cartItems[key];
                                  return totalPrice + price * qty;
                                },
                                0
                              ) *
                                (discount / 100)
                          : 0
                      )}
                    </h1>
                  </div>
                </div>
              </div>
              <Button
                type="primary"
                className="text-[16px] tracking-wide text-white flex items-center justify-center rounded-full 
                    hover:shadow-lg bg-black
                    transition duration-500 ease-in-out h-[35px] w-full mt-4
                  "
                onClick={() => navigate("/checkout")}
              >
                Proceed to Payment
              </Button>
            </Card>
          </Affix>
        </div>
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <span className="text-[14px] font-medium flex items-center justify-center flex-col">
              Your cart is empty
              <br />
              <Button
                type="primary"
                className="text-[14px] tracking-wide text-white flex items-center justify-center rounded-full
                    hover:shadow-lg bg-black
                    transition duration-500 ease-in-out h-[35px] w-[100px] mt-4
                  "
                onClick={() => navigate("/")}
              >
                Add Items
              </Button>
            </span>
          }
        />
      )}
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default CartPage;
