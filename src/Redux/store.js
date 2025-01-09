import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice/authSlice';
import userReducer from './authSlice/userSlice';
import productReducer from './authSlice/productSlice';
import cartReducer from './authSlice/cartSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    products: productReducer,
    cart: cartReducer,
  },
});

export default store;
