import { Modal, Form, Input, Checkbox, Button, Dropdown } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { VscAccount } from "react-icons/vsc";
import { useEffect, useState } from "react";

const Body = ({ _this }) => {
  const [items, setItems] = useState(_this.items);
  useEffect(() => {
    setItems(_this.items);
  }, [_this.items]);
  return (
    <Dropdown
      menu={{ items }}
      placement="bottom"
      arrow={{
        pointAtCenter: true,
      }}
    >
      <div className="flex items-center">
        <span className="flex items-center flex-col">
          <VscAccount className="lg:text-[25px] text-[20px]" />
          <span className="hidden md:block">Profile</span>
        </span>
        <Modal
          title={
            <div className="w-full text-center">
              {_this.loginPage === "login"
                ? "Login"
                : _this.loginPage === "signup"
                ? "Signup"
                : "Change Password"}
            </div>
          }
          open={_this.visible}
          centered
          onCancel={_this.handleCancel}
          footer={null}
        >
          {_this.loginPage === "login" ? (
            <Login _this={_this} />
          ) : _this.loginPage === "signup" ? (
            <Signup _this={_this} />
          ) : (
            <ChangePassword _this={_this} />
          )}
        </Modal>
      </div>
    </Dropdown>
  );
};
export default Body;

const Login = ({ _this }) => {
  return (
    <Form
      name="login"
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      layout="vertical"
      form={_this.loginForm}
      onFinish={_this.handleSubmit}
      autoComplete="off"
      scrollToFirstError
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <div
          className="float-right text-pink-600 cursor-pointer"
          onClick={() => _this.handleFormChange("forgotpassword")}
        >
          Forgot password
        </div>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="
tracking-wide text-white flex items-center justify-center rounded-full bg-black
        hover:bg-white hover:text-black hover:border-black border-black hover:shadow-lg
        transition duration-500 ease-in-out h-[35px] w-full"
        >
          Log in
        </Button>
        Or{" "}
        <span
          className="text-pink-600 cursor-pointer"
          onClick={() => _this.handleFormChange("signup")}
        >
          register now!
        </span>
      </Form.Item>
    </Form>
  );
};

const Signup = ({ _this }) => {
  return (
    <Form
      name="signup"
      layout="vertical"
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      form={_this.signupForm}
      onFinish={_this.handleSubmit}
      // onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        name="firstName"
        label="First Name"
        rules={[
          {
            required: true,
            message: "Please input your First Name!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="lastName"
        label="Last Name"
        rules={[
          {
            required: true,
            message: "Please input your Last Name!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      {/* <Form.Item
        name="phone"
        label="Phone Number"
        rules={[
          {
            len: 10,
            message: "Please input valid phone number!",
          },
          {
            required: true,
            message: "Please input your phone number!",
          },
        ]}
      >
        <Input
          // addonBefore={prefixSelector}
          style={{
            width: "100%",
          }}
        />
      </Form.Item> */}

      {/* <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(new Error("Should accept agreement")),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          I have read the <a href="">agreement</a>
        </Checkbox> 
      </Form.Item> */}
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="
tracking-wide text-white flex items-center justify-center rounded-full bg-black hover:shadow-lg
        transition duration-500 ease-in-out h-[35px] w-full"
        >
          Sign up
        </Button>
        Or
        <span
          className="text-pink-600 cursor-pointer"
          onClick={() => {
            _this.handleFormChange("login");
          }}
        >
          Already have an account!
        </span>
      </Form.Item>
    </Form>
  );
};
const ChangePassword = ({ _this }) => {
  return (
    <Form
      name="changePassword"
      layout="vertical"
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      form={_this.changePasswordForm}
      onFinish={_this.handleChangePasswordSubmit}
      // onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="
tracking-wide text-white flex items-center justify-center rounded-full bg-black
        hover:bg-white hover:text-black hover:border-black border-black hover:shadow-lg
        transition duration-500 ease-in-out h-[35px] w-full"
        >
          Send Link
        </Button>
      </Form.Item>
    </Form>
  );
};
