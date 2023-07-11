import {
  ADD_AGENT,
  RETRIEVE_AGENT,
  RETRIEVE_AGENT_BY_NAME,
  RETRIEVE_AGENT_COMMANDS_BY_NAME,
  UPDATE_AGENT,
  UPDATE_CURRENT_AGENT,
  DELETE_AGENT,
  SET_CURRENT_AGENT,
} from "./types";

import {
  addAgent,
  getAgent,
  getAgentByName,
  updateAgentByName,
  deleteAgentByName,
  getAgentCommandsByName,
} from "@/lib/api/apiEndpoints";

export const addAgents = (agent_name, data) => async (dispatch, getState) => {
  try {
    const res = await addAgent(agent_name, data);

    dispatch({
      type: ADD_AGENT,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveAgent = () => async (dispatch, getState) => {
  try {
    if (getState().agent.agents_names.length === 0) {
      const res = await getAgent();

      dispatch({
        type: RETRIEVE_AGENT,
        payload: res.data.agents.map((agent) => agent.name),
      });
      return Promise.resolve(res.data.agents.map((agent) => agent.name));
    } else {
      dispatch({
        type: RETRIEVE_AGENT,
        payload: getState().agent.agents_names,
      });
      return getState().agent.agents_names;
    }
  } catch (err) {
    console.log(err);
  }
};

export const retrieveAgentByName =
  (agent_name) => async (dispatch, getState) => {
    try {
      const agent = getState().agent.agents.find(
        (agent) => agent.name === agent_name
      );
      if (!agent) {
        const res = await getAgentByName(agent_name);

        dispatch({
          type: RETRIEVE_AGENT_BY_NAME,
          payload: { name: agent_name, agent: res.data.agent },
        });
        return Promise.resolve(res.data);
      } else {
        dispatch({
          type: RETRIEVE_AGENT_BY_NAME,
          payload: agent,
        });
        return agent;
      }
    } catch (err) {
      console.log(err);
    }
  };

export const retrieveAgentCommandsByName =
  (agent_name) => async (dispatch, getState) => {
    try {
      const res = await getAgentCommandsByName(agent_name);

      dispatch({
        type: RETRIEVE_AGENT_COMMANDS_BY_NAME,
        payload: res.data.commands,
      });
      return Promise.resolve(res.data.commands);
    } catch (err) {
      console.log(err);
    }
  };

export const updateAgent = (agent_name, data) => async (dispatch) => {
  try {
    const res = await updateAgentByName(agent_name, data);

    dispatch({
      type: UPDATE_AGENT,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteAgent = (agent_name) => async (dispatch, getState) => {
  try {
    console.log(
      getState().agent.agents.find((agent) => agent.name === agent_name)
    );
    if (getState().agent.agents.find((agent) => agent.name === agent_name)) {
      await deleteAgentByName(agent_name);

      dispatch({
        type: DELETE_AGENT,
        payload: { name: agent_name },
      });
      return { name: agent_name };
    } else {
      console.log("There is no agent named " + agent_name);
    }
  } catch (err) {
    console.log(err);
  }
};

export const updateCurrentAgent = (data) => async (dispatch, getState) => {
  try {
    const current_agent = { ...getState().agent.current_agent };

    switch (data.name) {
      case "name":
        current_agent.name = data.value;
        break;
      case "settings":
        const settings = {
          ...getState().agent.current_agent,
          agent: {
            ...getState().agent.current_agent.agent,
            settings: {
              ...getState().agent.current_agent.agent.settings,
              [data.key]: data.value,
            },
          },
        };
        dispatch({
          type: UPDATE_CURRENT_AGENT,
          payload: settings,
        });
        return Promise.resolve(settings);
      case "commands":
        const commands = {
          ...getState().agent.current_agent,
          agent: {
            ...getState().agent.current_agent.agent,
            commands: {
              ...getState().agent.current_agent.agent.commands,
              [data.key]: data.value,
            },
          },
        };
        dispatch({
          type: UPDATE_CURRENT_AGENT,
          payload: commands,
        });
        return Promise.resolve(commands);
      default:
        break;
    }
    console.log(current_agent.agent.settings[data.key]);
    console.log(current_agent);

    dispatch({
      type: UPDATE_CURRENT_AGENT,
      payload: current_agent,
    });

    return Promise.resolve(current_agent);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const setCurrentAgent = (agent_name) => async (dispatch, getState) => {
  try {
    if (getState().agent.current_agent.name !== agent_name) {
      const agent = getState().agent.agents.find((name) => name === agent_name);
      if (!agent) {
        const agent = await dispatch(retrieveAgentByName(agent_name));
        dispatch({
          type: SET_CURRENT_AGENT,
          payload: { name: agent_name, agent: agent.agent },
        });
      } else {
        dispatch({
          type: SET_CURRENT_AGENT,
          payload: { name: agent_name, agent: agent.agent },
        });
      }
      return agent;
    } else {
      dispatch({
        type: SET_CURRENT_AGENT,
        payload: getState().agent.current_agent,
      });
      return getState().agent.current_agent;
    }
  } catch (err) {
    console.log(err);
  }
};
