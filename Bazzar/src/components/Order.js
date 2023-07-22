import { Card, Image } from "antd";
import React from "react";
const { Meta } = Card;

const Order = ({ img, title, description, price }) => {
  return (
    <div className="w-full h-[8rem] flex items-center justify-center">
      <Card className="lg:w-[50%] md:w-[70%] w-[90%] h-full" hoverable>
        <div className="h-full flex items-center gap-2 md:gap-4 justify-between">
          <div className="h-full flex items-center justify-center gap-4">
            <Image width={80} src={img} preview={false} />
            <Meta title={title} description={description} />
          </div>
          <Meta title={price} />
        </div>
      </Card>
    </div>
  );
};

export default Order;
