import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOrder, getAddress } from "../../actions";
import { getCartItems } from "../../actions/cart.action";
import Layout from "../../components/Layout";
import Bazzar from "../../images/logo/Bazzar.png";
import { Anchor, Button, Input } from "antd";
// import PriceDetails from "../../components/PriceDetails";
import { Card } from "antd";
import axiosInstance from "../../helpers/axios";
import CartPage from "../CartPage/CartPage";
import AddressForm from "./AddressForm";
import "./style.css";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import SEO from "../../components/SEO";

/**
 * @author
 * @function CheckoutPage
 **/

const CheckoutStep = (props) => {
  return (
    <div className="checkoutStep" style={{ ...props.style }}>
      <div
        onClick={props.onClick}
        className={`checkoutHeader ${props.active && "active"}`}
      >
        <div>
          <span className="stepNumber" style={{ fontFamily: "Salsa" }}>
            {props.stepNumber}
          </span>
          <span className="stepTitle" style={{ fontFamily: "Salsa" }}>
            {props.title}
          </span>
        </div>
      </div>
      {props.body && props.body}
    </div>
  );
};

const Address = ({
  adr,
  selectAddress,
  enableAddressEditForm,
  confirmDeliveryAddress,
  onAddressSubmit,
  onAddressCancel,
}) => {
  return (
    <div className="flexRow addressContainer">
      <div>
        <input name="address" onClick={() => selectAddress(adr)} type="radio" />
      </div>
      <div className="flexRow sb addressinfo">
        {!adr.edit ? (
          <div style={{ width: "100%" }}>
            <div className="addressDetail">
              <div style={{ fontFamily: "Salsa" }}>
                <span className="addressName">{adr.name}</span>
                <span className="addressType">{adr.addressType}</span>
                <span className="addressMobileNumber">{adr.mobileNumber}</span>
              </div>
              {adr.selected && (
                <Anchor
                  name="EDIT"
                  onClick={() => enableAddressEditForm(adr)}
                  style={{
                    fontWeight: "500",
                    color: "#2874f0",
                  }}
                />
              )}
            </div>
            <div className="fullAddress">
              {adr.address} <br /> {`${adr.state} - ${adr.pinCode}`}
            </div>
            {adr.selected && (
              <Button
                title="DELIVERY HERE"
                onClick={() => confirmDeliveryAddress(adr)}
                style={{
                  width: "200px",
                  margin: "10px 0",
                }}
                className="bg-black w-[250px] mt-4 rounded-full text-white"
              >
                DELIVERY HERE{" "}
              </Button>
            )}
          </div>
        ) : (
          <AddressForm
            withoutLayout={true}
            onSubmitForm={onAddressSubmit}
            onCancelNewAddress={onAddressCancel}
            initialData={adr}
          />
        )}
      </div>
    </div>
  );
};

