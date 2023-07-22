import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import CartIcon from "./CartIcon";
import Login from "./Login";
import Search from "./Search";
import Categories from "./Categories";
import { Divider } from "antd";
import { useSelector } from "react-redux";

export default function Header({ fixed }) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const user = useSelector((state) => state.auth);
  const navigator = useNavigate();

  return (
    <div className=" h-[1rem] z-50 mb-[4rem] sm:mb-0">
      <div className="w-full shadow-lg">
        <div className=" flex flex-wrap items-center justify-between w-full px-2 py-3 navbar-expand-lg bg-white ">
          <div className="container px-4 mx-auto flex items-center justify-between">
            <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start uppercase">
              <div className="flex items-center gap-2 text-gray-800  text-sm lg:text-xl font-bold leading-relaxed mr-4 py-2 whitespace-nowrap uppercase">
                <span
                  onClick={() => setNavbarOpen(true)}
                  className="lg:hidden cursor-pointer hover:opacity-70"
                >
                  <GiHamburgerMenu size={20} />
                </span>
                <span
                  onClick={() => navigator("/")}
                  className="cursor-pointer hover:opacity-70 flex gap-2 items-center"
                >
                  <h1 className="text-xl font-bold text-black">Bazzar</h1>
                </span>
              </div>
            </div>
            <div
              className="lg:flex flex-grow items-center"
              id="example-navbar-info"
            >
              <ul className="flex lg:flex-row list-none ml-auto gap-1 md:gap-4">
                <li className="nav-item">
                  <div className="w-full cursor-pointer px-1 py-2 flex items-center text-xs uppercase font-bold leading-snug text-gray-600 hover:opacity-75">
                    <span className="w-full inline-block ">
                      <Search />
                    </span>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="cursor-pointer px-1 py-2 flex items-center text-xs uppercase font-bold leading-snug text-gray-600 hover:opacity-75">
                    <Login />
                  </div>
                </li>
                <li className="nav-item">
                  <div className="cursor-pointer px-1 py-2 flex items-center text-xs uppercase font-bold leading-snug text-gray-600 hover:opacity-75">
                    <CartIcon />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Categories
          _this={{
            setNavbarOpen,
            navbarOpen,
            user,
            navigator,
          }}
        />
      </div>
    </div>
  );
}
