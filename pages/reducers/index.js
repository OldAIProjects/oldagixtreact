import { combineReducers } from "redux";
import agentReducer from "./agentReducer";
import providerReducer from "./providerReducer";

export default combineReducers({
    agent: agentReducer,
    provider: providerReducer,
});