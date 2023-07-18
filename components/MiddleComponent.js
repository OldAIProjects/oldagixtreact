import Paper from "@mui/material/Paper";

import { AgentsMiddle } from "./agentsComponents/Agents";
import { PromptsMiddle } from "./promptsComponents/Prompts";
import { useSelector } from "react-redux";

function MiddleComponent() {
  const selectedContent = useSelector(
    (state) => state.environment.selectedContent
  );
  return (
    <Paper
      elevation={3}
      rounded={+true}
      sx={{ width: "100%", height: "100%"}}
    >
      {selectedContent === "Agents" && <AgentsMiddle />}
      {selectedContent === "Prompts" && <PromptsMiddle />}
      {(selectedContent === "Chains" || selectedContent === "Interactions") && (
        <div></div>
      )}
    </Paper>
  );
}

export default MiddleComponent;
