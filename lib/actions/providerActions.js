import { RETRIEVE_PROVIDER, RETRIEVE_PROVIDER_BY_NAME, STORED } from "./types";

import { getProviders, getProviderByName } from "@/lib/api/apiEndpoints";

export const retrieveProvider = () => async (dispatch, getState) => {
  try {
    if (getState().provider.providers_names.length === 0) {
      const res = await getProviders();
      dispatch({
        type: RETRIEVE_PROVIDER,
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } else {
      dispatch({
        type: STORED,
        payload: getState().provider.providers_names,
      });
      return getState().provider.providers_names;
    }
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};

export const retrieveProviderByName =
  (provider_name) => async (dispatch, getState) => {
    try {
      console.log(getState().provider.providers_settings);
      const provider = getState().provider.providers_settings.find(
        ({name}) => name === provider_name
      );
      console.log(provider);
      if (provider) {
        dispatch({
          type: STORED,
          payload: provider,
        });
        return provider;
      } else {
        const res = await getProviderByName(provider_name);

        dispatch({
          type: RETRIEVE_PROVIDER_BY_NAME,
          payload: res.data,
        });
        return Promise.resolve(res.data);
      }
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  };
