import { useSelector } from "react-redux";

import Typography from "@mui/material/Typography";

export default function RightComponent() {
  const selectedContent = useSelector((state) => state.environment);
  return (
    <Typography variant="h6" component="h2" align="center">
      {selectedContent}
    </Typography>
  );
}
