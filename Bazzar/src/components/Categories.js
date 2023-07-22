import React from "react";
import { Drawer, List, Menu } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { BiCategoryAlt } from "react-icons/bi";
import { BsInfo } from "react-icons/bs";
import { AiOutlinePhone } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../actions";

const Categories = ({ _this }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedCategory, setSelectedCategory] = React.useState(id);
  const categories = useSelector((state) => state.category);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  React.useEffect(() => {
    setSelectedCategory(id);
  }, [id]);
  const renderCategories = (categories) => {
    let mycategories = [];
    for (let category of categories) {
      mycategories.push({
        label: category.name,
        key: category._id,
        onClick: () => {
          if (category.children.length === 0) {
            window.location.href = `/${category.slug}?cid=${category._id}&type=${category.type}`;
            setSelectedCategory(category._id);
          }
        },
        children:
          category.children.length > 0
            ? renderCategories(category.children)
            : null,
        // active: category._id === selectedCategory ? true : false,
      });
    }
    return mycategories;
  };
  return (
    <div className="hidden lg:flex items-center h-15 bg-primary">
      {/* <ul className="flex flex-col lg:flex-row gap-4 justify-between items-center my-1 mx-auto">
        {categories.categories.length &&
          categories.categories.map((category) => {
            return (
              <li
                onClick={() => _this.navigator(`/category/${category.id}`)}
                key={category.id}
                className={`${
                  selectedCategory === category.id
                    ? "underline"
                    : "text-black hover:opacity-75"
                } cursor-pointer px-1 py-2 flex items-center text-[12px] tracking-wide font-sans uppercase font-bold leading-snug `}
              >
                {category.name}
              </li>
            );
          })}
      </ul> */}
      <Drawer
        placement={"left"}
        width={250}
        onClose={() => _this.setNavbarOpen(false)}
        open={_this.navbarOpen}
        extra={null}
        title={
          <span
            onClick={() => _this.navigator("/")}
            className="cursor-pointer hover:opacity-70 flex gap-2 items-center"
          >
            <span className="md:-ml-2 text-xl text-center">Bazzar</span>
          </span>
        }
      >
        {/* <List
          header={null}
          footer={null}
          className="w-full"
          size="large"
          dataSource={[...categories]}
          renderItem={(item) => (
            <List.Item
              onClick={() => _this.navigator(`/category/${item.id}`)}
              className={`${
                selectedCategory === item.id
                  ? "underline"
                  : " text-black  hover:opacity-75"
              } cursor-pointer px-1 py-2 flex items-center text-xs uppercase font-bold leading-snug`}
            >
              {item.name}
            </List.Item>
          )}
        />{" "} */}
        <Menu
          mode="inline"
          items={[
            {
              key: "categories",
              icon: <BiCategoryAlt />,
              label: "Categories",
              children: renderCategories(categories.categories),
            },
            {
              key: "About Us",
              label: "About Us",
              onClick: () => _this.navigator("/about"),
              icon: <BsInfo />,
            },
            // {
            //   key: "Contact Us",
            //   label: "Contact Us",
            //   onClick: () => _this.navigator("/contact"),
            //   icon: <AiOutlinePhone />,
            // },
            {
              key: "Terms",
              label: "Terms of Service",
              onClick: () => _this.navigator("/terms-of-service"),
              // icon: <BsInfo />,
            },
            {
              key: "Refund Policy",
              label: "Refund Policy",
              onClick: () => _this.navigator("/refund-policy"),
              // icon: <BsInfo />,
            },
          ]}
          className="-mx-8 w-[250px] border-none"
        />
        {/* <Affix offsetBottom={10}>
          <div className="flex flex-col items-center text-center bg-primary ">
            <QRCode value="https://www.techmedd.com/" bordered={false} />
            <div>Scan to visit our website</div>
          </div>
        </Affix> */}
      </Drawer>
    </div>
  );
};

export default Categories;
