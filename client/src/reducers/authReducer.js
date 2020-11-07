import {
	AUTH,
	AUTH_REQUESTED,
	AUTH_FAIL,
	AUTH_SIGNUP_FAIL,
	AUTH_SIGNIN_FAIL,
	LOGOUT,
} from '../actions/types';

const initialState = {
	loading: null,
	authenticated: false,
	error: null,
	user: null,
	loginError: null,
	signUpError: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case AUTH_REQUESTED:
			return { ...state, loading: true, authenticated: null, error: null };
		case AUTH:
			return {
				...state,
				loading: false,
				authenticated: true,
				error: null,
				user: action.payload,
				loginError: false,
			};
		case AUTH_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case AUTH_SIGNUP_FAIL:
			return {
				...state,
				loading: false,
				authenticated: false,
				signUpError: action.payload,
			};
		case AUTH_SIGNIN_FAIL:
			return {
				...state,
				loading: false,
				authenticated: false,
				loginError: action.payload,
			};
		case LOGOUT:
			return {
				...state,
				loading: false,
				authenticated: false,
				user: null,
			};
		default:
			return state;
	}
};
