import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { updateCurrentPrompt } from "@/lib/actions/promptsActions";

import { useSelector, useDispatch } from "react-redux";

export function PromptArea() {
  const dispatch = useDispatch();
  return (
    <Box sx={{ p: 1, width: "100%", height: "100%", overflow: "hidden" }}>
      <TextField
        id="outlined-basic"
        label="Prompt"
        required
        multiline
        variant="outlined"
        fullWidth
        value={useSelector((state) => state.prompt.current_prompt.prompt)}
        sx={{
          "& .MuiInputBase-root": {
            height: "100%",
            alignItems: "flex-start",
          },
          height: "100%",
        }}
        inputProps={{
          style: {
            height: "100%",
            overflow: "auto",
          },
        }}
        onChange={(e) => {
          dispatch(
            updateCurrentPrompt({ name: "prompt", value: e.target.value })
          );
        }}
      />
    </Box>
  );
}
