import {
  addAgents,
  updateAgentCommands,
  updateAgentSettings,
  updateCurrentAgent,
  updateAgentName,
  retrieveAgentCommandsByName,
  deleteAgent,
  setCurrentAgent,
} from "@/lib/actions/agentsActions";

import {
  addPrompts,
  updatePrompt,
  updatePromptName,
  deletePrompt,
} from "@/lib/actions/promptsActions";

export function addElement(selectedContent, dispacth) {
  if (selectedContent === "Agents")
    dispacth(addAgents())
      .then((name) => {
        return dispacth(retrieveAgentCommandsByName(name));
      })
      .then((commands) => {
        Object.keys(commands.new_commands).map((key) => {
          if (Object.keys(commands.current_commands).includes(key))
            commands.new_commands[key] = commands.current_commands[key];
        });
        return dispacth(setCurrentAgent(commands.agent_name)).then(() => {
          return dispacth(
            updateCurrentAgent({
              name: "all_commands",
              value: commands.new_commands,
            })
          );
        });
      })
      .then(() => {
        dispacth(updateAgentCommands());
      });

  if (selectedContent === "Prompts") dispacth(addPrompts());
}

export function updateElement(selectedContent, dispacth) {
  if (selectedContent === "Agents") {
    dispacth(updateAgentCommands()).then(
      dispacth(updateAgentSettings()).then(dispacth(updateAgentName()))
    );
  }
  dispacth;
  if (selectedContent === "Prompts")
    dispacth(updatePrompt()).then(dispacth(updatePromptName()));
}

export const deleteElement = (selectedContent, dispacth) => {
  if (selectedContent === "Agents") dispacth(deleteAgent());
  if (selectedContent === "Prompts") dispacth(deletePrompt());
};
