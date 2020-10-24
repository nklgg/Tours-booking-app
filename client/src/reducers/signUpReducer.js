const initialState = {
  loading: null,
  authenticated: null,
  error: null,
  user: null,
  loginError: null,
  signUpError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SIGNUP_REQUESTED':
      return { ...state, loading: true, authenticated: null, error: null };
    case 'SIGNUP':
      return {
        ...state,
        loading: false,
        authenticated: true,
        error: null,
        user: action.payload,
        loginError: false,
      };
      case 'AUTH_FAILED':
      return {
        ...state,
        loading: false,
        
      }
    case 'SIGNUP_FAILED':
      return {
        ...state,
        loading: false,
        authenticated: false,
        signUpError: action.payload,
      };
    case 'SIGN_IN_ERROR':
      return {
        ...state,
        loading: false,
        authenticated: false,
        loginError: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        loading: false,
        authenticated: false,
        user: null,
      };
    default:
      return state;
  }
};
