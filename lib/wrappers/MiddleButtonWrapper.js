import {
  addAgent,
  addPrompt,
  updateAgentByName,
  updatePromptByName,
  deleteAgentByName,
  deletePromptByName,
} from "@/lib/api/apiEndpoints";

import { useSelector } from "react-redux";

export function addElement() {
  const selectedContent = useSelector((state) => state.environment);
  const name = useSelector((state) => state.agent.agent_name);
  const data = useSelector((state) => state.agent.agent_data);

  if (selectedContent === "Agents") addAgent({ ...data, agent_name: name });
  if (selectedContent === "Prompts") addPrompt({ ...data, prompt_name: name });
}

export function updateElement({}) {
  const selectedContent = useSelector((state) => state.environment);
  const name = useSelector((state) => state.agent.agent_name);
  const data = useSelector((state) => state.agent.agent_data);
  if (selectedContent === "Agents")
    updateAgentByName(name, { ...data, agent_name: name });
  if (selectedContent === "Prompts")
    updatePromptByName(name, { ...data, prompt_name: name });
}

export function deleteElement() {
  const selectedContent = useSelector((state) => state.environment);
  const name = useSelector((state) => state.agent.agent_name);
  if (selectedContent === "Agents") deleteAgentByName(name);
  if (selectedContent === "Prompts") deletePromptByName(name);
}
