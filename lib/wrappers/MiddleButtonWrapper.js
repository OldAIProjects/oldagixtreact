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

export function addElement(selectedContent, dispacth) {
  if (selectedContent === "Agents")
    dispacth(addAgents())
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
      .then(dispacth(updateAgentCommands()));

  if (selectedContent === "Prompts") dispacth(addPrompts());
}

export function updateElement(selectedContent, dispacth) {
  if (selectedContent === "Agents") {
    dispacth(updateAgentCommands()).then(
      dispacth(updateAgentSettings()).then(
        dispacth(updateAgentName())
      )
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
