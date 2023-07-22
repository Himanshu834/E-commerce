import { Button, Card, Form, Image, Input } from "antd";
import React from "react";
import { EditOutlined } from "@ant-design/icons";
const Body = ({ _this }) => {
  return (
    <>
      <div className="flexRow flex-col sm:flex-row">
        <div
          style={{
            width: "100%",
            marginRight: 10,
          }}
        >
          <label style={{ fontFamily: "Salsa" }}>Name</label>
          <Input
            placeholder="Enter First Name"
            // value={name}
            // onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div
          style={{
            width: "100%",
            marginRight: 10,
          }}
        >
          <label style={{ fontFamily: "Salsa" }}>10-digit mobile number</label>
          <Input
            placeholder="Enter 10-digit mobile number"
            // value={mobileNumber}
            // onChange={(e) => setMobileNumber(e.target.value)}
          />
        </div>
      </div>
      <div className="flexRow flex-col sm:flex-row">
        <div
          style={{
            width: "100%",
            marginRight: 10,
          }}
        >
          <label style={{ fontFamily: "Salsa" }}>Pincode</label>
          <Input
            placeholder="Enter Pincode"
            // value={pinCode}
            // onChange={(e) => setPinCode(e.target.value)}
          />
        </div>
        <div
          style={{
            width: "100%",
            marginRight: 10,
          }}
        >
          <label style={{ fontFamily: "Salsa" }}>Locality</label>
          <Input
            placeholder="Enter Locality"
            // value={locality}
            // onChange={(e) => setLocality(e.target.value)}
          />
        </div>
      </div>
      <div className="flexRow flex-col sm:flex-row">
        <div
          style={{
            width: "100%",
            marginRight: 10,
          }}
        >
          <label style={{ fontFamily: "Salsa" }}>Address</label>
          <Input.TextArea
            placeholder="Enter Address"
            // value={address}
            // onChange={(e) => setAddress(e.target.value)}
            rows={2}
          />
        </div>
      </div>

      <div className="flexRow flex-col sm:flex-row">
        <div
          style={{
            width: "100%",
            marginRight: 10,
          }}
        >
          <label style={{ fontFamily: "Salsa" }}>City/District/Town</label>
          <Input
            placeholder="Enter City/District/Town"
            // value={cityDistrictTown}
            // onChange={(e) => setCityDistrictTown(e.target.value)}
          />
        </div>
        <div
          style={{
            width: "100%",
            marginRight: 10,
          }}
        >
          <label style={{ fontFamily: "Salsa" }}>State</label>
          <Input
            placeholder="Enter State"
            // value={state}
            // onChange={(e) => setState(e.target.value)}
          />
        </div>
      </div>
      <div className="flexRow flex-col sm:flex-row">
        <div
          style={{
            width: "100%",
            marginRight: 10,
          }}
        >
          <label style={{ fontFamily: "Salsa" }}>Landmark (Optional)</label>
          <Input
            placeholder="Enter Landmark (Optional)"
            // value={landmark}
            // onChange={(e) => setLandmark(e.target.value)}
          />
        </div>
        <div
          style={{
            width: "100%",
            marginRight: 10,
          }}
        >
          <label style={{ fontFamily: "Salsa" }}>
            {" "}
            Alternate Phone (Optional)
          </label>
          <Input
            placeholder="Enter Alternate Phone (Optional)"
            // value={alternatePhone}
            // onChange={(e) => setAlternatePhone(e.target.value)}
          />
        </div>
      </div>
      <div style={{ marginTop: "15px" }}>
        <label style={{ fontFamily: "Salsa" }}>Address Type</label>
        <div className="flexRow flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-2">
            <input
              type="radio"
              // onClick={() => setAddressType("home")}
              name="addressType"
              // value="home"
            />
            <span style={{ fontFamily: "Salsa" }}>Home</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              // onClick={() => setAddressType("work")}
              name="addressType"
              // value="work"
            />
            <span style={{ fontFamily: "Salsa" }}>Work</span>
          </div>
        </div>
      </div>
      <div className="flexRow">
        <Button
          // onClick={() => props.onCancelNewAddress()}
          // style={{
          //   width: "250px",
          //   margin: "20px 0",
          //   bgColor: "black",
          // }}
          className="bg-black mt-4 rounded-full text-white"
        >
          CANCEL
        </Button>
        <Button
          // onClick={onAddressSubmit}
          // style={{
          //   width: "250px",
          //   margin: "20px 0",
          //   bgColor: "black",
          // }}
          className="bg-black mt-4 ml-4 rounded-full text-white"
        >
          SAVE
        </Button>
      </div>
    </>
  );
};

export default Body;
