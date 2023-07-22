import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Footer, Header } from "../../components";
import Body from "./Body";

import { useLocation, useNavigate } from "react-router-dom";
import SEO from "../../components/SEO";
import Layout from "../../components/Layout";
import { fetchProductsBySearch } from "../../actions";

const Search = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigator = useNavigate();
  const product = useSelector((state) => state.product);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    const query = new URLSearchParams(location.search).get("search");
    setSearchValue(query || "");
  }, [location.search]);
  useEffect(() => {
    if (searchValue.length < 1) return;
    dispatch(fetchProductsBySearch(searchValue));
  }, [searchValue]);

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  return (
    <>
      <SEO
        title={
          product.products.length > 0
            ? `Search Result for ${searchValue}`
            : "No Result Found"
        }
        description={
          data.length > 0
            ? `Search Result for ${searchValue}`
            : "No Result Found"
        }
        keywords={`${searchValue}`}
      />
      <Layout />
      <Body
        _this={{
          data,
          searchValue,
          handleSearch,
          navigator,
          product,
        }}
      />
      <Footer />
    </>
  );
};

export default Search;
