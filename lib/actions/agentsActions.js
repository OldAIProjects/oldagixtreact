import { ADD_AGENT, RETRIEVE_AGENT, UPDATE_AGENT, DELETE_AGENT } from "./types";

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

export const retrieveAgent = () => async (dispatch) => {
  try {
    const res = await getAgent();

    dispatch({
      type: RETRIEVE_AGENT,
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    console.log(err);
  }
};

export const retrieveAgentByName = (agent_name) => async (dispatch) => {
  try {
    const res = await getAgentByName(agent_name);

    dispatch({
      type: RETRIEVE_AGENT,
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    console.log(err);
  }
};

export const retrieveAgentCommandsByName = (agent_name) => async (dispatch) => {
  try {
    const res = await getAgentCommandsByName(agent_name);

    dispatch({
      type: RETRIEVE_AGENT,
      payload: res.data,
    });
    return Promise.resolve(res.data);
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

export const deleteAgent = (agent_name) => async (dispatch) => {
  try {
    await deleteAgentByName(agent_name);

    dispatch({
      type: DELETE_AGENT,
      payload: { agent_name },
    });
  } catch (err) {
    console.log(err);
  }
};
