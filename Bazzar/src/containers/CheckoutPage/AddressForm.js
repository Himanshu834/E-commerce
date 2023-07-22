import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "../../actions";
import { Button, Input } from "antd";
import { toast } from "react-toastify";

/**
 * @author
 * @function AddressForm
 **/

const AddressForm = (props) => {
  const { initialData } = props;
  const [name, setName] = useState(initialData ? initialData.name : "");
  const [mobileNumber, setMobileNumber] = useState(
    initialData ? initialData.mobileNumber : ""
  );
  const [pinCode, setPinCode] = useState(
    initialData ? initialData.pinCode : ""
  );
  const [locality, setLocality] = useState(
    initialData ? initialData.locality : ""
  );
  const [address, setAddress] = useState(
    initialData ? initialData.address : ""
  );
  const [cityDistrictTown, setCityDistrictTown] = useState(
    initialData ? initialData.cityDistrictTown : ""
  );
  const [state, setState] = useState(initialData ? initialData.state : "");
  const [landmark, setLandmark] = useState(
    initialData ? initialData.landmark : ""
  );
  const [alternatePhone, setAlternatePhone] = useState(
    initialData ? initialData.alternatePhone : ""
  );
  const [addressType, setAddressType] = useState(
    initialData ? initialData.addressType : ""
  );
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [submitFlag, setSubmitFlag] = useState(false);
  const [id, setId] = useState(initialData ? initialData._id : "");

  const inputContainer = {
    width: "100%",
    marginRight: 10,
  };
  const validateAddress = (payload) => {
    const {
      name,
      mobileNumber,
      pinCode,
      locality,
      address,
      cityDistrictTown,
      state,
      addressType,
    } = payload;
    if (!name || name === "") {
      toast.error("Name is required");
      return false;
    }
    if (
      (!mobileNumber && mobileNumber.length < 10) ||
      mobileNumber === "" ||
      mobileNumber.length > 10
    ) {
      toast.error("Mobile Number is required");
      return false;
    }
    if (!pinCode || pinCode === "") {
      toast.error("Pincode is required");
      return false;
    }
    if (!locality || locality === "") {
      toast.error("Locality is required");
      return false;
    }
    if (!address || address === "") {
      toast.error("Address is required");
      return false;
    }
    if (!cityDistrictTown || cityDistrictTown === "") {
      toast.error("City/District/Town is required");
      return false;
    }
    if (!state || state === "") {
      toast.error("State is required");
      return false;
    }
    if (!addressType || addressType === "") {
      toast.error("Address Type is required");
      return false;
    }
    return true;
  };

  const onAddressSubmit = (e) => {
    const payload = {
      address: {
        name,
        mobileNumber,
        pinCode,
        locality,
        address,
        cityDistrictTown,
        state,
        landmark,
        alternatePhone,
        addressType,
      },
    };
    if (validateAddress(payload.address)) {
      if (id) {
        payload.address._id = id;
      }
      dispatch(addAddress(payload));
      setSubmitFlag(true);
    }
  };

  useEffect(() => {
    console.log("addressCount", user.address);
    if (submitFlag) {
      console.log("where are we", user);
      let _address = {};
      if (id) {
        _address = {
          _id: id,
          name,
          mobileNumber,
          pinCode,
          locality,
          address,
          cityDistrictTown,
          state,
          landmark,
          alternatePhone,
          addressType,
        };
      } else {
        _address = user.address.slice(user.address.length - 1)[0];
      }

      props.onSubmitForm(_address);
    }
  }, [user.address]);

  const renderAddressForm = () => {
    return (
      <>
        <div className="flexRow flex-col sm:flex-row">
          <div style={inputContainer}>
            <label style={{ fontFamily: "Salsa" }}>Name</label>
            <Input
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div style={inputContainer}>
            <label style={{ fontFamily: "Salsa" }}>
              10-digit mobile number
            </label>
            <Input
              placeholder="Enter 10-digit mobile number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>
        </div>
        <div className="flexRow flex-col sm:flex-row">
          <div style={inputContainer}>
            <label style={{ fontFamily: "Salsa" }}>Pincode</label>
            <Input
              placeholder="Enter Pincode"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
            />
          </div>
          <div style={inputContainer}>
            <label style={{ fontFamily: "Salsa" }}>Locality</label>
            <Input
              placeholder="Enter Locality"
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
            />
          </div>
        </div>
        <div className="flexRow flex-col sm:flex-row">
          <div style={inputContainer}>
            <label style={{ fontFamily: "Salsa" }}>Address</label>
            <Input.TextArea
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={2}
            />
          </div>
        </div>

        <div className="flexRow flex-col sm:flex-row">
          <div style={inputContainer}>
            <label style={{ fontFamily: "Salsa" }}>City/District/Town</label>
            <Input
              placeholder="Enter City/District/Town"
              value={cityDistrictTown}
              onChange={(e) => setCityDistrictTown(e.target.value)}
            />
          </div>
          <div style={inputContainer}>
            <label style={{ fontFamily: "Salsa" }}>State</label>
            <Input
              placeholder="Enter State"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
        </div>
        <div className="flexRow flex-col sm:flex-row">
          <div style={inputContainer}>
            <label style={{ fontFamily: "Salsa" }}>Landmark (Optional)</label>
            <Input
              placeholder="Enter Landmark (Optional)"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
            />
          </div>
          <div style={inputContainer}>
            <label style={{ fontFamily: "Salsa" }}>
              {" "}
              Alternate Phone (Optional)
            </label>
            <Input
              placeholder="Enter Alternate Phone (Optional)"
              value={alternatePhone}
              onChange={(e) => setAlternatePhone(e.target.value)}
            />
          </div>
        </div>
        <div style={{ marginTop: "15px" }}>
          <label style={{ fontFamily: "Salsa" }}>Address Type</label>
          <div className="flexRow flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                onClick={() => setAddressType("home")}
                name="addressType"
                value="home"
              />
              <span style={{ fontFamily: "Salsa" }}>Home</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                onClick={() => setAddressType("work")}
                name="addressType"
                value="work"
              />
              <span style={{ fontFamily: "Salsa" }}>Work</span>
            </div>
          </div>
        </div>
        <div className="flexRow">
          <Button
            onClick={() => props.onCancelNewAddress()}
            // style={{
            //   width: "250px",
            //   margin: "20px 0",
            //   bgColor: "black",
            // }}
            className="bg-black w-[250px] mt-4 rounded-full text-white"
          >
            CANCEL
          </Button>
          <Button
            onClick={onAddressSubmit}
            // style={{
            //   width: "250px",
            //   margin: "20px 0",
            //   bgColor: "black",
            // }}
            className="bg-black w-[250px] mt-4 rounded-full text-white"
          >
            SAVE AND DELIVER HERE
          </Button>
        </div>
      </>
    );
  };

  if (props.withoutLayout) {
    return <div>{renderAddressForm()}</div>;
  }

  return (
    <div className="checkoutStep" style={{ background: "#f5faff" }}>
      <div className={`checkoutHeader`}>
        <div>
          <span className="stepNumber">+</span>
          <span className="stepTitle">{"ADD NEW ADDRESS"}</span>
        </div>
      </div>
      <div
        style={{
          padding: "0 60px",
          paddingBottom: "20px",
          boxSizing: "border-box",
        }}
      >
        {renderAddressForm()}
      </div>
    </div>
  );
};

export default AddressForm;
