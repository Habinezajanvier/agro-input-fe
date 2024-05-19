/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./axios";

class Api {
  allProducts = createAsyncThunk(
    "Products",
    async (pagination: PaginationDTO, { rejectWithValue }) => {
      try {
        const response = await axios.get(
          `/products?page=${pagination.page}&pageSize=${pagination.pageSize}&category=${pagination.category}`
        );
        // console.log(JSON.stringify({ response }, null, 2));
        return response.data;
      } catch (error: any) {
        return rejectWithValue({ error: error?.response?.data });
      }
    }
  );

  login = createAsyncThunk(
    "login",
    async (data: LoginData, { rejectWithValue }) => {
      try {
        const response = await axios.post(`/auth/login`, { ...data });
        this.setAuthorisation(response.data.data.token);
        return response.data;
      } catch (error: any) {
        return rejectWithValue({ error: error?.response?.data });
      }
    }
  );

  register = createAsyncThunk(
    "register",
    async (data: SignupData, { rejectWithValue }) => {
      try {
        const response = await axios.post(`/auth/signup`, { ...data });
        this.setAuthorisation(response.data.data.token);
        return response.data;
      } catch (error: any) {
        return rejectWithValue({ error: error?.response?.data });
      }
    }
  );

  orderPlacement = createAsyncThunk(
    "orders",
    async (data: OrderData, { rejectWithValue }) => {
      try {
        const response = await axios.post(`/orders`, { ...data });
        this.setAuthorisation(response.data.data.token);
        return response.data;
      } catch (error: any) {
        return rejectWithValue({ error: error?.response?.data });
      }
    }
  );

  resetAll = createAction("resetAll");

  setAuthorisation = (token: string) => {
    localStorage.setItem("x-token", token);
    axios.defaults.headers.common = {
      Authorization: "Bearer " + token,
    };
  };
}

const apis = new Api();
export default apis;
