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
  updateAgentCommandsByName,
  updateAgentSettingsByName,
  patchAgentName,
  deleteAgentByName,
  getAgentCommandsByName,
} from "@/lib/api/apiEndpoints";

export const addAgents = (agent_name, data) => async (dispatch, getState) => {
  try {
    if (!getState().agent.agents.find((item) => item.name === agent_name)) {
      const resAddagent = await addAgent({
        agent_name: agent_name,
        settings: data.agent.settings,
      });

      dispatch({
        type: ADD_AGENT,
        payload: data,
      });

      return Promise.resolve(data);
    }
    return Promise.reject("Agent already exists");
  } catch (err) {
    return Promise.reject(err);
  }
};

export const updateAgentCommands =
  (agent_name, data) => async (dispatch, getState) => {
    try {
      if (
        getState().agent.agents.find(
          (item) =>
            item.name === agent_name &&
            JSON.stringify(item.commands) !==
              JSON.stringify(data.agent.commands)
        )
      ) {
        const res = await updateAgentCommandsByName(agent_name, {
          agent_name: agent_name,
          commands: data.agent.commands,
        });

        const agent = {
          ...getState().agent,
          agents: getState().agent.agents.map((item) => {
            if (item.name === agent_name)
              return Object.entries(data).filter(([key, value]) => {
                return key !== "new_name";
              });
            else return item;
          }),
        };

        dispatch({
          type: UPDATE_AGENT,
          payload: agent,
        });

        return Promise.resolve(data);
      }
    } catch (err) {
      return Promise.reject(err);
    }
  };

export const updateAgentSettings =
  (agent_name, data) => async (dispatch, getState) => {
    try {
      if (
        getState().agent.agents.find(
          (item) =>
            item.name === agent_name &&
            JSON.stringify(item.settings) !==
              JSON.stringify(data.agent.settings)
        )
      ) {
        const res = await updateAgentSettingsByName(agent_name, {
          agent_name: agent_name,
          settings: data.agent.settings,
        });

        const agent = {
          ...getState().agent,
          agents: getState().agent.agents.map((item) => {
            if (item.name === agent_name)
              return Object.entries(data).filter(([key, value]) => {
                return key !== "new_name";
              });
            else return item;
          }),
        };

        dispatch({
          type: UPDATE_AGENT,
          payload: agent,
        });

        return Promise.resolve(agent);
      }
    } catch (err) {
      return Promise.reject(err);
    }
  };

export const updateAgentName =
  (agent_name, data) => async (dispatch, getState) => {
    try {
      if (
        getState().agent.agents.find(
          (item) => item.name === agent_name && agent_name !== data.new_name
        )
      ) {
        const res = await patchAgentName(agent_name, {
          new_name: data.new_name,
        });
        const agent = {
          ...getState().agent,
          agents_names: getState().agent.agents_names.map((name) => {
            if (name === agent_name) return data.new_name;
            else return name;
          }),
          agents: getState().agent.agents.map((item) => {
            if (item.name === agent_name)
              return Object.entries(data).filter(([key, value]) => {
                return key !== "new_name";
              });
            else return item;
          }),
        };

        dispatch({
          type: UPDATE_AGENT,
          payload: agent,
        });

        return Promise.resolve(data);
      }
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

export const retrieveAgentCommandsByName = (agent_name) => async (dispatch) => {
  try {
    const res = await getAgentCommandsByName(agent_name);

    return Promise.resolve(res.data.commands);
  } catch (err) {
    console.log(err);
  }
};

export const deleteAgent = (agent_name) => async (dispatch, getState) => {
  try {
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
        current_agent.new_name = data.value;
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
      case "update_provider":
        const provider = {
          ...getState().agent.current_agent,
          agent: {
            ...getState().agent.current_agent.agent,
            settings: { ...data.key.settings, embedder: data.value },
          },
        };
        dispatch({
          type: UPDATE_CURRENT_AGENT,
          payload: provider,
        });
        return Promise.resolve(provider);
      default:
        break;
    }

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
      const agent = getState().agent.agents.find(
        (item) => item.name === agent_name
      );
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
