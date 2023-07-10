import {
  ADD_AGENT,
  RETRIEVE_AGENT,
  RETRIEVE_AGENT_BY_NAME,
  RETRIEVE_AGENT_COMMANDS_BY_NAME,
  UPDATE_AGENT,
  DELETE_AGENT,
  SET_CURRENT_AGENT,
} from "../../lib/actions/types";

const initialState = { current_agent: {}, agents: [], agents_names: [] };

function agentReducer(agents = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_AGENT:
      return { ...agents, agents: { ...agents.agents, payload } };

    case RETRIEVE_AGENT:
      return { ...agents, agents_names: payload };

    case RETRIEVE_AGENT_BY_NAME:
      return {
        ...agents,
        agents: [
          ...agents.agents,
          { name: payload.name, settings: payload.data },
        ],
      };

    case RETRIEVE_AGENT_COMMANDS_BY_NAME:
      return {
        ...agents,
      };

    case SET_CURRENT_AGENT:
      return { ...agents, current_agent: payload };

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
      return {
        ...agents,
        agents_names: [
          ...agents.agents_names,
          agents.agents_names.splice(
            agents.agents_names.indexOf(payload.name),
            1
          ),
        ],
        agents: [
          ...agents.agents,
          agents.agents.splice(
            agents.agents.findIndex((name) => name.name === payload.name),
            1
          ),
        ],
      };

    default:
      return agents;
  }
}

export default agentReducer;
