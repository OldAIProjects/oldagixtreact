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
  retrievePrompts,
  retrievePromptByName,
} from "@/lib/actions/promptsActions";
import {
  updateEnvironment,
  finishedLoading,
} from "@/lib/actions/environmentActions";

const agentLoader = (selectedContent, dispatch) => {
  dispatch(retrieveProvider())
    .then((res) => {
      return Promise.allSettled(
        res.map((value) => {
          return dispatch(retrieveProviderByName(value));
        })
      );
    })
    .then(() => {
      return dispatch(retrieveEmbeddingProviders());
    })
    .then(() => {
      return dispatch(retrieveAgent());
    })

    .then((res) => {
      return Promise.allSettled(
        res.map((value) => {
          return dispatch(retrieveAgentByName(value));
        })
      );
    })
    .then(() => {
      dispatch(finishedLoading(selectedContent));
    });
};

const promtLoader = (selectedContent, dispatch) => {
  dispatch(retrievePrompts())
    .then((res) => {
      return Promise.allSettled(
        res.map((value) => {
          return dispatch(retrievePromptByName(value));
        })
      );
    })
    .then(() => {
      dispatch(finishedLoading(selectedContent));
    });
};

export const loader = (selectedContent, dispatch, isLoading) => {
  dispatch(updateEnvironment(selectedContent)).then(() => {
    if (selectedContent === "Agents")
      return isLoading ? null : agentLoader(selectedContent, dispatch);
    if (selectedContent === "Prompts")
      return isLoading ? null : promtLoader(selectedContent, dispatch);
    if (selectedContent === "Chains")
      return isLoading ? null : dispatch(finishedLoading(selectedContent));
  });
};

export const defaultLoad = (dispatch) => {
  loader("Agents", dispatch);
};
