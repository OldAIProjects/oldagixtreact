import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";

import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { updateCurrentAgent } from "@/lib/actions/agentsActions";

const ProvidersRender = () => {
  return (
    <>
      {Object.entries(
        useSelector((state) => state.agent.current_agent.agent?.settings) ||
          useSelector((state) => state.provider.providers_settings[0])
      ).map(([key, value], id) => {
        const default_keys = ["name", "provider", "embedder"];

        if (default_keys.includes(key) === false) {
          return (
            <Grid item xs={4} key={key}>
              <TextField
                id={id.toString().concat("_", key)}
                label={key}
                defaultValue={value}
                fullWidth
                onChange={(e) => {}}
              />
            </Grid>
          );
        }
      })}
    </>
  );
};

const AgentsSettings = () => {
  const [currentProvider, setcurrentProvider] = useState("runpod");
  const [currentEmbeddingProviders, setCurrentProvider] = useState("azure");

  const dispatch = useDispatch();

  return (
    <Box sx={{ padding: 2, overflow: "hidden" }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            id={"name"}
            required
            fullWidth
            value={
              useSelector((state) => state.agent.current_agent?.name) ||
              "loading"
            }
            label={"Name"}
            onChange={(e) => {
              dispatch(
                updateCurrentAgent({ name: "name", value: e.target.value })
              );
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <Autocomplete
            options={useSelector((state) => state.provider.providers_names)}
            value={
              useSelector(
                (state) => state.agent.current_agent.agent?.settings.provider
              ) || "loading"
            }
            autoComplete
            fullWidth
            onChange={(e, newValue) => {
              dispatch(
                updateCurrentAgent({
                  name: "settings",
                  key: "provider",
                  value: newValue,
                })
              );
            }}
            id={"providers"}
            renderInput={(params) => (
              <TextField {...params} label={"providers"} />
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <Autocomplete
            options={useSelector((state) => state.provider.embedding_providers)}
            value={
              useSelector(
                (state) => state.agent.current_agent.agent?.settings.embedder
              ) || "loading"
            }
            autoComplete
            fullWidth
            onChange={(e, newValue) => {
              setCurrentProvider(
                newValue !== null
                  ? dispatch(
                      updateCurrentAgent({
                        name: "settings",
                        key: "embedder",
                        value: newValue,
                      })
                    )
                  : useSelector(
                      (state) =>
                        state.agent.current_agent.agent.settings.embedder
                    )
              );
            }}
            id={"embedders"}
            renderInput={(params) => (
              <TextField {...params} label={"embedders"} />
            )}
          />
        </Grid>
        <ProvidersRender />
      </Grid>
    </Box>
  );
};

export default AgentsSettings;
