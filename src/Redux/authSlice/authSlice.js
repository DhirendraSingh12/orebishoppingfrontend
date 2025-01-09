
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: !!localStorage.getItem('authToken'), 
  user: JSON.parse(localStorage.getItem('User')) || { email: '', firstName: '' },
  token: localStorage.getItem('authToken'),
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
    console.log('Login successful: ', action.payload);
      state.isAuthenticated = true;
      state.user = action.payload.user; 
      state.token = action.payload.token;
      localStorage.setItem('authToken', action.payload.token);
      localStorage.setItem('User', JSON.stringify(action.payload.user));

    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = { email: '', firstName: '' }; 
      state.token = null;
      localStorage.removeItem('authToken'); 
      localStorage.removeItem('User'); 
      localStorage.removeItem('token'); 


    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
