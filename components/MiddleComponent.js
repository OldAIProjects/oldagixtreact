import Paper from "@mui/material/Paper";

import { AgentsMiddle } from "./agentsComponents/Agents";
import { useSelector } from "react-redux";

function MiddleComponent() {
  const selectedContent = useSelector(
    (state) => state.environment.selectedContent
  );
  return (
    <Paper
      elevation={3}
      rounded={+true}
      sx={{ width: "100%", height: "100%", pt: 2 }}
    >
      <>{selectedContent === "Agents" && <AgentsMiddle />}</>
    </Paper>
  );
}

export default MiddleComponent;
