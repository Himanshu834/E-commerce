import { Card, Form, Image } from "antd";
import React from "react";
import { EditOutlined } from "@ant-design/icons";
const Body = ({ _this }) => {
  return (
    <div className="flex min-h-screen justify-center p-0 lg:p-4 w-full">
      <div className="h-max flex w-full md:w-[60%] lg:w-[70%] items-center">
        <Card
          className="h-max"
          title={
            <div className="text-center text-[24px] font-extrabold">
              Contact Us
            </div>
          }
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <div className="text-[16px] font-extrabold">Call us at :</div>
              <a href="tel:+91 8340449289">+91 8340449289</a>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-[16px] font-extrabold">Email us at :</div>
              <a href="mailto:gouravbksc1@gmail.com">gouravbksc1@gmail.com</a>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Body;
