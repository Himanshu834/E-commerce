import React, { useEffect } from "react";
import "./App.css";
import HomePage from "./containers/HomePage";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
  useNavigate,
} from "react-router-dom";
import ProductListPage from "./containers/ProductListPage";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn } from "./actions";
import ProductDetailPage from "./containers/ProductDetailPage/ProductDetailPage";
import CartPage from "./containers/CartPage/CartPage";
import { UpdateCart } from "./actions/cart.action";
import CheckoutPage from "./containers/CheckoutPage/CheckoutPage";
import Order from "./containers/Order/Order";
import Search from "./containers/Search";
import Address from "./containers/Address";
import TermsOfService from "./containers/TermsOfService";
import About from "./containers/About";
import Contact from "./containers/Contact";
import RefundPolicy from "./containers/RefundPolicy";
import Profile from "./containers/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HelmetProvider } from "react-helmet-async";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate]);

  useEffect(() => {
    dispatch(UpdateCart());
    console.log(auth);
  }, [auth.authenticate]);

  return (
    <div className="App">
      <HelmetProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<HomePage />}></Route>
            {auth.authenticate ? (
              <Route path="/cart" element={<CartPage />}></Route>
            ) : null}
            {auth.authenticate ? (
              <Route path="/checkout" element={<CheckoutPage />} />
            ) : null}
            {auth.authenticate ? (
              <Route path="/account/orders" element={<Order />}></Route>
            ) : null}
            {auth.authenticate ? (
              <Route path="/address" element={<Address />} />
            ) : null}
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/about" element={<About />} />
            {/* <Route path="/contact" element={<Contact />} /> */}
            <Route path="/refund-policy" element={<RefundPolicy />} />
            {/* {auth.authenticate ? (
              <Route path="/profile" element={<Profile />} />
            ) : null} */}
            <Route
              exact
              path="/:productSlug/:productId"
              element={<ProductDetailPage />}
            ></Route>
            <Route exact path="/:slug" element={<ProductListPage />}></Route>
            <Route path="/search" element={<Search />} />
            <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
        </Router>
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
        />
      </HelmetProvider>
    </div>
  );
}
const PageNotFound = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  }, []);
  return (
    <div>
      <h1>Page Not Found</h1>
    </div>
  );
};

export default App;
