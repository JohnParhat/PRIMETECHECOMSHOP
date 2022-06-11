import { publicRequest } from '../requestMethods';
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from './userSlice';

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post('/auth/login', user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const register = async (dispatch, user) => {
  try {
    await publicRequest.post('./auth/register', user);
    const { username, password } = user;
    const res = await publicRequest.post('./auth/login', {
      username,
      password,
    });
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
    return error.response.data.message;
  }
};
