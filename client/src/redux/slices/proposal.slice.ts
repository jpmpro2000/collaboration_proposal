import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

import { Proposal } from "../../types";

// Define a type for the slice state
interface ProposalState {
  data: Proposal | null;
}

// Define the initial state using that type
const initialState: ProposalState = {
  data: null,
};

export const proposalSlice = createSlice({
  name: "proposal",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Proposal>) => {
      state.data = action.payload;
    },
    remove: (state) => {
      state.data = null;
    },
  },
});

export const { add, remove } = proposalSlice.actions;
// Other code such as selectors can use the imported `RootState` type
export const proposalData = (state: RootState) => state.proposal.data;
export default proposalSlice.reducer;
