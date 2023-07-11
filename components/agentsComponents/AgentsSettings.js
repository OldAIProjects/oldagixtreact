import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";

import { useSelector, useDispatch } from "react-redux";

import { updateCurrentAgent } from "@/lib/actions/agentsActions";
import { retrieveProviderByName } from "@/lib/actions/providerActions";

const ProvidersRender = () => {
  return (
    <>
      {Object.entries(
        useSelector((state) => state.agent.current_agent.agent?.settings) ||
          "Loading"
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
  const dispatch = useDispatch();

  const current_embedder =
    useSelector(
      (state) => state.agent.current_agent.agent?.settings.embedder
    ) || "Loading";

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
              dispatch(retrieveProviderByName(newValue)).then((res) => {
                dispatch(
                  updateCurrentAgent({
                    name: "update_provider",
                    key: res,
                    value: current_embedder,
                  })
                );
              });
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
              dispatch(
                updateCurrentAgent({
                  name: "settings",
                  key: "embedder",
                  value: newValue,
                })
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
