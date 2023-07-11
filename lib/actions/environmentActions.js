import { FINISHED_LOADING, UPDATE_ENVIRONMENT_STATE } from "./types";

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

export const finishedLoading = (selectedContent) => async (dispatch) => {
  try {
    dispatch({
      type: FINISHED_LOADING,
      payload: selectedContent,
    });
    return Promise.resolve(selectedContent);
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}
