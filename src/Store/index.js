import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import basketReducer from './basketSlice/addbasket_reducer';

// Combine reducers
const rootReducer = combineReducers({
  counter: basketReducer,
  // Add more reducers here as needed
});

// Create the Redux store
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
