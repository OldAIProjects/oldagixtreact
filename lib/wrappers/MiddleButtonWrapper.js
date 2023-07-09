import {
  addAgent,
  addPrompt,
  updateAgentByName,
  updatePromptByName,
  deleteAgentByName,
  deletePromptByName,
} from "@/lib/api/apiEndpoints";

export function addElement({ selectedContent, data, name }) {
  console.log(selectedContent);
  if (selectedContent === "Agents") addAgent({ ...data, agent_name: name });
  if (selectedContent === "Prompts") addPrompt({ ...data, prompt_name: name });
}

export function updateElement({ selectedContent, data, name }) {
  console.log(selectedContent);
  if (selectedContent === "Agents")
    updateAgentByName(name, { ...data, agent_name: name });
  if (selectedContent === "Prompts")
    updatePromptByName(name, { ...data, prompt_name: name });
}

export function deleteElement({ selectedContent, name }) {
  console.log(selectedContent);
  if (selectedContent === "Agents") deleteAgentByName(name);
  if (selectedContent === "Prompts") deletePromptByName(name);
}
