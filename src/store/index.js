import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/CartSlice";
import userSlice from "./slices/UserSlice";

const store = configureStore({
  reducer: {
    carts: cartSlice,
    users: userSlice
  }
});

export default store;
