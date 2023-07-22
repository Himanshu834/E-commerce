import { Card, Empty, Input, List, Space } from "antd";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { generatePublicUrl } from "../../urlconfig";
import "../../containers/ProductListPage/ClothingAndAccessories/style.css";
import { Link } from "react-router-dom";

const Body = ({ _this }) => {
  return (
    <div className="flex flex-col mt-10 lg:mt-20 p-2 lg:p-4">
      <div className="flex md:hidden m-2">
        <Input
          prefix={
            <AiOutlineSearch size={20} className="text-gray-600 opacity-75" />
          }
          className="flex rounded-full w-full px-4 py-2 outline-none focus:shadow-outline"
          type="text"
          value={_this.searchValue}
          placeholder="Search for products, categories and brands"
          // onClick={navigator("/search")}
          onChange={(e) => {
            _this.handleSearch(e.target.value);
          }}
          onBlur={(e) => {
            _this.handleSearch(e.target.value);
          }}
          onPressEnter={(e) => {
            _this.handleSearch(e.target.value);
          }}
        />
      </div>
      {_this.product.products.length > 0 ? (
        <Card>
          <div className="grid">
            {_this.product.products.map((product) => {
              return (
                <Link
                  className="caContainer"
                  to={`/${product.slug}/${product._id}`}
                >
                  <div className="caImgContainer">
                    <img
                      src={generatePublicUrl(product?.productPictures[0]?.img)}
                      alt={product.name}
                    />
                  </div>
                  <div>
                    <div className="caProductName">{product.name}</div>
                    <div className="caProductPrice">
                      &#8377;
                      {product.price}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </Card>
      ) : (
        <div className="flex min-h-screen justify-center">
          <div className="flex h-max w-auto items-center">
            <Empty
              description={
                <span className="text-gray-600 opacity-75">
                  No results found
                </span>
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Body;
