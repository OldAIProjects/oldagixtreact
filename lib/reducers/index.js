import { combineReducers } from "redux";
import agentReducer from "./agentReducer";
import providerReducer from "./providerReducer";
import environmentReducer from "./environmentReducer";
import promptReducer from "./promptsReducer";

export default combineReducers({
  agent: agentReducer,
  provider: providerReducer,
  environment: environmentReducer,
  prompt: promptReducer,
});
