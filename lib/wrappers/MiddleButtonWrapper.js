import {
  addAgents,
  updateAgentCommands,
  updateAgentSettings,
  updateCurrentAgent,
  updateAgentName,
  retrieveAgentCommandsByName,
  deleteAgent,
} from "@/lib/actions/agentsActions";

import {
  addPrompts,
  updatePrompt,
  updatePromptName,
  deletePrompt,
} from "@/lib/actions/promptsActions";

export function addElement(selectedContent, name, data, dispacth) {
  if (selectedContent === "Agents")
    dispacth(addAgents(name, data))
      .then(() => {
        return dispacth(retrieveAgentCommandsByName(name));
      })
      .then((commands) => {
        return Promise.allSettled(
          Object.values(
            Object.entries(commands).map(([key, value]) => {
              if (!Object.keys(data.agent.commands).includes(key))
                return dispacth(
                  updateCurrentAgent({
                    name: "commands",
                    key: key,
                    value: value,
                  })
                );
            })
          )
        );
      })
      .then(dispacth(updateAgentCommands(name, data)));

  if (selectedContent === "Prompts") dispacth(addPrompts());
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
    dispacth(updatePrompt()).then(dispacth(updatePromptName()));
}

export const deleteElement = (selectedContent, name, dispacth) => {
  if (selectedContent === "Agents") dispacth(deleteAgent(name));
  if (selectedContent === "Prompts") dispacth(deletePrompt());
};
