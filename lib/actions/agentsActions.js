import {
  ADD_AGENT,
  RETRIEVE_AGENT,
  RETRIEVE_AGENT_BY_NAME,
  UPDATE_AGENT,
  UPDATE_CURRENT_AGENT,
  DELETE_AGENT,
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
    if (!getState().agent.agents.find((item) => item.name === data.new_name)) {
      const resAddagent = await addAgent({
        agent_name: data.new_name,
        settings: data.agent.settings,
      });

      const payload = {
        agents: [
          ...getState().agent.agents,
          { name: data.new_name, agent: data.agent },
        ],
        agents_names: [...getState().agent.agents_names, data.new_name].sort(),
      };
      console.log(payload);
      //payload.agents_names.sort();

      dispatch({
        type: ADD_AGENT,
        payload: payload,
      });

      return Promise.resolve(payload);
    }
    return Promise.reject("Agent already exists");
  } catch (err) {
    return Promise.reject(err);
  }
};

export const updateAgentCommands =
  (agent_name, data) => async (dispatch, getState) => {
    try {
      const agent = getState().agent.agents.find(
        (item) => item.name === agent_name
      );

      if (
        agent &&
        JSON.stringify(agent.agent.commands) !==
          JSON.stringify(data.agent.commands)
      ) {
        const res = await updateAgentCommandsByName(agent_name, {
          agent_name: agent_name,
          commands: data.agent.commands,
        });

        const agent = {
          ...getState().agent,
          agents: getState().agent.agents.map((item) => {
            if (item.name === agent_name)
              return { name: data.name, agent: data.agent };
            else return item;
          }),
        };

        dispatch({
          type: UPDATE_AGENT,
          payload: agent,
        });

        return Promise.resolve(agent);
      } else {
        return Promise.reject("Commands are the same");
      }
    } catch (err) {
      return Promise.reject(err);
    }
  };

export const updateAgentSettings =
  (agent_name, data) => async (dispatch, getState) => {
    try {
      const agent = getState().agent.agents.find(
        (item) => item.name === agent_name
      );

      if (
        agent &&
        JSON.stringify(agent.agent.settings) !==
          JSON.stringify(data.agent.settings)
      ) {
        const res = await updateAgentSettingsByName(agent_name, {
          agent_name: agent_name,
          settings: data.agent.settings,
        });
        const agent = {
          ...getState().agent,
          agents: getState().agent.agents.map((item) => {
            if (item.name === agent_name)
              return { name: data.name, agent: data.agent };
            else return item;
          }),
        };

        dispatch({
          type: UPDATE_AGENT,
          payload: agent,
        });

        return Promise.resolve(agent);
      } else {
        return Promise.reject("Settings are the same");
      }
    } catch (err) {
      return Promise.reject(err);
    }
  };

export const updateAgentName =
  (agent_name, data) => async (dispatch, getState) => {
    try {
      if (
        getState().agent.agents.find((item) => item.name === agent_name) &&
        agent_name !== data.new_name &&
        !getState().agent.agents.find((item) => item.name === data.new_name)
      ) {
        const res = await patchAgentName(agent_name, {
          new_name: data.new_name,
        });
        const agent = {
          ...getState().agent,
          agents_names: getState()
            .agent.agents_names.map((name) => {
              if (name === agent_name) return data.new_name;
              else return name;
            })
            .sort(),
          agents: getState().agent.agents.map((item) => {
            if (item.name === agent_name)
              return { name: data.new_name, agent: data.agent };
            else return item;
          }),
        };

        dispatch({
          type: UPDATE_AGENT,
          payload: agent,
        });

        return Promise.resolve(agent);
      } else {
        return Promise.reject("Agent already exists");
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
        payload: res.data.agents.map((agent) => agent.name).sort(),
      });
      return Promise.resolve(res.data.agents.map((agent) => agent.name));
    } else {
      dispatch({
        type: RETRIEVE_AGENT,
        payload: getState().agent.agents_names,
      });
      return Promise.resolve(getState().agent.agents_names);
    }
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveAgentByName =
  (agent_name) => async (dispatch, getState) => {
    try {
      const agent = getState().agent.agents.find(
        (item) => item.name === agent_name
      );
      if (!agent) {
        const res = await getAgentByName(agent_name);

        dispatch({
          type: RETRIEVE_AGENT_BY_NAME,
          payload: { name: agent_name, agent: res.data.agent },
        });
        return Promise.resolve(res.data);
      } else {
        return Promise.resolve(agent);
      }
    } catch (err) {
      return Promise.reject(err);
    }
  };

export const retrieveAgentCommandsByName = (agent_name) => async (dispatch) => {
  try {
    const res = await getAgentCommandsByName(agent_name);

    return Promise.resolve(res.data.commands);
  } catch (err) {
    return Promise.reject(err);
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
      return Promise.resolve({ name: agent_name });
    } else {
      console.log("There is no agent named " + agent_name);
    }
  } catch (err) {
    return Promise.reject(err);
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
          ...current_agent,
          agent: {
            ...current_agent.agent,
            settings: {
              ...current_agent.agent.settings,
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
          ...current_agent,
          agent: {
            ...current_agent.agent,
            commands: {
              ...current_agent.agent.commands,
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
          ...current_agent,
          agent: {
            ...current_agent.agent,
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
          type: UPDATE_CURRENT_AGENT,
          payload: {
            name: agent_name,
            agent: agent.agent,
            new_name: agent_name,
          },
        });
      } else {
        dispatch({
          type: UPDATE_CURRENT_AGENT,
          payload: {
            name: agent_name,
            agent: agent.agent,
            new_name: agent_name,
          },
        });
      }
      return Promise.resolve(agent);
    } else {
      dispatch({
        type: UPDATE_CURRENT_AGENT,
        payload: getState().agent.current_agent,
      });
      return Promise.resolve(getState().agent.current_agent);
    }
  } catch (err) {
    return Promise.reject(err);
  }
};
