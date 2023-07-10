import {
  RETRIEVE_PROVIDER,
  RETRIEVE_PROVIDER_BY_NAME,
  RETRIEVE_EMBEDDING_PROVIDERS,
} from "../../lib/actions/types";

const initialState = {
  providers_settings: [],
  providers_names: [],
  embedding_providers: [],
};

function providerReducer(provider = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case RETRIEVE_PROVIDER:
      return { ...provider, providers_names: payload };

    case RETRIEVE_PROVIDER_BY_NAME:
      return {
        ...provider,
        providers_settings: [
          ...provider.providers_settings,
          payload,
        ],
      };

    case RETRIEVE_EMBEDDING_PROVIDERS:
      return { ...provider, embedding_providers: payload };

    default:
      return provider;
  }
}

export default providerReducer;
