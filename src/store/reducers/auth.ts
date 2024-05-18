import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import api from "../apis";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: false,
    success: false,
    message: "",
  } as IState<Record<"token", string>>,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(api.login.pending, (state) => {
      state.loading = true;
    });
    build.addCase(api.register.pending, (state) => {
      state.loading = true;
    });

    build.addCase(
      api.login.fulfilled,
      (state, action: PayloadAction<Payload<Record<"token", string>>>) => {
        state.loading = false;
        state.success = true;
        state.message = action?.payload?.data?.message;
        state.data = action?.payload?.data;
      }
    );
    build.addCase(
      api.register.fulfilled,
      (state, action: PayloadAction<Payload<Record<"token", string>>>) => {
        state.loading = false;
        state.success = true;
        state.message = action?.payload?.data?.message;
        state.data = action?.payload?.data;
      }
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    build.addCase(api.login.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.success = false;
      state.error = true;
      state.message = action?.payload?.error?.message;
    });
    build.addCase(
      api.register.rejected,
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

export default authSlice.reducer;
