import axios from "axios";

export const baseUrl = "https://upskilling-egypt.com:3006";
export const axiosInstance = axios.create({

    baseURL :baseUrl ,
    headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
}

)

export const USERS_URLS = {
  LOGIN: `/api/v1/Users/Login`,
  REGISTER: `/api/v1/Users/Register`,
  FORGET_PASS: `/api/v1/Users/Reset/Request`,
  CHANGE_PASS: `/api/v1/Users/ChangePassword`,
  RESET_PASS: `/api/v1/Users/Reset`,
  RESET_VERIFY: `/api/v1/Users/verify`,
  GET_USER: (id) => `/api/v1/Users/?pageSize=10&pageNumber=${id}`,
  DELETE_USER: (id) => `/api/v1/Users/${id}`,

};

export const RECIPES_URLS = {

    CREATE_RECIPE :`/api/v1/Recipe/`,
    GET_RECIPES : (id) => `/api/v1/Recipe/?pageSize=10&pageNumber=${id}`,
    DELETE_RECIPE : (id) => `/api/v1/Recipe/${id}`,
    EDIT_RECIPE: (id) => `/api/v1/Recipe/${id}`,

};

export const CATEGORIES_URLS = {

    CREATE_CATEGORY :`/api/v1/Category/`,
    GET_CATEGORIES : (id) => `/api/v1/Category/?pageSize=10&pageNumber=${id}`,
    DELETE_CATEGORY : (id) => `/api/v1/Category/${id}`,
    EDIT_RECIPE: (id) => `/api/v1/Category/${id}`,
};