const CheckoutPage = (props) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const [newAddress, setNewAddress] = useState(false);
  const [address, setAddress] = useState([]);
  const [confirmAddress, setConfirmAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [orderSummary, setOrderSummary] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState(false);
  const [paymentOption, setPaymentOption] = useState(false);
  const [confirmOrder, setConfirmOrder] = useState(false);
  const [paymentType, setPaymentType] = useState("");
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const onAddressSubmit = (addr) => {
    setSelectedAddress(addr);
    setConfirmAddress(true);
    setOrderSummary(true);
  };
  const onAddressCancel = () => {
    setNewAddress(false);
  };

  const selectAddress = (addr) => {
    //console.log(addr);
    const updatedAddress = address.map((adr) =>
      adr._id === addr._id
        ? { ...adr, selected: true }
        : { ...adr, selected: false }
    );
    setAddress(updatedAddress);
  };

  const confirmDeliveryAddress = (addr) => {
    setSelectedAddress(addr);
    setConfirmAddress(true);
    setOrderSummary(true);
  };

  const enableAddressEditForm = (addr) => {
    const updatedAddress = address.map((adr) =>
      adr._id === addr._id ? { ...adr, edit: true } : { ...adr, edit: false }
    );
    setAddress(updatedAddress);
  };

  const userOrderConfirmation = () => {
    setOrderConfirmation(true);
    setOrderSummary(false);
    setPaymentOption(true);
  };
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      document.body.appendChild(script);
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
    });
  }
  async function displayRazorPay(amount, payload) {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("RazorPay SDK Failed!");
      return;
    }
    const __DEV__ = document.domain === "localhost";

    const data = await axiosInstance.post(`/razorpay`, {
      amount: amount,
    });

    var options = {
      key: __DEV__ ? "rzp_test_1uSZtulaxqyohC" : "PRODUCTION_KEY",
      amount: amount,
      currency: data.currency,
      name: "Bazzar",
      description: "Thank You For Shopping.",
      image: { Bazzar },
      order_id: data.id,
      handler: function (response) {
        payload.paymentStatus = "success";
        payload.reciept = response.razorpay_payment_id;
        dispatch(addOrder(payload));
        setConfirmOrder(true);
        navigate("/account/orders");
      },
      cancel: function (response) {
        console.log(response);
      },
      prefill: {
        name: auth.user.firstName + auth.user.lastName,
        email: auth.user.email,
        contact: auth.user.phone ? auth.user.phone : "",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  const onConfirmOrder = async () => {
    const totalAmount = Object.keys(cart.cartItems).reduce(
      (totalPrice, key) => {
        const { price, qty } = cart.cartItems[key];
        return totalPrice + price * qty;
      },
      0
    );
    const items = Object.keys(cart.cartItems).map((key) => ({
      productId: key,
      payablePrice: cart.cartItems[key].price,
      purchasedQty: cart.cartItems[key].qty,
    }));
    const payload = {
      addressId: selectedAddress._id,
      totalAmount,
      items,
      paymentStatus: "pending",
      paymentType,
    };
    if (paymentType === "card") await displayRazorPay(totalAmount, payload);
    else {
      dispatch(addOrder(payload));
      setConfirmOrder(true);
      navigate("/account/orders");
    }
  };

  useEffect(() => {
    auth.authenticate && dispatch(getAddress());
    auth.authenticate && dispatch(getCartItems());
  }, [auth.authenticate]);

  useEffect(() => {
    const address = user.address.map((adr) => ({
      ...adr,
      selected: false,
      edit: false,
    }));
    setAddress(address);
    //user.address.length === 0 && setNewAddress(true);
  }, [user.address]);

  useEffect(() => {
    if (confirmOrder && user.placedOrderId) {
      navigate(`/order_details/${user.placedOrderId}`);
    }
  }, [user.placedOrderId]);

  return (
    <>
      <SEO title="Checkout" />
      <Layout />
      <div className="cartContainer" style={{ alignItems: "flex-start" }}>
        <div className="checkoutContainer">
          {/* check if user logged in or not */}
          {/* <CheckoutStep
            stepNumber={"1"}
            title={"LOGIN"}
            active={!auth.authenticate}
            body={
              auth.authenticate ? (
                <div className="loggedInId">
                  <span
                    style={{
                      fontWeight: 500,
                      fontSize: "16px",
                      fontFamily: "Salsa",
                    }}
                  >
                    {auth.user.fullName}
                  </span>
                  <span
                    style={{
                      margin: "0 5px",
                      fontWeight: 100,
                      fontSize: "14px",
                      fontFamily: "Salsa",
                    }}
                  >
                    {auth.user.email}
                  </span>
                </div>
              ) : (
                <div>
                  <Input label="Email" />
                </div>
              )
            }
          /> */}
          <CheckoutStep
            stepNumber={"1"}
            title={"DELIVERY ADDRESS"}
            active={!confirmAddress && auth.authenticate}
            body={
              <>
                {confirmAddress ? (
                  <div
                    className="stepCompleted"
                    style={{ fontFamily: "Salsa" }}
                  >{`${selectedAddress.name} ${selectedAddress.address} - ${selectedAddress.pinCode}`}</div>
                ) : (
                  address.map((adr) => (
                    <Address
                      selectAddress={selectAddress}
                      enableAddressEditForm={enableAddressEditForm}
                      confirmDeliveryAddress={confirmDeliveryAddress}
                      onAddressSubmit={onAddressSubmit}
                      onCancelNewAddress={onAddressCancel}
                      adr={adr}
                    />
                  ))
                )}
              </>
            }
          />

          {/* AddressForm */}
          {confirmAddress ? null : newAddress ? (
            <AddressForm
              onSubmitForm={onAddressSubmit}
              onCancelNewAddress={onAddressCancel}
            />
          ) : auth.authenticate ? (
            <CheckoutStep
              stepNumber={"+"}
              title={"ADD NEW ADDRESS"}
              active={false}
              onClick={() => setNewAddress(true)}
            />
          ) : null}

          <CheckoutStep
            stepNumber={"2"}
            title={"ORDER SUMMARY"}
            active={orderSummary}
            body={
              orderSummary ? (
                <CartPage onlyCartItems={true} />
              ) : orderConfirmation ? (
                <div className="stepCompleted">
                  {Object.keys(cart.cartItems).length} items
                </div>
              ) : null
            }
          />

          {orderSummary && (
            <Card
              style={{
                margin: "10px 0",
              }}
            >
              <div
                className="flexRow sb"
                style={{
                  padding: "20px",
                  alignItems: "center",
                }}
              >
                <p style={{ fontSize: "12px", fontFamily: "Salsa" }}>
                  Order confirmation email will be sent to{" "}
                  <strong style={{ fontFamily: "Salsa" }}>
                    {auth.user.email}
                  </strong>
                </p>
                <Button
                  title="CONTINUE"
                  onClick={userOrderConfirmation}
                  style={{
                    width: "200px",
                  }}
                  className="bg-black w-[250px] mt-4 rounded-full text-white"
                >
                  CONTINUE
                </Button>
              </div>
            </Card>
          )}

          <CheckoutStep
            stepNumber={"3"}
            title={"PAYMENT OPTIONS"}
            active={paymentOption}
            body={
              paymentOption && (
                <div>
                  <div
                    className="flexRow"
                    style={{
                      alignItems: "center",
                      padding: "20px",
                      gap: "5px",
                    }}
                  >
                    <input
                      type="radio"
                      name="paymentOption"
                      value="cod"
                      onClick={() => {
                        setPaymentType("cod");
                      }}
                    />
                    <div style={{ fontFamily: "Salsa" }}>Cash on delivery</div>
                    <input
                      type="radio"
                      name="paymentOption"
                      value="online"
                      onClick={() => {
                        setPaymentType("card");
                      }}
                    />
                    <div style={{ fontFamily: "Salsa" }}>
                      Credit Card/Debit Card/UPI
                    </div>
                  </div>
                  <Button
                    title="CONFIRM ORDER"
                    onClick={onConfirmOrder}
                    style={{
                      width: "200px",
                      margin: "0 0 20px 20px",
                    }}
                    className="bg-black w-[250px] mt-4 rounded-full text-white"
                  >
                    CONFIRM ORDER
                  </Button>
                </div>
              )
            }
          />
        </div>

        {/* Price Component */}
        {/* <PriceDetails
          totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
            return qty + cart.cartItems[key].qty;
          }, 0)}
          totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
            const { price, qty } = cart.cartItems[key];
            return totalPrice + price * qty;
          }, 0)}
        /> */}
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default CheckoutPage;
