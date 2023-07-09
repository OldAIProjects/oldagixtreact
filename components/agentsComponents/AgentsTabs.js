import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export default function AgentsTabs({ value, setValue }) {
  return (
    <Tabs
      value={value}
      onChange={(e, newValue) => {
        setValue(newValue);
      }}
      centered
    >
      <Tab label="Settings" value="settings"/>
      <Tab label="Commands" value="commands" />
    </Tabs>
  );
}
