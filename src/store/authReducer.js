import { LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_SUCCESS } from './authActions';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;