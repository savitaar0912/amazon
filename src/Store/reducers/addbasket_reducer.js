// store/reducers/counterReducer.js
const initialState = 0;

const basketReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_BASKET':
      return state + 1;
    case 'REMOVE_TO_BASKET':
      return state - 1;
    default:
      return state;
  }
};

export default basketReducer;