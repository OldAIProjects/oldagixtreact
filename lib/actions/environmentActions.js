import { RETRIEVE_ENVIRONMENT_STATE } from "./types";

export const retrieveEnvironmentState = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: RETRIEVE_ENVIRONMENT_STATE,
      payload: getState().environment,
    });
    return Promise.resolve(getState().environment);
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};
