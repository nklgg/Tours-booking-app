import { combineReducers } from 'redux';
import authReducer from './authReducer';
import toursReducer from './toursReducer';
import bookingsReducer from './bookingsReducer';

export default combineReducers({
	auth: authReducer,
	tours: toursReducer,
	bookings: bookingsReducer,
});
