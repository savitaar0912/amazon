// store/Slices/basketSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  count: 0, // Number of items in the cart
  total: 0, // Total price
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.count += 1;
      state.total += action.payload.price; // This line should update the total correctly
    },
    removeFromBasket: (state, action) => {
      const updatedTotal = state.total - action.payload.price;
      const updatedCount = state.count - 1;
      state.count = updatedCount >= 0 ? updatedCount : 0;
      state.total = updatedTotal >= 0 ? updatedTotal : 0;
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;
export default basketSlice.reducer;
