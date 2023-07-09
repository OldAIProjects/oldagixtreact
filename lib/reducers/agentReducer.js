import {
  ADD_AGENT,
  RETRIEVE_AGENT,
  UPDATE_AGENT,
  DELETE_AGENT,
} from "../../lib/actions/types";

const initialState = [];

function agentReducer(agents = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_AGENT:
      return [...agents, payload];

    case RETRIEVE_AGENT:
      return payload;

    case UPDATE_AGENT:
      return agents.map((agent) => {
        if (agent.agent_name === payload.agent_name) {
          return {
            ...agent,
            ...payload,
          };
        } else {
          return agent;
        }
      });

    case DELETE_AGENT:
      return agents.filter(
        ({ agent_name }) => agent_name !== payload.agent_name
      );

    default:
      return agents;
  }
}

export default agentReducer;