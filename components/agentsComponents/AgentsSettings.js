import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";

import { useSelector, useDispatch } from "react-redux";

import { updateCurrentAgent } from "@/lib/actions/agentsActions";
import { retrieveProviderByName } from "@/lib/actions/providerActions";

const ProvidersRender = () => {
  const dispatch = useDispatch();
  return (
    <>
      {Object.entries(
        useSelector((state) => state.agent.current_agent.agent?.settings) || {
          loading: "Loading",
        }
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
                onChange={(e) => {
                  dispatch(
                    updateCurrentAgent({
                      name: "settings",
                      key: key,
                      value: e.target.value,
                    })
                  );
                }}
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
    ) || "";

  const current_provider =
    useSelector(
      (state) => state.agent.current_agent.agent?.settings.provider
    ) || "";

  const name = useSelector((state) => state.agent.current_agent?.name) || "";

  return (
    <Box sx={{ padding: 2, overflow: "hidden" }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            id={"name"}
            required
            fullWidth
            value={
              useSelector((state) => state.agent.current_agent?.new_name) ||
              name
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
            value={current_provider}
            autoComplete
            fullWidth
            onChange={(e, newValue) => {
              if (newValue) {
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
              } else {
                return current_provider;
              }
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
            value={current_embedder}
            autoComplete
            fullWidth
            onChange={(e, newValue) => {
              newValue
                ? dispatch(
                    updateCurrentAgent({
                      name: "settings",
                      key: "embedder",
                      value: newValue,
                    })
                  )
                : current_embedder;
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
