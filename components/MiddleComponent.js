import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ButtonGroup from "@mui/material/ButtonGroup";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import UpgradeRoundedIcon from "@mui/icons-material/UpgradeRounded";

import { useState } from "react";

import AgentsSettings from "./agentsComponents/AgentsSettings";
import AgentsCommands from "./agentsComponents/AgentsCommands";
import AgentsTabs from "./agentsComponents/AgentsTabs";

import {
  addElement,
  updateElement,
  deleteElement,
} from "@/lib/wrappers/MiddleButtonWrapper";

import { useSelector, useDispatch } from "react-redux";

function MiddleComponent() {
  const [value, setValue] = useState("settings");

  const selectedContent = useSelector(
    (state) => state.environment.selectedContent
  );

  const dispatch = useDispatch();

  const name = useSelector((state) => {
    if (selectedContent === "Agents") return state.agent.current_agent.name;
    // if (selectedContent === "Prompts") return state.prompt.prompt_name;
  });

  const data = useSelector((state) => {
    if (selectedContent === "Agents") return state.agent.current_agent;
    // if (selectedContent === "Prompts") return state.prompt.current_prompt;
  });

  const isAgentsLoading = useSelector(
    (state) => state.environment.isAgentsLoading
  );

  return (
    <Paper
      elevation={3}
      rounded={+true}
      sx={{ width: "100%", height: "100%", pt: 2 }}
    >
      <Grid
        container
        direction="column"
        spacing={1}
        sx={{ height: "100%", overflow: "hidden" }}
      >
        <Grid item xs={1}>
          <Box display="flex" justifyContent="center">
            {isAgentsLoading
              ? <></>
              : selectedContent === "Agents" && (
                  <AgentsTabs value={value} setValue={setValue} />
                )}
          </Box>
        </Grid>
        <Grid item xs={10} sx={{ overflow: "auto" }}>
          {isAgentsLoading
            ? <></>
            : selectedContent === "Agents" &&
              ((value === "settings" && <AgentsSettings />) ||
                (value === "commands" && <AgentsCommands />))}
        </Grid>
        <Grid item xs={1}>
          <Box display="flex" justifyContent="center">
            {(selectedContent === "Prompts" ||
              selectedContent === "Agents" ||
              selectedContent === "Chains") && (
              <ButtonGroup
                orientation="horizontal"
                aria-label="horizontal contained button group"
                variant="text"
              >
                <Button
                  startIcon={<AddRoundedIcon />}
                  onClick={() => {
                    addElement(selectedContent, name, data, dispatch);
                  }}
                >
                  Create
                </Button>
                <Button
                  startIcon={<UpgradeRoundedIcon />}
                  onClick={() => {
                    updateElement(selectedContent, name, data, dispatch);
                  }}
                >
                  Update
                </Button>
                <Button
                  startIcon={<DeleteRoundedIcon />}
                  onClick={() => {
                    deleteElement(selectedContent, name, dispatch);
                  }}
                >
                  Delete
                </Button>
              </ButtonGroup>
            )}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default MiddleComponent;
