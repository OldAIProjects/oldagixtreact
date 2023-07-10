import {
  RETRIEVE_PROVIDER,
  RETRIEVE_PROVIDER_BY_NAME,
  RETRIEVE_EMBEDDING_PROVIDERS,
  STORED,
} from "./types";

import {
  getProviders,
  getProviderByName,
  getEmbeddingProviders,
} from "@/lib/api/apiEndpoints";

export const retrieveProvider = () => async (dispatch, getState) => {
  try {
    if (getState().provider.providers_names.length === 0) {
      const res = await getProviders();
      dispatch({
        type: RETRIEVE_PROVIDER,
        payload: res.data.providers,
      });
      return Promise.resolve(res.data.providers);
    } else {
      dispatch({
        type: RETRIEVE_PROVIDER,
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
      const provider = getState().provider.providers_settings.find(
        ({ name }) => name === provider_name
      );
      if (!provider) {
        const res = await getProviderByName(provider_name);

        dispatch({
          type: RETRIEVE_PROVIDER_BY_NAME,
          payload: {name: provider_name, settings: res.data.settings},
        });
        return Promise.resolve(res.data);
      } else {
        dispatch({
          type: RETRIEVE_PROVIDER_BY_NAME,
          payload: provider,
        });
        return provider;
      }
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  };

export const retrieveEmbeddingProviders = () => async (dispatch, getState) => {
  try {
    if (getState().provider.embedding_providers.length === 0) {
      const res = await getEmbeddingProviders();
      dispatch({
        type: RETRIEVE_EMBEDDING_PROVIDERS,
        payload: res.data.providers,
      });
      return Promise.resolve(res.data.providers);
    } else {
      dispatch({
        type: RETRIEVE_EMBEDDING_PROVIDERS,
        payload: getState().provider.embedding_providers,
      });
      return getState().provider.embedding_providers;
    }
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};
