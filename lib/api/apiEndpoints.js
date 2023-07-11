import api from "./apiConfig";

// Provider
export const getProviders = () => {
  return api.get("api/provider");
};

export const getProviderByName = (name) => {
  return api.get(`api/provider/${name}`);
};

export const getEmbeddingProviders = () => {
  return api.get("api/embedding_providers");
};

// Agent
export const getAgent = () => {
  return api.get("api/agent");
};

export const addAgent = (data) => {
  return api.post("api/agent", data);
};

export const importAgent = (data) => {
  return api.post("api/agent/import", data);
};

export const getAgentByName = (name) => {
  return api.get(`api/agent/${name}`);
};

export const addAgentByName = (name, data) => {
  return api.post(`api/agent/${name}`, data);
};

export const deleteAgentByName = (name) => {
  return api.delete(`api/agent/${name}`);
};

export const updateAgentByName = (name, data) => {
  return api.put(`api/agent/${name}`, data);
};

export const patchAgentName = (name, data) => {
  return api.patch(`api/agent/${name}`, data);
};

export const updateAgentCommandsByName = (name, data) => {
  return api.put(`api/agent/${name}/commands`, data);
};

export const updateAgentSettingsByName = (name, data) => {
  return api.put(`api/agent/${name}`, data);
};

export const getAgentConversations = (name) => {
  return api.get(`api/agent/${name}/conversations`);
};

export const getConversations = () => {
  return api.get("api/conversations");
};

export const getAgentCommandsByName = (name) => {
  return api.get(`api/agent/${name}/command`);
};

// Prompts

export const getPrompt = () => {
  return api.get("api/prompt");
};

export const addPrompt = (data) => {
  return api.post("api/prompt", data);
};

export const getPromptByName = (name) => {
  return api.get(`api/prompt/${name}`);
};

export const updatePromptByName = (name, data) => {
  return api.put(`api/prompt/${name}`, data);
};

export const deletePromptByName = (name) => {
  return api.delete(`api/prompt/${name}`);
};

export const getPromptArgsByName = (name) => {
  return api.get(`api/prompt/${name}/args`);
};

export const apiService = {
  agentsService: {
    getAgent,
    addAgent,
    importAgent,
    getAgentByName,
    addAgentByName,
    deleteAgentByName,
    updateAgentByName,
    updateAgentCommandsByName,
    getAgentConversations,
    getConversations,
    getAgentCommandsByName,
  },
  providerService: {
    getProviders,
    getProviderByName,
    getEmbeddingProviders,
  },
};

// export default apiService;
