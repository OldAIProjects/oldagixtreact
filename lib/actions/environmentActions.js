import { RETRIEVE_ENVIRONMENT_STATE, UPDATE_ENVIRONMENT_STATE } from "./types";

export const updateEnvironment = (environment) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_ENVIRONMENT_STATE,
      payload: environment,
    });
    return Promise.resolve(environment);
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};
