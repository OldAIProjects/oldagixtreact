import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Layout from "./views/Layout";

export default function DashBoard({ selectedContent }) {
  return (
    <>
      {selectedContent === "Agents" && (
        <Layout selectedContent={selectedContent} />
      )}
      {selectedContent === "Prompts" && (
        <Layout selectedContent={selectedContent} />
      )}
      {selectedContent === "Chains" && (
        <Layout selectedContent={selectedContent} />
      )}
      {selectedContent === "Interactions" && (
        <Layout selectedContent={selectedContent} />
      )}
    </>
  );
}
