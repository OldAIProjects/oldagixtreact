import {
  addAgents,
  updateAgentCommands,
  updateAgentSettings,
  updateCurrentAgent,
  updateAgentName,
  retrieveAgentCommandsByName,
  deleteAgent,
} from "@/lib/actions/agentsActions";

export function addElement(selectedContent, name, data, dispacth) {
  if (selectedContent === "Agents")
    dispacth(addAgents(name, data)).then((err) =>
      dispacth(retrieveAgentCommandsByName(name), err)
        .then((commands) => {
          Object.entries(commands).map(([key, value]) => {
            !Object.keys(data.agent.commands).includes(key) &&
              dispacth(
                updateCurrentAgent({
                  name: "commands",
                  key: key,
                  value: value,
                })
              );
          });
        })
        .then(dispacth(updateAgentCommands(name, data)))
    );
  if (selectedContent === "Prompts")
    dispacth(addPrompt({ ...data, prompt_name: name }));
}

export function updateElement(selectedContent, name, data, dispacth) {
  if (selectedContent === "Agents") {
    dispacth(updateAgentCommands(name, data)).then(
      dispacth(updateAgentSettings(name, data)).then(
        dispacth(updateAgentName(name, data))
      )
    );
  }
  dispacth;
  if (selectedContent === "Prompts")
    dispacth(updatePromptByName(name, { ...data, prompt_name: name }));
}

export const deleteElement = (selectedContent, name, dispacth) => {
  if (selectedContent === "Agents") dispacth(deleteAgent(name));
  if (selectedContent === "Prompts") dispacth(deleteAgent(name));
};
