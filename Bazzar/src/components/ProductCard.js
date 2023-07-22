import { Card } from "antd";
import React from "react";
import { formatter } from "./helper";

const ProductCard = ({
  imgUrl,
  id,
  desc,
  name,
  price,
  discount_percentage,
  MRP,
  onClick,
}) => {
  // console.log("ProductCard -> imgUrl", imgUrl);
  const [name1, setName1] = React.useState(name.slice(0, 30));
  return (
    <div
      className="w-[146px] h-[295px] hover:shadow-lg cursor-pointer bg-white rounded-md"
      onClick={onClick}
    >
      <img
        src={imgUrl}
        alt=""
        className="w-full h-[206.3px] object-cover rounded-md"
      />
      <div className="m-2 mt-1">
        <h1 className="text-[14px] letter-spacing-[1px] font-medium">
          {name1}
          {name.length > 30 ? "..." : ""}
        </h1>
        <p className="text-[12px] opacity-[50%] font-bold flex gap-1">
          MRP
          {MRP ? (
            <span className="line-through text-[10px] opacity-[90%] font-bold font-sans">
              {formatter.format(MRP)}
            </span>
          ) : (
            ""
          )}
          {discount_percentage ? (
            <span className="text-[10px] opacity-[90%] font-bold font-sans text-[#ff3d00]">
              ({discount_percentage}% off)
            </span>
          ) : (
            ""
          )}
        </p>
        <h1 className="text-[13px] font-sans">{formatter.format(price)} </h1>
      </div>
    </div>
  );
};
export default ProductCard;
