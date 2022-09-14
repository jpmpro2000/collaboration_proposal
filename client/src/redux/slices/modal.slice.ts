import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface ModalState {
  isOpen: boolean;
}

// Define the initial state using that type
const initialState: ModalState = {
  isOpen: false,
};

export const modalSlice = createSlice({
  name: "modal",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    open: (state) => {
      state.isOpen = true;
    },
    close: (state) => {
      state.isOpen = false;
    },
  },
});

export const { open, close } = modalSlice.actions;
export default modalSlice.reducer;
