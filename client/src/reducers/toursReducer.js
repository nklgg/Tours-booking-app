const initialState = {
  loading: null,
  tours: [],
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'TOURS_REQUESTED':
      return { ...state, loading: true, tours: [], error: false };
    case 'TOURS':
      return {
        ...state,
        loading: false,
        tours: action.payload,
        error: null,
      };
    case 'TOURS_FAILED':
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
