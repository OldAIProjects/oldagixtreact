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
  dispatch(retrieveProvider())
    .then((res) => {
      res.map((value) => {
        dispatch(retrieveProviderByName(value));
      });
    })
    .then(
      dispatch(retrieveEmbeddingProviders()).then(
        dispatch(retrieveAgent())
          .then((res) => {
            res.map((value) => {
              dispatch(retrieveAgentByName(value));
            });
          })
          .then(dispatch(finishedLoading(selectedContent)))
      )
    );
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
