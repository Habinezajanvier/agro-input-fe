import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import api from "../apis";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    error: false,
    success: false,
    message: "",
  } as IState<ReturnData<OrderData>>,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(api.orderPlacement.pending, (state) => {
      state.loading = true;
    });

    build.addCase(
      api.orderPlacement.fulfilled,
      (state, action: PayloadAction<Payload<ReturnData<OrderData>>>) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.message = action.payload.message;
      }
    );

    build.addCase(
      api.orderPlacement.rejected,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = false;
        state.error = true;
        state.message = action?.payload?.error?.message;
      }
    );
    build.addCase(api.resetAll, (state) => {
      state.error = false;
      state.success = false;
      state.message = "";
    });
  },
});

export default orderSlice.reducer;
