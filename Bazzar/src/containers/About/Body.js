import { Card, Divider, Form, Image } from "antd";
import React from "react";
const Body = ({ _this }) => {
  return (
    <div className="flex min-h-screen justify-center p-0 lg:p-4">
      <div className="h-max flex w-full md:w-[60%] lg:w-[70%]">
        <Card
          className="h-max w-full"
          title={
            <div className="text-center text-[24px] font-extrabold">
              About Us
            </div>
          }
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="text-[20px] font-extrabold">Gourav Kumar</div>
              <div className="text-[14px] font-bold text-gray-600">Roll No: 10800119095</div>
              <div className="text-[14px] font-bold text-gray-600">
                Computer Science and Engineering
              </div>
              <div className="text-[14px] font-bold text-gray-600">
                Asansol Engineering College
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {/* <div className="text-[14px] font-extrabold">GSTIN:</div>
              <div>08EVPPS5907C1Z5</div> */}
            </div>
          </div>
          <Divider />
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="text-[20px] font-extrabold">Keshav Kumar</div>
              <div className="text-[14px] font-bold text-gray-600">Roll No: 10800119083</div>
              <div className="text-[14px] font-bold text-gray-600">
                Computer Science and Engineering
              </div>
              <div className="text-[14px] font-bold text-gray-600">
                Asansol Engineering College
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {/* <div className="text-[14px] font-extrabold">GSTIN:</div>
              <div>08EVPPS5907C1Z5</div> */}
            </div>
          </div>
          <Divider />
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="text-[20px] font-extrabold">Himanshu Kumar</div>
              <div className="text-[14px] font-bold text-gray-600">Roll No: 10800119093</div>
              <div className="text-[14px] font-bold text-gray-600">
                Computer Science and Engineering
              </div>
              <div className="text-[14px] font-bold text-gray-600">
                Asansol Engineering College
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {/* <div className="text-[14px] font-extrabold">GSTIN:</div>
              <div>08EVPPS5907C1Z5</div> */}
            </div>
          </div>
          <Divider />
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="text-[20px] font-extrabold">Shubham Kumar</div>
              <div className="text-[14px] font-bold text-gray-600">Roll No: 10800119094</div>
              <div className="text-[14px] font-bold text-gray-600">
                Computer Science and Engineering
              </div>
              <div className="text-[14px] font-bold text-gray-600">
                Asansol Engineering College
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {/* <div className="text-[14px] font-extrabold">GSTIN:</div>
              <div>08EVPPS5907C1Z5</div> */}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Body;
