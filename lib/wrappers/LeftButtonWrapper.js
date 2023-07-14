import { setCurrentAgent } from "@/lib/actions/agentsActions";
import { setCurrentPrompt } from "@/lib/actions/promptsActions";

export const setElement = (selectedContent, name, dispacth) => {
  if (selectedContent === "Agents") dispacth(setCurrentAgent(name));
  if (selectedContent === "Prompts") dispacth(setCurrentPrompt(name));
};
