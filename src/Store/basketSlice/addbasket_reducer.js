// store/Slices/basketSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  //we could have done it with using only items and then iteratinng the price and items.length
  count: 0, // Number of items in the cart
  total: 0, // Total price
  items: []
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.count += 1;
      state.total += action.payload.price; // This line should update the total correctly
      state.items = [...state.items, action.payload]
      // console.log(state.items)
    },
    removeFromBasket: (state, action) => {
      // Find the index of the item to remove based on the payload (e.g., product title)
      const itemIndex = state.items.findIndex(item => item.title === action.payload.title);

      if (itemIndex !== -1) {
        // Item found, remove it from the items array
        state.items = state.items.filter((item, index) => index !== itemIndex);

        // Update the count and total
        state.count -= 1;
        state.total -= action.payload.price;
      }
    },
    emptyBasket: () => initialState,
  },
});

export const { addToBasket, removeFromBasket, emptyBasket } = basketSlice.actions;
export const selectBasket = (state) => state.basket.items;
export const selectTotal = (state) => state.basket.total;

export default basketSlice.reducer;
