import React, { useState } from "react";

import DashBoard from "./dashBoard";
import PersistentDrawerLeft from "./views/Drawer";

import Box from "@mui/material/Box";

export default function App() {
  const [selectedContent, setSelectedContent] = useState("Agents");

  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "98vh",
        overflow: "hidden",
      }}
    >
      <PersistentDrawerLeft contentHandler={setSelectedContent}>
        <DashBoard selectedContent={selectedContent} />
      </PersistentDrawerLeft>
    </Box>
  );
}
