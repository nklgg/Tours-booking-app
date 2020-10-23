const initialState = {
  user: null,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'USER':
      return { ...state, user: action.payload, error: null };

    case 'SIGNUP_FAILED':
      return {
        ...state,
        user: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
