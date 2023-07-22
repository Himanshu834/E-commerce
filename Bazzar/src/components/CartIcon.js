import { Badge } from "antd";
import React from "react";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { getCartItems } from "../actions/cart.action";
import { useDispatch, useSelector } from "react-redux";
const CartIcon = () => {
  const navigator = useNavigate();
  const [itemCount, setItemCount] = React.useState(0);
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  React.useEffect(() => {
    getData();
  }, []);
  React.useEffect(() => {
    setItemCount(cart.cartItems.length);
  }, [cart.cartItems]);

  const getData = () => {
    if (auth.authenticate) {
      dispatch(getCartItems());
    }
  };

  return (
    <div className="flex items-center" onClick={() => navigator("/cart")}>
      <Badge
        dot={itemCount > 0}
        className="cursor-pointer flex items-center text-xs uppercase font-bold leading-snug text-gray-600 hover:opacity-75"
      >
        <span className="flex items-center flex-col">
          <HiOutlineShoppingBag className="lg:text-[25px] text-[20px]" />
          <span className="hidden md:block">Cart</span>
        </span>
      </Badge>
      {/* {itemCount > 0 && (
        <span className="text-[12px] w-3 absolute -left-0.5 -top-2.5 inline-flex items-center justify-center text-xs font-bold leading-none dark:text-white text-black transform translate-x-1/2 -translate-y-1/ rounded-full">
          {itemCount}
        </span>
      )} */}
    </div>
  );
};

export default CartIcon;
