import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Switch from "@mui/material/Switch";

import { updateCurrentAgent } from "@/lib/actions/agentsActions";

import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

const SelectAll = (keys, value, dispacth) => {
  Object.keys(keys).map((key) => {
    dispacth(
      updateCurrentAgent({
        name: "commands",
        key: key,
        value: value,
      })
    );
  });
};

function AgentsCommands() {
  const dispatch = useDispatch();

  const keys =
    useSelector((state) => state.agent.current_agent.agent?.commands) ||
    "Loading";

  keys.sort();

  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    setSelectAll(
      !Object.values(keys === "Loading" ? [false] : keys).includes(false)
    );
  }, [keys]);

  return (
    <Box sx={{ pl: 5, overflow: "hidden" }}>
      <FormControl component="fieldset" variant="standard">
        <FormGroup>
          <FormControlLabel
            key="Select All"
            label="Select All"
            control={
              <Switch
                checked={selectAll}
                onChange={(e) => {
                  setSelectAll(e.target.checked);
                  SelectAll(keys, e.target.checked, dispatch);
                }}
                name="Select All"
              />
            }
          />
          {Object.entries(
            useSelector((state) => state.agent.current_agent.agent.commands)
          ).map(([key, value]) => {
            return (
              <FormControlLabel
                key={key}
                label={key}
                control={
                  <Switch
                    checked={value}
                    onChange={(e) => {
                      dispatch(
                        updateCurrentAgent({
                          name: "commands",
                          key: key,
                          value: e.target.checked,
                        })
                      );
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
