import { Form } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
// import {
//   loadingStart,
//   loadingStop,
//   login,
//   logout,
//   signup,
// } from "../../redux/action";
import Body from "./Body";
import { useNavigate } from "react-router-dom";
import { login, signout, signup, forgotPassword } from "../../actions";

const Index = () => {
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  // This arrangement can be altered based on how we want the date's format to appear.
  let currentDate = `${day}-${month}-${year}`;
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const [changePasswordForm] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [signupForm] = Form.useForm();
  const [loginForm] = Form.useForm();
  const [loginPage, setLoginPage] = useState("login");
  const userData = useSelector((state) => state.auth);
  const itemsBeforeLogin = [
    {
      key: "1",
      label: (
        <div
          className="cursor-pointer hover:opacity-70"
          onClick={() => showModal()}
        >
          Login
        </div>
      ),
    },
  ];
  const itemsAfterLogin = [
    {
      key: "0",
      type: "group",
      label: (
        <div
          className="flex flex-col "
          // onClick={() => navigator("/")}
        >
          <div className="text-xs text-black">Welcome,</div>
          <div className="text-md text-black text-bold">
            {userData?.user?.firstName + " " + userData?.user?.lastName}
          </div>
        </div>
      ),
      children: [
        //   {
        //     key: "1",
        //     label: (
        //       <div
        //         className="cursor-pointer hover:opacity-70"
        //         onClick={() => navigator("/profile")}
        //       >
        //         Profile
        //       </div>
        //     ),
        //   },
        {
          key: "2",
          label: (
            <div
              className="cursor-pointer hover:opacity-70"
              onClick={() => navigator("/account/orders")}
            >
              Orders
            </div>
          ),
        },
        {
          key: "4",
          label: (
            <div
              className="cursor-pointer hover:opacity-70"
              onClick={() => navigator("/address")}
            >
              Address
            </div>
          ),
        },
        {
          key: "3",
          label: (
            <div
              className="cursor-pointer hover:opacity-70"
              onClick={() => handleLogout()}
            >
              Logout
            </div>
          ),
        },
      ],
    },
  ];
  const [items, setItems] = useState(
    userData.authenticate ? itemsAfterLogin : itemsBeforeLogin
  );

  useEffect(() => {
    if (userData.authenticate) {
      setItems(itemsAfterLogin);
    } else {
      setItems(itemsBeforeLogin);
    }
    if (userData.message) {
      toast.success(userData.message);
    }
    if (userData.error) {
      toast.error(userData.error);
    }
  }, [userData]);

  const showModal = () => {
    setVisible(true);
  };

  const handleSubmit = (values) => {
    setVisible(false);
    if (loginPage === "signup") {
      dispatch(
        signup({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
        })
      );
      signupForm.resetFields();
      setLoginPage(true);
    } else {
      dispatch(
        login({
          email: values.email,
          password: values.password,
        })
      );
      loginForm.resetFields();
    }
  };

  const handleCancel = () => {
    if (loginPage === "login") {
      setVisible(false);
      loginForm.resetFields();
    } else if (loginPage === "signup") {
      setVisible(false);
      signupForm.resetFields();
    } else {
      setVisible(false);
      changePasswordForm.resetFields();
    }
    setLoginPage("login");
  };
  const handleFormChange = (value) => {
    setLoginPage(value);
  };
  const handleLogout = () => {
    dispatch(signout());
    setItems(itemsBeforeLogin);
  };
  const handleChangePasswordSubmit = (values) => {
    dispatch(forgotPassword(values.email));
    setLoginPage("login");
  };
  return (
    <>
      {/* <Header /> */}
      <Body
        _this={{
          visible,
          showModal,
          loginForm,
          handleSubmit,
          handleCancel,
          loginPage,
          setLoginPage,
          signupForm,
          handleFormChange,
          userData,
          items,
          changePasswordForm,
          handleChangePasswordSubmit,
        }}
      />
    </>
  );
};

export default Index;
