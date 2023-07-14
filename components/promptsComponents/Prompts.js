import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import { updateCurrentPrompt } from "@/lib/actions/promptsActions";

import { useDispatch } from "react-redux";

import { PromptArea } from "./PromptArea";

import { MiddleButton } from "../MiddleButton";
import { useSelector } from "react-redux";

export function PromptsMiddle() {
  const dispatch = useDispatch();
  return (
    <Box sx={{ p: 1, height: "100%", top: 2 }}>
      <Stack spacing={1} sx={{ height: "100%" }}>
        <Box padding={1}>
          <TextField
            required
            fullWidth
            label="Title"
            value={useSelector((state) => state.prompt.current_prompt.new_name)}
            onChange={(e) => {
              dispatch(
                updateCurrentPrompt({ name: "name", value: e.target.value })
              );
            }}
          />
        </Box>
        <PromptArea />
        <MiddleButton />
      </Stack>
    </Box>
  );
}
