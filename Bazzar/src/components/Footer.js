import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigator = useNavigate();
  return (
    <div className="mt-auto h-max">
      <div className="bg-white shadow-lg float-bottom">
        <div className="max-w-7xl mx-auto p-4 px-4 sm:px-6 lg:px-8 flex flex-col gap-2">
          <ul className="hidden md:flex justify-center space-x-6">
            <li>
              <div
                className="flex gap-2 items-center justify-center cursor-pointer hover:opacity-50"
                onClick={() => navigator("/about")}
              >
                {/* <BsInfoCircle  /> */}
                <span className="text-center">About Us</span>
              </div>
            </li>
            <li>
              <div
                className="flex gap-2 items-center justify-center cursor-pointer hover:opacity-50"
                onClick={() => navigator("/terms-of-service")}
              >
                {/* <BsInfoCircle  /> */}
                <span className="text-center">Terms of Service</span>
              </div>
            </li>
            <li>
              <div
                className="flex gap-2 items-center justify-center cursor-pointer hover:opacity-50"
                onClick={() => navigator("/refund-policy")}
              >
                {/* <BsInfoCircle  /> */}
                <span className="text-center">Refund Policy</span>
              </div>
            </li>
          </ul>
          <div className="flex justify-center space-x-6">
            Copyright @ 2023 Bazzar. All Rights Reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
