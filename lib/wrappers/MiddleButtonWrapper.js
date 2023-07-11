import { deleteAgent } from "@/lib/actions/agentsActions";

export function addElement(selectedContent, name, data, dispacth) {
  if (selectedContent === "Agents")
    dispacth(addAgent({ ...data, agent_name: name }));
  if (selectedContent === "Prompts")
    dispacth(addPrompt({ ...data, prompt_name: name }));
}

export function updateElement(selectedContent, name, data, dispacth) {
  if (selectedContent === "Agents")
    dispacth(updateAgentByName(name, { ...data, agent_name: name }));
  if (selectedContent === "Prompts")
    dispacth(updatePromptByName(name, { ...data, prompt_name: name }));
}

export const deleteElement = (selectedContent, name, dispacth) => {
  if (selectedContent === "Agents") dispacth(deleteAgent(name));
  if (selectedContent === "Prompts") dispacth(deleteAgent(name));
};
