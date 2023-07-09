import React, { useState } from "react";

import DashBoard from "./dashBoard";
import PersistentDrawerLeft from "./views/Drawer";

import Box from "@mui/material/Box";

import { Provider } from "react-redux";

import store from "./store";

export default function App() {
  const [selectedContent, setSelectedContent] = useState("Agents");

  return (
    <Provider store={store}>
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
    </Provider>
  );
}
