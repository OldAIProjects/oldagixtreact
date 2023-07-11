import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Button, Grid, Paper } from "@mui/material";

import { setCurrentAgent } from "@/lib/actions/agentsActions";

export default function LeftComponent() {
  const selectedContent = useSelector((state) => state.environment.selectedContent);
  const dispatch = useDispatch();

  if (selectedContent === "Agents") {
    return (
      <Grid
        container
        direction="column"
        spacing={2}
        sx={{ p: 2, overflowY: "auto" }}
      >
        {useSelector((state) => state.agent.agents_names).map((value) => {
          return (
            <Grid item xs key={value}>
              <Paper elevation={5} sx={{ width: "100%", height: "100%" }}>
                <Button
                  sx={{ width: "100%", height: "100%" }}
                  onClick={() => {
                    dispatch(setCurrentAgent(value));
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
}
