import { useState } from "react";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Grow from "@mui/material/Collapse";

import AgentsSettings from "./AgentsSettings";
import AgentsCommands from "./AgentsCommands";
import AgentsTabs from "./AgentsTabs";

import { MiddleButton } from "../MiddleButton";
import { LeftButton } from "../LeftButton";

export function AgentsMiddle() {
  const [value, setValue] = useState("settings");

  return (
    <Box sx={{ p: 1, height: "100%" }}>
      <Grid
        container
        direction="column"
        spacing={1}
        sx={{ height: "100%", overflow: "hidden" }}
      >
        <Grid item xs={1}>
          <Box display="flex" justifyContent="center">
            <AgentsTabs value={value} setValue={setValue} />
          </Box>
        </Grid>
        <Grid item xs={10} sx={{ overflow: "auto" }}>
          <Grow
            in={value === "settings"}
            style={{ transformOrigin: "0 0 0" }}
            {...(value === "settings" ? { timeout: 300 } : {})}
          >
            <AgentsSettings />
          </Grow>

          <Grow
            in={value === "commands"}
            style={{ transformOrigin: "0 0 0" }}
            {...(value === "commands" ? { timeout: 500 } : {})}
          >
            <AgentsCommands />
          </Grow>
          <Grow
            in={value === "extensions"}
            style={{ transformOrigin: "0 0 0" }}
            {...(value === "extensions" ? { timeout: 500 } : {})}
          >
            <div>"WIP"</div>
          </Grow>
        </Grid>
        <Grid item xs={1}>
          <MiddleButton />
        </Grid>
      </Grid>
    </Box>
  );
}

export function AgentsLeft() {
  return <LeftButton />;
}
