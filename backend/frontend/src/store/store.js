import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./Slice/product/cartSlice";
import productSlice from "./Slice/product/productSlice";

import authReducer from "./Slice/auth/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartSlice,
    products: productSlice,
  },
});

export default store;
