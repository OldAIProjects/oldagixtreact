import React, { useState } from "react";

import PersistentDrawerLeft from "./views/Drawer";

import Box from "@mui/material/Box";

export default function App() {
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
