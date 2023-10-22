// store/reducers.js
import { combineReducers } from 'redux';
import basketReducer from './reducers/addbasket_reducer'

const rootReducer = combineReducers({
  counter: basketReducer,
  // Add more reducers here as needed
});

export default rootReducer;
