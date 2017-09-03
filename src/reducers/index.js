import { combineReducers } from 'redux';
import moderateReducer from './moderate.js';
import tableReducer from './table.js';
import userReducer from './userReducer.js';
const reducer = combineReducers({
  moderateReducer,
  tableReducer,
  userReducer
});

export default reducer;
