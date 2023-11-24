import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import basketReducer from './basketSlice/addbasket_reducer';
import userSlice from './user/userSlice';

// Combine reducers
const rootReducer = combineReducers({
  basket: basketReducer,
  user: userSlice
  // Add more reducers here as needed
});

// Create the Redux store
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;


// if we have only one reducer, we do this way:
// const store = configureStore({
//   reducer: basketReducer,
// });

