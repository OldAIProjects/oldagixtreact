import Box from "@mui/material/Box";

import { useDispatch, useSelector } from "react-redux";

import { defaultLoad } from "@/lib/loader";
import PersistentDrawerLeft from "./views/Drawer";

export default function App() {
  const dispatch = useDispatch();
  defaultLoad(dispatch);
  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "98vh",
        overflow: "hidden",
      }}
    >
      <PersistentDrawerLeft />
    </Box>
  );
}
