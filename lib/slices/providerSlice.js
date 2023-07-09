import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RETRIEVE_PROVIDER } from "./types";

import { getProviders, getProviderByName } from "@/lib/api/apiEndpoints";

export const retrieveProvider = createAsyncThunk(
  "provider/retrieveProvider",
  async () => {
    const res = await getProviders();
    return res.data;
  }
);

export const retrieveProviderByName = createAsyncThunk(
  "provider/retrieveProviderByName",
  async (provider_name) => {
    const res = await getProviderByName(provider_name);
    return res.data;
  }
);

const initialState = { providers_settings: [], providers_names: [] };

export const providerSlice = createSlice({
  name: "provider",
  initialState: initialState,
  reducers: {
    retrieveProvider: (state, action) => {
        state.providers_names = action.payload;
        }
  },
  extraReducers: (builder) => {
    builder.addCase(retrieveProvider.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.providers_names = action.payload;
      
    });
    builder.addCase(retrieveProviderByName.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.providers_settings = action.payload;
    });
  },
});

export default providerSlice.reducer;
