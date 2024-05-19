import { configureStore } from "@reduxjs/toolkit";
import products from "./reducers/products";
import auth from "./reducers/auth";
import order from "./reducers/order";

export const store = configureStore({
  reducer: {
    products,
    auth,
    order,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
