import { Card, Form, Image } from "antd";
import React from "react";
import { EditOutlined } from "@ant-design/icons";
const Body = ({ _this }) => {
  return (
    <div className="flex min-h-screen justify-center p-0 lg:p-4">
      <div className="h-max flex w-auto md:w-[60%] lg:w-[70%] items-center">
        <Card
          className="h-max"
          title={
            <div className="text-center text-[24px] font-extrabold">
              Return Policy
            </div>
          }
        >
          <div className="flex flex-col gap-4">
            <div>
              Given the nature of our products, we have a non-refund policy.
              Which means that we do not accept returns or exchanges.
            </div>
            <div className="text-[14px] font-extrabold">Damages and issues</div>
            <div>
              Please inspect your order upon reception and contact us
              immediately at gouravbksc1@gmail.com if the item is defective,
              damaged or if you receive the wrong item, so that we can evaluate
              the issue and make it right. Kindly raise an issue with photos of
              the damaged product, along with invoice and shipping label.
            </div>
            <div className="text-[14px] font-extrabold">Refunds</div>
            <div>
              We will notify you once we’ve received and inspected your return,
              and let you know if the refund was approved or not. If approved,
              you’ll be automatically refunded on your original payment method.
              Please remember it can take some time for your bank or credit card
              company to process and post the refund too.
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Body;
