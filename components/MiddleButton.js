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

  return (
    <Box display="flex" justifyContent="center">
      <ButtonGroup
        orientation="horizontal"
        aria-label="horizontal contained button group"
        variant="text"
        size="large"
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
