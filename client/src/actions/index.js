import axios from 'axios';

export const signUp = (formData) => {
  return async function (dispatch) {
    dispatch({
      type: 'SIGNUP_REQUESTED',
    });

    try {
      const res = await axios.post(`/api/v1/users/signup`, formData, {
        withCredentials: true,
      });

      dispatch({
        type: 'SIGNUP',
        payload: res.data.data.user,
      });
    } catch (err) {
      dispatch({
        type: 'SIGNUP_FAILED',
        payload: err.response,
      });
    }
  };
};

export const signIn = (formData) => {
  return async function (dispatch) {
    dispatch({
      type: 'SIGNUP_REQUESTED',
    });

    try {
      const res = await axios.post(`/api/v1/users/login`, formData, {
        withCredentials: true,
      });
      console.log(res);
      dispatch({
        type: 'SIGNUP',
        payload: res.data.data.user,
      });
    } catch (err) {
      dispatch({
        type: 'SIGN_IN_ERROR',
        payload: err.response,
      });
    }
  };
};

export const getUser = () => {
  return async function (dispatch) {
    dispatch({
      type: 'SIGNUP_REQUESTED',
    });
    try {
      const res = await axios.get(`/api/v1/users/me`, {
        withCredentials: true,
      });
      console.log(res);
      dispatch({
        type: 'SIGNUP',
        payload: res.data.data.data,
      });
    } catch (err) {
      console.log(err.response);
      dispatch({
        type: 'AUTH_FAILED',
        payload: err.response,
      });
    }
  };
};

export const patchUser = (formData) => {
  return async function (dispatch) {
    try {
      const res = await axios.patch(`/api/v1/users/updateMe`, formData, {
        withCredentials: true,
      });
      console.log(res);
      dispatch({
        type: 'USER',
        payload: res.data.data.user,
      });
    } catch (err) {
      console.log(err.response);
      dispatch({
        type: 'SIGNUP_FAILED',
        payload: err.response,
      });
    }
  };
};

export const getTours = () => {
  return async function (dispatch, getState) {
    console.log(getState().tours);
    if (!getState().tours.tours.length > 0) {
      try {
        const res = await axios.get('/api/v1/tours');
        dispatch({
          type: 'TOURS',
          payload: res.data.data.data,
        });
      } catch (err) {
        dispatch({
          type: 'TOURS_FAILED',
          payload: err.response,
        });
      }
    } else {
      dispatch({
        type: 'TOURS',
        payload: getState().tours.tours,
      });
    }
  };
};

export const logout = () => {
  return async function (dispatch) {
    try {
      const res = await axios.get('/api/v1/users/logout', {
        withCredentials: true,
      });
      dispatch({
        type: 'LOGOUT',
      });
    } catch (err) {
      dispatch({
        type: 'LOGOUT_FAILED',
        payload: err.response,
      });
    }
  };
};
