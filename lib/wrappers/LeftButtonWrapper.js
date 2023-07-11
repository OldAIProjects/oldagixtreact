import { setCurrentAgent } from "@/lib/actions/agentsActions";

export const setElement = (selectedContent, name, dispacth) => {
  if (selectedContent === "Agents") dispacth(setCurrentAgent(name));
  if (selectedContent === "Prompts") dispacth(setCurrentAgent(name));
};
