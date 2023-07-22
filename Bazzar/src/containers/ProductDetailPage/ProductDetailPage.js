import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetailsById, getCategoryDetailsById } from "../../actions";
import Layout from "../../components/Layout/index";
import "./style.css";
import { AddToCart } from "../../actions/cart.action";
import { IoIosArrowForward, IoIosStar, IoMdCart } from "react-icons/io";
import { BiRupee } from "react-icons/bi";
import { AiFillThunderbolt } from "react-icons/ai";
import { Button, Image } from "antd";
import { generatePublicUrl } from "../../urlconfig";
import Footer from "../../components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { Typography } from "antd";
import SEO from "../../components/SEO";
import SimilarItems from "../../components/SimilarItems";
function ProductDetailPage(props) {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const params = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = React.useState(0);

  useEffect(() => {
    const { productId } = params;
    const payload = {
      params: {
        productId,
      },
    };
    dispatch(getProductDetailsById(payload));
    console.log(Object.keys(product.productDetails));
  }, []);

  if (Object.keys(product.productDetails).length === 0) {
    return null;
  }
  return (
    <>
      <SEO title={product.productDetails.name} />
      <Layout />
      <div
        className="productDescriptionContainer flex flex-col md:flex-row
        w-full md:w-[81.5%] gap-4 ml-0
      "
      >
        <div className="flexRow flex flex-col-reverse md:flex-row mb-4">
          <div className="flex flex-row md:flex-col">
            {product.productDetails.productPictures.map((picture, index) => (
              <div className="thumbnail">
                <img
                  onClick={() => setSelectedImage(index)}
                  className={index === selectedImage ? "active" : ""}
                  src={generatePublicUrl(picture.img)}
                  alt={picture.img}
                />
              </div>
            ))}
          </div>
          <div
            className="
                w-[100%] md:w-[530px] h-[497px] ml-0 md:ml-[5px]
            "
          >
            <div className="productDesImgContainer">
              <Image
                className="img"
                src={generatePublicUrl(
                  product.productDetails.productPictures[selectedImage].img
                )}
                alt={`${product.productDetails.productPictures[selectedImage].img}`}
                preview={false}
              />
            </div>
            <div className="flex flex-row justify-between mt-20">
              {/* <Button
                title="ADD TO CART"
                bgColor="white"
                textColor="black"
                style={{
                  marginRight: "5px",
                }}
                icon={<IoMdCart />}
                onClick={() => {
                  const { _id, name, price } = product.productDetails;
                  const img = product.productDetails.productPictures[0].img;
                  dispatch(AddToCart({ _id, name, price, img }));
                  props.history.push("/cart");
                }}
              /> */}
              {/* <Button
                title="BUY NOW"
                bgColor="black"
                textColor="white"
                style={{
                  marginLeft: "5px",
                }}
                icon={<AiFillThunderbolt />}
                onClick={() => {
                  const { _id, name, price } = product.productDetails;
                  const img = product.productDetails.productPictures[0].img;
                  dispatch(AddToCart({ _id, name, price, img }));
                  props.history.push("/cart");
                }}
              /> */}
            </div>
          </div>
        </div>

        <div className="breed">
          {/* product description */}
          <div className="productDetails">
            <p className="productTitle">{product.productDetails.name}</p>
            <div>
              <span className="ratingCount">
                <span className="flex flex-row items-center justify-center">
                  4.3 <IoIosStar />
                </span>
              </span>
              <span className="ratingNumbersReviews">
                72,234 Ratings & 8,140 Reviews
              </span>
            </div>
            {product.productDetails.discount && (
              <div className="extraOffer ">
                Extra <BiRupee />
                {(product.productDetails.discount *
                  product.productDetails.price) /
                  100}{" "}
                off{" "}
              </div>
            )}
            <div className="flexRow priceContainer">
              <span className="price">
                <BiRupee />
                {product.productDetails?.discount
                  ? product.productDetails.price -
                    (product.productDetails.discount *
                      product.productDetails.price) /
                      100
                  : product.productDetails.price}
              </span>
              {product.productDetails?.discount && (
                <span
                  className="discount flex gap-2 items-center"
                  style={{ margin: "0 10px" }}
                >
                  <Typography.Text delete className="flex items-center">
                    &#8377;{product.productDetails.price}
                  </Typography.Text>
                  {product.productDetails?.discount}% off
                </span>
              )}
              {/* <span>i</span> */}
            </div>
            <div>
              {/* <p
                style={{
                  color: "#212121",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                Available Offers
              </p> */}
              <p style={{ display: "flex" }}>
                <span
                  style={{
                    fontFamily: "Salsa",
                    width: "100px",
                    fontSize: "16px",
                    color: "#878787",
                    fontWeight: "600",
                    marginRight: "20px",
                    marginTop: "10px",
                  }}
                >
                  Description
                </span>
                <span
                  style={{
                    fontFamily: "Salsa",
                    fontSize: "16px",
                    color: "#212121",
                    marginTop: "10px",
                    whiteSpace: "pre-line",
                  }}
                >
                  {product.productDetails.description}
                </span>
              </p>
            </div>
            <Button
              type="primary"
              className="w-full bg-black text-white flex mt-10 
                  text-xl items-center justify-center gap-4
                  float-bottom
              "
              icon={<IoMdCart />}
              onClick={() => {
                const { _id, name, price } = product.productDetails;
                const img = product.productDetails.productPictures[0].img;
                dispatch(AddToCart({ _id, name, price, img }));
                navigate("/cart");
              }}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
      <SimilarItems
        price={product.productDetails.price}
        productId={product.productDetails._id}
        title="Related Products"
      />
      <Footer />
    </>
  );
}

export default ProductDetailPage;
