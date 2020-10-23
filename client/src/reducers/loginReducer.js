const initialState = {
  loading: null,
  authenticated: false,
  error: null,
  user: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUESTED':
      return { ...state, loading: true, authenticated: false, error: null };
    case 'LOGIN':
      return {
        ...state,
        loading: false,
        authenticated: true,
        error: null,
        user: action.payload.data.user,
        loginError: false,
      };
    case 'LOGIN_FAILED':
      return {
        ...state,
        loading: false,
        authenticated: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
