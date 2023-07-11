import {
  UPDATE_ENVIRONMENT_STATE,
  FINISHED_LOADING,
} from "../../lib/actions/types";

const initialState = {
  selectedContent: "Agents",
  isAgentsLoading: true,
  isPromptsLoading: true,
  isChainsLoading: true,
};

function environmentReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_ENVIRONMENT_STATE:
      return {...state, selectedContent: payload};

    case FINISHED_LOADING:
      return { ...state, [Object.keys(state).find((name) => name.includes(payload))]: false };

    default:
      return state;
  }
}

export default environmentReducer;
