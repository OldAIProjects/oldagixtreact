import {
  RETRIEVE_PROVIDER,
  RETRIEVE_PROVIDER_BY_NAME,
  STORED,
} from "../actions/types";

const initialState = { providers_settings: [], providers_names: [] };

function providerReducer(provider = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case RETRIEVE_PROVIDER:
      return { ...provider, providers_names: payload.providers };

    case RETRIEVE_PROVIDER_BY_NAME:
      return {
        ...provider,
        providers_settings: [
          ...provider.providers_settings,
          { name: payload.settings.provider, settings: payload.settings },
        ],
      };

    case STORED:
      return provider;

    default:
      return provider;
  }
}

export default providerReducer;
