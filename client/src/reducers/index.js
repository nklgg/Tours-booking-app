import { combineReducers } from 'redux';
import signUpReducer from './signUpReducer';
import userReducer from './userReducer';
import toursReducer from './toursReducer';

export default combineReducers({
  auth: signUpReducer,
  user: userReducer,
  tours: toursReducer,
});
