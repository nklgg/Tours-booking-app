import { combineReducers } from 'redux';
import signUpReducer from './signUpReducer';
import userReducer from './userReducer';
import toursReducer from './toursReducer';
import bookingsReducer from './bookingsReducer';

export default combineReducers({
  auth: signUpReducer,
  user: userReducer,
  tours: toursReducer,
  bookings: bookingsReducer,
});
