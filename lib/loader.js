import {
  retrieveProvider,
  retrieveProviderByName,
  retrieveEmbeddingProviders,
} from "@/lib/actions/providerActions";
import {
  retrieveAgent,
  retrieveAgentByName,
} from "@/lib/actions/agentsActions";
import {
  updateEnvironment,
  finishedLoading,
} from "@/lib/actions/environmentActions";

const agentLoader = (selectedContent, dispatch) => {
  const default_provider = "runpod";
  const default_agent = "easychat";

  dispatch(retrieveProvider());
  dispatch(retrieveProviderByName(default_provider));
  dispatch(retrieveEmbeddingProviders());

  dispatch(retrieveAgent());
  dispatch(retrieveAgentByName(default_agent)).then(() => {
    dispatch(finishedLoading(selectedContent));
  });
};

export const loader = (selectedContent, dispatch) => {
  dispatch(updateEnvironment(selectedContent));
  switch (selectedContent) {
    case "Agents":
      agentLoader(selectedContent, dispatch);
    case "Prompts":
      dispatch(finishedLoading(selectedContent));
      null;
    case "Chains":
      dispatch(finishedLoading(selectedContent));

    default:
      null;
  }
};

export const defaultLoad = (dispatch) => {
  loader("Agents", dispatch);
};
