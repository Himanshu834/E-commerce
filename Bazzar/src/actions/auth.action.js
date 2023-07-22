import { authConstants, cartConstants } from "./constants";
import axios from "../helpers/axios";
export const login = (user) => {
  return async (dispatch) => {
    dispatch({
      type: authConstants.LOGIN_REQUEST,
    });
    const res = await axios.post(`/signin`, {
      ...user,
    });

    if (res.status === 200) {
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};
export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { error: "failed to logged in" },
      });
    }
  };
};
export const signout = () => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGOUT_REQUEST });
    localStorage.clear();
    dispatch({
      type: authConstants.LOGOUT_SUCCESS,
    });
    dispatch({
      type: cartConstants.RESET_CART,
    });
    // const res=await axios.post(`/admin/signout`)
    // if(res.status===200){
    //     localStorage.clear();
    // dispatch({
    //     type:authConstants.LOGOUT_SUCCESS
    // });
    // }
    // else{
    //     dispatch({
    //         type:authConstants.LOGOUT_FAILURE,
    //         payload:{error:res.data.error}
    //     });
    // }
  };
};
export const forgotPassword = (email) => {
  return async (dispatch) => {
    dispatch({
      type: authConstants.RESET_REQUEST,
    });
    const res = await axios.put(`/forgot-password`, {
      email,
    });

    if (res.status === 200) {
      dispatch({
        type: authConstants.RESET_SUCCESS,
        payload: { msg: "email changed successfully" },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: authConstants.RESET_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};
