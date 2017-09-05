import { combineReducers } from 'redux';
import moderateReducer from './moderate.js';
import tableReducer from './table.js';
import userReducer from './userReducer.js';
import loginReducer from './login.js';
const reducer = combineReducers({
  moderateReducer,
  tableReducer,
  userReducer,
  loginReducer
});

export default reducer;
