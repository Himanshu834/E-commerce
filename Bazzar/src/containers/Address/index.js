import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAddress } from "../../actions";
import { getCartItems } from "../../actions/cart.action";
import Layout from "../../components/Layout";
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
 * @function Address
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

const AddressPage = ({
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
                // <Anchor
                //   name="EDIT"
                //   onChange={() => enableAddressEditForm(adr)}
                //   style={{
                //     fontWeight: "500",
                //     color: "#2874f0",
                //   }}
                // />
                <div className="flexRow">
                  <Button
                    onClick={() => enableAddressEditForm(adr)}
                    // style={{
                    //   width: "250px",
                    //   margin: "20px 0",
                    //   bgColor: "black",
                    // }}
                    className="bg-black mt-4 rounded-full text-white"
                  >
                    EDIT
                  </Button>
                </div>
              )}
            </div>
            <div className="fullAddress">
              {adr.address} <br /> {`${adr.state} - ${adr.pinCode}`}
            </div>
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

const Address = (props) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const [newAddress, setNewAddress] = useState(false);
  const [address, setAddress] = useState([]);
  const [confirmAddress, setConfirmAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [orderSummary, setOrderSummary] = useState(false);
  const dispatch = useDispatch();

  const selectAddress = (addr) => {
    //console.log(addr);
    const updatedAddress = address.map((adr) =>
      adr._id === addr._id
        ? { ...adr, selected: true }
        : { ...adr, selected: false }
    );
    setAddress(updatedAddress);
  };
  const onAddressSubmit = (addr) => {
    setSelectedAddress();
    dispatch(getAddress());
    setConfirmAddress(true);
    setOrderSummary(true);
  };
  const onAddressCancel = () => {
    setNewAddress(false);
  };

  const enableAddressEditForm = (addr) => {
    const updatedAddress = address.map((adr) =>
      adr._id === addr._id ? { ...adr, edit: true } : { ...adr, edit: false }
    );
    setAddress(updatedAddress);
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

  return (
    <>
      <SEO title="Address" />
      <Layout />
      <div className="cartContainer" style={{ alignItems: "flex-start" }}>
        <div className="checkoutContainer">
          <CheckoutStep
            stepNumber={"-"}
            title={"DELIVERY ADDRESS"}
            // active={!confirmAddress && auth.authenticate}
            body={
              <>
                {address.map((adr) => (
                  <AddressPage
                    selectAddress={selectAddress}
                    enableAddressEditForm={enableAddressEditForm}
                    // confirmDeliveryAddress={confirmDeliveryAddress}
                    onAddressSubmit={onAddressSubmit}
                    onCancelNewAddress={onAddressCancel}
                    adr={adr}
                  />
                ))}
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
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default Address;
