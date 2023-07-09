import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Switch from "@mui/material/Switch";

import { useEffect, useState } from "react";

import { retrieveAgentCommandsByName } from "@/lib/actions/agentsActions";

import { useDispatch } from "react-redux";

function AgentsCommands() {
  const [commands, setCommands] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveAgentCommandsByName("OobaStarchat"))
      .then((res) => {
        setCommands(res.commands);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Box sx={{ pl: 5, overflow: "hidden" }}>
      <FormControl component="fieldset" variant="standard">
        <FormGroup>
          {Object.entries(commands).map(([key, value]) => {
            return (
              <FormControlLabel
                label={key}
                control={
                  <Switch
                    checked={value}
                    onChange={(e) => {
                      setCommands({
                        ...commands,
                        [key]: e.target.checked,
                      });
                    }}
                    name={key}
                  />
                }
              />
            );
          })}
        </FormGroup>
      </FormControl>
    </Box>
  );
}

export default AgentsCommands;
