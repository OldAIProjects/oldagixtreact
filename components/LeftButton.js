import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { useDispatch, useSelector } from "react-redux";

import { setElement } from "@/lib/wrappers/LeftButtonWrapper";

export function LeftButton() {
  const dispatch = useDispatch();
  const selectedContent = useSelector(
    (state) => state.environment.selectedContent
  );
  const values = useSelector((state) => {
    if (selectedContent === "Agents") return state.agent.agents_names;
  });
  return (
    <Grid
      container
      direction="column"
      spacing={2}
      sx={{ p: 2, overflowY: "auto" }}
    >
      {values.map((value) => {
        return (
          <Grid item xs key={value}>
            <Paper elevation={5} sx={{ width: "100%", height: "100%" }}>
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
          </Grid>
        );
      })}
    </Grid>
  );
}
