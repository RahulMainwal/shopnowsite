import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

const getCartFromLc = JSON.parse(localStorage.getItem("cart"));

const cartSlice = createSlice({
  name: "cart",
  initialState:
    getCartFromLc === undefined || getCartFromLc === null ? [] : getCartFromLc,
  reducers: {
    addToCart(state, action) {
      const findId = state.find((x) => {
        return x.product._id === action.payload.product._id;
      });
      if (!findId) {
        if (action.payload.cartQty > 5) {
          state.push({ product: action.payload.product, cartQty: 5 });
        } else {
          state.push({
            product: action.payload.product,
            cartQty: action.payload.cartQty
          });
        }
      } else {
        if (action.payload.cartQty > 5) {
          const itemIndex = state.findIndex(
            (cartItem) => cartItem.product._id === action.payload.product._id
          );
          state[itemIndex].cartQty = 5;
        } else {
          const getState = state.find((x) => {
            return x.product._id === action.payload.product._id;
          });
          if (action.payload.cartQty + getState.cartQty > 5) {
            const itemIndex = state.findIndex(
              (cartItem) => cartItem.product._id === action.payload.product._id
            );
            state[itemIndex].cartQty = 5;
          } else {
            const itemIndex = state.findIndex(
              (cartItem) => cartItem.product._id === action.payload.product._id
            );
            state[itemIndex].cartQty += action.payload.cartQty;
          }
        }
      }
    },
    removeFromCart(state, action) {
      const filteredState = state.filter((x) => {
        return x !== state[action.payload];
      });
      return (state = filteredState);
    },
    deleteAllFromCart(state, action) {
      return (state = []);
    },
    changeCartQty(state, action) {
      if (action.payload.cartQty > 5) {
        state[action.payload.index].cartQty = 5;
      } else {
        state[action.payload.index].cartQty = action.payload.cartQty;
      }
    }
  }
});

export default cartSlice.reducer;
export const {
  addToCart,
  removeFromCart,
  deleteAllFromCart,
  changeCartQty
} = cartSlice.actions;
