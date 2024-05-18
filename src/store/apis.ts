/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
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
}

const apis = new Api();
export default apis;
