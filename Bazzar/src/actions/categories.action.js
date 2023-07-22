import axios from "../helpers/axios";
import { categoryConstants } from "./constants";

export const getAllCategory = () => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.GET_ALL_CATEGORIES_REQUEST });
    const res = await axios.get(`category/getcategory`);
    console.log(res);
    if (res.status === 200) {
      const { categoryList } = res.data;
      dispatch({
        type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
        payload: { categories: categoryList },
      });
    } else {
      dispatch({
        type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};
export const getCategoryDetailsById = (payload) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.GET_CATEGORY_DETAILS_BY_ID_REQUEST });
    let res;
    const { categoryId } = payload.params;
    res = await axios.get(`/category/${categoryId}`);
    console.log(res);
    try {
      const { categoryId } = payload.params;
      res = await axios.get(`/category/${categoryId}`);
      console.log(res);
      dispatch({
        type: categoryConstants.GET_CATEGORY_DETAILS_BY_ID_SUCCESS,
        payload: { categoryDetails: res.data.category },
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: categoryConstants.GET_CATEGORY_DETAILS_BY_ID_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};
