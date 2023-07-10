import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import MiddleComponent from "@/components/MiddleComponent";
import LeftComponent from "@/components/LeftComponent";
import RightComponent from "@/components/RightComponent";

function Layout() {
  return (
    <Paper
      rounded={+true}
      elevation={1}
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
        sx={{ width: "100%", height: "100%" }}
      >
        <Grid item md={3} sx={{ width: "100%", height: "100%" }}>
          <Paper
            rounded={+true}
            elevation={3}
            sx={{ width: "100%", height: "100%", overflow: "auto" }}
          >
            <LeftComponent />
          </Paper>
        </Grid>
        <Grid
          item
          md={7}
          sx={{ width: "100%", height: "100%", overflow: "hidden" }}
        >
          <MiddleComponent />
        </Grid>
        <Grid item md={2} sx={{ width: "100%", height: "100%" }}>
          <Paper rounded={+true} elevation={3} sx={{ width: "100%", height: "100%" }}>
            <RightComponent />
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Layout;
