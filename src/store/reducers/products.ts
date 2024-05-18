import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import api from "../apis";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    error: false,
    success: false,
    message: "",
    data: {
      content: [] as Product[],
    },
  } as ProductState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(api.allProducts.pending, (state) => {
      state.loading = true;
    });

    build.addCase(
      api.allProducts.fulfilled,
      (state, action: PayloadAction<Payload<ReturnData<Product>>>) => {
        state.loading = false;
        state.success = true;
        state.message = action?.payload?.message;
        state.data = action?.payload?.data;
      }
    );

    build.addCase(
      api.allProducts.rejected,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = false;
        state.error = true;
        state.message = action?.payload?.error?.message;
      }
    );
    // build.addCase(api.resetAll, (state) => {
    //   state.error = false;
    //   state.message = "";
    // });
  },
});

export default productsSlice.reducer;
