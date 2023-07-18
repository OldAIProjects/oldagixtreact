import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import { updateCurrentPrompt } from "@/lib/actions/promptsActions";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { PromptArea } from "./PromptArea";

import { MiddleButton } from "../MiddleButton";

export function PromptsMiddle() {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  return (
    <Box sx={{ p: 1, height: "100%", top: 2 }}>
      <Stack spacing={1} sx={{ height: "100%" }}>
        <Box padding={1}>
          <TextField
            required
            fullWidth
            error={error}
            label="Title"
            value={useSelector((state) => state.prompt.current_prompt.new_name)}
            onChange={(e) => {
              e.target.value === "" ? setError(true) : setError(false);
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
