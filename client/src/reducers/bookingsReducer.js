const initialState = {
  loading: null,
  tours: [],
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'BOOKINGS_REQUESTED':
      return { ...state, loading: true, error: null };
    case 'BOOKINGS':
      return {
        ...state,
        loading: false,
        tours: action.payload,
        error: null,
      };
    case 'BOOKINGS_FAILED':
      return {
        ...state,
        loading: false,
        tours: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
