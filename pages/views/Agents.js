import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const Agents = ({ selectedContent }) => {
  return (
    <Grid item xs={6}>
      <Paper elevation={3} rounded>
        <Typography variant="h6" component="h2" align="center">
          {selectedContent}
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Agents;