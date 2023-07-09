import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";

import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import {
  retrieveProvider,
  retrieveProviderByName,
} from "@/lib/actions/providerActions";

function ProvidersRender({ agentData, setAgentData }) {
  return (
    <>
      {Object.entries(agentData.settings).map(([key, value], id) => {
        const default_keys = ["name", "provider"];

        if (default_keys.includes(key) === false) {
          return (
            <Grid item xs={4}>
              <TextField
                id={id.toString().concat("_", key)}
                label={key}
                defaultValue={value}
                fullWidth
                onChange={(e) =>
                  setAgentData({
                    ...agentData,
                    settings: {
                      ...agentData.settings,
                      [key]: e.target.value,
                    },
                  })
                }
              />
            </Grid>
          );
        }
      })}
    </>
  );
}

const AgentsSettings = () => {
  // providers handling
  const [providers, setProviders] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveProvider())
      .then((res) => {
        setProviders(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [providers]);

  // agent data based on provider hlanding
  const [currentProvider, setcurrentProvider] = useState("openai");
  const [agentData, setAgentData] = useState();

  useEffect(() => {
    dispatch(retrieveProviderByName(currentProvider))
      .then((res) => {
        console.log(res);
        setAgentData({
          ...agentData,
          settings: res.settings,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentProvider]);

  return (
    <Box sx={{ padding: 2, overflow: "hidden" }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            id={"name"}
            required
            fullWidth
            label={"Name"}
            onChange={(e) =>
              setAgentData({
                ...agentData,
                settings: { ...agentData.settings, name: e.target.value },
              })
            }
          />
        </Grid>
        <Grid item xs={4}>
          <Autocomplete
            options={!providers ? [currentProvider] : providers}
            value={currentProvider}
            autoComplete
            fullWidth
            onChange={(e, newValue) => {
              setAgentData({
                ...agentData,
                settings: { ...agentData.settings, provider: newValue },
              });
              setcurrentProvider(
                newValue !== null ? newValue : currentProvider
              );
            }}
            id={"providers"}
            renderInput={(params) => (
              <TextField {...params} label={"providers"} />
            )}
          />
        </Grid>
        {agentData && (
          <ProvidersRender agentData={agentData} setAgentData={setAgentData} />
        )}
      </Grid>
    </Box>
  );
};

export default AgentsSettings;
