import { useState } from "react";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import AgentsSettings from "./AgentsSettings";
import AgentsCommands from "./AgentsCommands";
import AgentsTabs from "./AgentsTabs";

import { MiddleButton } from "../MiddleButton";
import { LeftButton } from "../LeftButton";

export function AgentsMiddle() {
  const [value, setValue] = useState("settings");

  return (
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
        {(value === "settings" && <AgentsSettings />) ||
          (value === "commands" && <AgentsCommands />)}
      </Grid>
      <Grid item xs={1}>
        <MiddleButton />
      </Grid>
    </Grid>
  );
}

export function AgentsRight() {
  return (
    <Typography variant="h6" component="h2" align="center">
      {selectedContent}
    </Typography>
  );
}

export function AgentsLeft() {
  return <LeftButton />;
}
