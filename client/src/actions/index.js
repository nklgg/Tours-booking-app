import axios from 'axios';
import { AUTH_REQUESTED } from './types';

export const signUp = (formData) => {
	return async function (dispatch) {
		dispatch({
			type: 'AUTH_REQUESTED',
		});

		try {
			const res = await axios.post(`/api/v1/users/signup`, formData, {
				withCredentials: true,
			});

			dispatch({
				type: 'AUTH',
				payload: res.data.data.user,
			});
		} catch (err) {
			dispatch({
				type: 'AUTH_SIGNUP_FAIL',
				payload: err.response,
			});
		}
	};
};

export const signIn = (formData) => {
	return async function (dispatch) {
		dispatch({
			type: 'AUTH_REQUESTED',
		});

		try {
			const res = await axios.post(`/api/v1/users/login`, formData, {
				withCredentials: true,
			});
			console.log(res);
			dispatch({
				type: 'AUTH',
				payload: res.data.data.user,
			});
		} catch (err) {
			console.log('OVO JE LOGin', err);

			dispatch({
				type: 'AUTH_SIGNIN_FAIL',
				payload: err.response,
			});
		}
	};
};

export const getUser = () => {
	return async function (dispatch) {
		dispatch({
			type: 'AUTH_REQUESTED',
		});
		try {
			const res = await axios.get(`/api/v1/users/me`, {
				withCredentials: true,
			});
			console.log(res);
			dispatch({
				type: 'AUTH',
				payload: res.data.data.data,
			});
		} catch (err) {
			console.log(err.response);
			dispatch({
				type: 'AUTH_FAIL',
				payload: err.response,
			});
		}
	};
};

export const patchUser = (formData) => {
	return async function (dispatch) {
		dispatch({
			type: 'AUTH_REQUESTED',
		});
		try {
			const res = await axios.patch(`/api/v1/users/updateMe`, formData, {
				withCredentials: true,
			});
			console.log(res);
			dispatch({
				type: 'AUTH',
				payload: res.data.data.user,
			});
		} catch (err) {
			console.log(err.response);
			dispatch({
				type: 'AUTH_FAIL',
				payload: err.response,
			});
		}
	};
};

export const getTours = () => {
	return async function (dispatch, getState) {
		dispatch({
			type: 'TOURS_REQUESTED',
		});
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
					type: 'TOURS_FAIL',
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

export const getBookings = () => {
	return async function (dispatch) {
		dispatch({
			type: 'BOOKINGS_REQUESTED',
		});
		try {
			const res = await axios.get(`/api/v1/booking/my-tours`, {
				withCredentials: true,
			});
			console.log(res);
			dispatch({
				type: 'BOOKINGS',
				payload: res.data.tours,
			});
		} catch (err) {
			console.log(err.response);
			dispatch({
				type: 'BOOKINGS_FAIL',
				payload: err.response,
			});
		}
	};
};
