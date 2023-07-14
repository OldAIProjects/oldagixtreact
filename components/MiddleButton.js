import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import UpgradeRoundedIcon from "@mui/icons-material/UpgradeRounded";

import {
  addElement,
  updateElement,
  deleteElement,
} from "@/lib/wrappers/MiddleButtonWrapper";

import { useSelector, useDispatch } from "react-redux";

export const MiddleButton = () => {
  const dispatch = useDispatch();

  const selectedContent = useSelector(
    (state) => state.environment.selectedContent
  );

  const name = useSelector((state) => {
    if (selectedContent === "Agents") return state.agent.current_agent.name;
    if (selectedContent === "Prompts") return state.prompt.current_prompt.name;
  });

  const data = useSelector((state) => {
    if (selectedContent === "Agents") return state.agent.current_agent;
    if (selectedContent === "Prompts") return state.prompt.current_prompt;
  });
  return (
    <Box display="flex" justifyContent="center">
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
    </Box>
  );
};
