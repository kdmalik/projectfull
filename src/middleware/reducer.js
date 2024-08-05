const registerReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return [...state, action.payload];
    case 'UPDATE_USER':
      return state.map((user) =>
        user.id === action.payload.id ? action.payload : user
      );
    case 'DELETE_USER':
      return state.filter((user) => user.id !== action.payload);
    // case 'Clear_data':
    //   return [];
    default:
      return state;
    
  }
};

export default registerReducer;
