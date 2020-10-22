import * as LOGIN from "./../actions/login";
const intialState = {
  email: null,
  firtsname: null,
  lastname: null,
  avatar: null,
  id: null,
};

const loginReducer = (state = intialState, action) => {
  switch (action.type) {
    case LOGIN.USERDATA:
      return {
        ...state,
        email: action.payload.email,
        firtsname: action.payload.firstname,
        lastname: action.payload.lastname,
        avatar: action.payload.avatar,
        id: action.payload.id,
        authenticated: true,
      };

    case LOGIN.AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };

    case LOGIN.END_SESSION:
      return {
        ...state,
        authenticated: false,
      };
    default:
      return state;
  }
};

export default loginReducer;
