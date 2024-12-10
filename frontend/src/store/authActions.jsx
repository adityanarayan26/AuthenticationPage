// authActions.js
import axios from 'axios';
import { loginSuccess, loginFailure, setUser, logout } from './authSlice.jsx';
import { url } from '@/config/url';

export const loginUser = (email,password) => async (dispatch) => {
  try {
    const response = await axios.post(`${url}/login`, {email,password}, { withCredentials: true });
    const { user } = response.data;
    dispatch(loginSuccess());
    dispatch(setUser(user));
  } catch (error) {
    dispatch(loginFailure(error.response.data.message));
  }
};