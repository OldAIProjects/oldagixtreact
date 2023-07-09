import { createSlice } from "@reduxjs/toolkit";

export const agentsSlice = createSlice({
  name: "agents",
  initialState: [],
  reducers: {
    addAgent: (state, action) => {
      state.push(action.payload);
    },
  },
});
