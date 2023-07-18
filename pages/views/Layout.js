import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";

import MiddleComponent from "@/components/MiddleComponent";
import LeftComponent from "@/components/LeftComponent";

function Layout() {
  return (
    <Paper
      rounded={+true}
      elevation={1}
      sx={{
        p: 2,
        width: "100%",
        height: "95%",
      }}
    >
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{height: "100%"}}
      >
        <Paper
          rounded={+true}
          elevation={3}
          sx={{ width: "33%", height: "100%", overflow: "auto" }}
        >
          <LeftComponent />
        </Paper>
        <MiddleComponent />
      </Stack>
    </Paper>
  );
}

export default Layout;
