import * as TAB from "./../actions/tab";
const intialState = {
  tab: "Home",
};

const tabReducer = (state = intialState, action) => {
  switch (action.type) {
    case TAB.TABCHANGE:
      return {
        ...state,
        tab: action.payload.tab,
      };
    default:
      return state;
  }
};

export default tabReducer;
