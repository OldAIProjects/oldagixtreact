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

export const addAgents = () => async (dispatch, getState) => {
  try {
    const current_agent = getState().agent.current_agent;
    if (
      !getState().agent.agents.find(
        (item) => item.name === current_agent.new_name
      )
    ) {
      const resAddagent = await addAgent({
        agent_name: current_agent.new_name,
        settings: current_agent.agent.settings,
      });

      const payload = {
        agents: [
          ...getState().agent.agents,
          {
            name: current_agent.new_name,
            agent: { settings: current_agent.agent.settings, commands: {} },
          },
        ],
        agents_names: [
          ...getState().agent.agents_names,
          current_agent.new_name,
        ].sort(),
      };
      //payload.agents_names.sort();

      dispatch({
        type: ADD_AGENT,
        payload: payload,
      });

      return Promise.resolve(current_agent.new_name);
    }
    return Promise.reject("Agent already exists");
  } catch (err) {
    return Promise.reject(err);
  }
};

export const updateAgentCommands = () => async (dispatch, getState) => {
  try {
    const current_agent = getState().agent.current_agent;
    const agent = getState().agent.agents.find(
      (item) => item.name === current_agent.name
    );

    console.log(agent);
    console.log(current_agent);
    if (
      agent &&
      (JSON.stringify(agent.agent.commands) !==
        JSON.stringify(current_agent.agent.commands) ||
        Object.keys(agent.agent.commands).length === 0)
    ) {
      const res = await updateAgentCommandsByName(current_agent.name, {
        agent_name: current_agent.name,
        commands: current_agent.agent.commands,
      });

      const agent = {
        ...getState().agent,
        agents: getState().agent.agents.map((item) => {
          if (item.name === current_agent.name)
            return { name: current_agent.name, agent: current_agent.agent };
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

export const updateAgentSettings = () => async (dispatch, getState) => {
  try {
    const current_agent = getState().agent.current_agent;
    const agent = getState().agent.agents.find(
      (item) => item.name === current_agent.name
    );

    if (
      agent &&
      JSON.stringify(agent.agent.settings) !==
        JSON.stringify(current_agent.agent.settings)
    ) {
      const res = await updateAgentSettingsByName(current_agent.name, {
        agent_name: current_agent.name,
        settings: current_agent.agent.settings,
      });
      const agent = {
        ...getState().agent,
        agents: getState().agent.agents.map((item) => {
          if (item.name === current_agent.name)
            return { name: current_agent.name, agent: current_agent.agent };
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

export const updateAgentName = () => async (dispatch, getState) => {
  try {
    const current_agent = getState().agent.current_agent;
    if (
      getState().agent.agents.find(
        (item) => item.name === current_agent.name
      ) &&
      current_agent.name !== current_agent.new_name &&
      !getState().agent.agents.find(
        (item) => item.name === current_agent.new_name
      )
    ) {
      const res = await patchAgentName(current_agent.name, {
        new_name: current_agent.new_name,
      });
      const agent = {
        ...getState().agent,
        agents_names: getState()
          .agent.agents_names.map((name) => {
            if (name === current_agent.name) return current_agent.new_name;
            else return name;
          })
          .sort(),
        agents: getState().agent.agents.map((item) => {
          if (item.name === current_agent.name)
            return { name: current_agent.new_name, agent: current_agent.agent };
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
        return Promise.resolve({ name: agent_name, agent: res.data.agent });
      } else {
        return Promise.resolve(agent);
      }
    } catch (err) {
      return Promise.reject(err);
    }
  };

export const retrieveAgentCommandsByName =
  (agent_name) => async (dispatch, getState) => {
    try {
      const res = await getAgentCommandsByName(agent_name);

      return Promise.resolve({
        current_commands: getState().agent.current_agent.agent.commands,
        new_commands: res.data.commands,
        agent_name: getState().agent.current_agent.new_name,
      });
    } catch (err) {
      return Promise.reject(err);
    }
  };

export const deleteAgent = () => async (dispatch, getState) => {
  try {
    const current_agent = getState().agent.current_agent;
    if (
      getState().agent.agents.find((agent) => agent.name === current_agent.name)
    ) {
      await deleteAgentByName(current_agent.name);

      dispatch({
        type: DELETE_AGENT,
        payload: { name: current_agent.name },
      });
      return Promise.resolve({ name: current_agent.name });
    } else {
      console.log("There is no agent named " + current_agent.name);
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
      case "all_commands":
        const all_commands = {
          ...current_agent,
          agent: {
            ...current_agent.agent,
            commands: data.value,
          },
        };
        dispatch({
          type: UPDATE_CURRENT_AGENT,
          payload: all_commands,
        });
        return Promise.resolve(all_commands);
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
        const r_agent = await dispatch(retrieveAgentByName(agent_name));
        dispatch({
          type: UPDATE_CURRENT_AGENT,
          payload: {
            name: agent_name,
            agent: r_agent.agent,
            new_name: agent_name,
          },
        });
        return Promise.resolve({
          name: agent_name,
          agent: r_agent.agent,
          new_name: agent_name,
        });
      } else {
        dispatch({
          type: UPDATE_CURRENT_AGENT,
          payload: agent,
        });
        return Promise.resolve(agent);
      }
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
