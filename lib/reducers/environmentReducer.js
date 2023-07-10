import {
  RETRIEVE_ENVIRONMENT_STATE,
  UPDATE_ENVIRONMENT_STATE,
} from "../../lib/actions/types";

const initialState = "Agents";

function environmentReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_ENVIRONMENT_STATE:
      return payload;

    default:
      return state;
  }
}

export default environmentReducer;
