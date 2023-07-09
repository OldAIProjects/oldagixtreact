import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import MiddleComponent from "./MiddleComponent";

function Layout({ selectedContent }) {
  return (
    <Paper
      elevation={1}
      rounded
      sx={{
        pl: 2,
        pb: 5,
        width: "100%",
        height: "100%",
      }}
    >
      <Grid
        container
        direction="row"
        spacing={2}
        sx={{ width: "100%", height: "100%"}}
      >
        <Grid item md={3} sx={{ width: "100%", height: "100%"}}>
          <Paper
            elevation={3}
            rounded
            sx={{ width: "100%", height: "100%", overflow: "auto" }}
          >
            <Typography variant="h6" component="h2" align="center">
              {selectedContent}
            </Typography>
          </Paper>
        </Grid>
        <Grid item md={7} sx={{ width: "100%", height: "100%", overflow: "hidden" }}>
          <MiddleComponent selectedContent={selectedContent} />
        </Grid>
        <Grid item md={2} sx={{ width: "100%", height: "100%"}}>
          <Paper elevation={3} rounded sx={{ width: "100%", height: "100%" }}>
            <Typography variant="h6" component="h2" align="center">
              {selectedContent}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Layout;
