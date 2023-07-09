import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ButtonGroup from "@mui/material/ButtonGroup";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import UpgradeRoundedIcon from "@mui/icons-material/UpgradeRounded";

import { use, useState } from "react";

import AgentsSettings from "./agentsComponents/AgentsSettings";
import AgentsCommands from "./agentsComponents/AgentsCommands";
import AgentsTabs from "./agentsComponents/AgentsTabs";

import {
  addElement,
  updateElement,
  deleteElement,
} from "@/lib/wrappers/MiddleButtonWrapper";
import { useSelector } from "react-redux";

function MiddleComponent({ name, setName, data, setData }) {
  const [value, setValue] = useState("settings");

  const selectedContent = useSelector((state) => state.environment);

  return (
    <Paper elevation={3} rounded sx={{ width: "100%", height: "100%", pt: 2 }}>
      <Grid
        container
        direction="column"
        spacing={1}
        sx={{ height: "100%", overflow: "hidden" }}
      >
        <Grid item xs={1}>
          <Box display="flex" justifyContent="center">
            {selectedContent === "Agents" && (
              <AgentsTabs value={value} setValue={setValue} />
            )}
          </Box>
        </Grid>
        <Grid item xs={10} sx={{ overflow: "auto" }}>
          {selectedContent === "Agents" &&
            ((value === "settings" && <AgentsSettings setData={setData} />) ||
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
                    addElement(selectedContent, data, name);
                  }}
                >
                  Create
                </Button>
                <Button
                  startIcon={<UpgradeRoundedIcon />}
                  onClick={() => {
                    updateElement(selectedContent, data, name);
                  }}
                >
                  Update
                </Button>
                <Button
                  startIcon={<DeleteRoundedIcon />}
                  onClick={() => {
                    deleteElement({ selectedContent: selectedContent });
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
