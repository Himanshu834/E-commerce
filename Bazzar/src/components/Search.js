import { Input } from "antd";
import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [search, setSearch] = useState("");
  const navigator = useNavigate();

  const { search: searchQuery } = window.location;
  const query = new URLSearchParams(searchQuery).get("search");
  useEffect(() => {
    setSearch(query || "");
  }, [searchQuery]);

  const handleSearch = (value) => {
    setSearch(value);
  };

  const handleSearchSubmit = () => {
    if (search.length < 1) return;
    navigator(`/search?search=${search}`);
  };
  return (
    <div className="flex items-center w-full">
      <Input
        prefix={
          <AiOutlineSearch size={20} className="text-gray-600 opacity-75" />
        }
        className="hidden md:flex rounded-full w-full sm:w-[200px] md:w-[400px] lg:w-[500px] px-2 py-0 md:px-4 md:py-2 outline-none focus:shadow-outline"
        type="text"
        value={search}
        placeholder="Search for products, categories and brands"
        // onClick={navigator("/search")}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        onBlur={handleSearchSubmit}
        onPressEnter={handleSearchSubmit}
      />
      <AiOutlineSearch
        className="md:text-[25px] text-[20px] md:hidden"
        onClick={() => {
          navigator("/search");
        }}
      />
    </div>
  );
};

export default Search;
