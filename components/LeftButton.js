import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import Stack from "@mui/material/Stack";

import { useDispatch, useSelector } from "react-redux";

import { setElement } from "@/lib/wrappers/LeftButtonWrapper";

export function LeftButton() {
  const dispatch = useDispatch();
  const selectedContent = useSelector(
    (state) => state.environment.selectedContent
  );
  const values = useSelector((state) => {
    if (selectedContent === "Agents") return state.agent.agents_names;
    if (selectedContent === "Prompts") return state.prompt.prompts_names;
  });
  return (
    <Stack sx={{ p: 2, overflowY: "auto" }} spacing={2}>
      {values.map((value, id) => {
        return (
          <Paper elevation={5} sx={{ width: "100%", height: "100%" }} key={id}>
            <Button
              sx={{ width: "100%", height: "100%" }}
              onClick={() => {
                setElement(selectedContent, value, dispatch);
              }}
            >
              <Typography variant="h6" component="h2" align="center">
                {value}
              </Typography>
            </Button>
          </Paper>
        );
      })}
    </Stack>
  );
}
