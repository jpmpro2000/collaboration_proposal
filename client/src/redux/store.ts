import { configureStore } from "@reduxjs/toolkit";

import modalReducer from "./slices/modal.slice";
import proposalReducer from "./slices/proposal.slice";

const store = configureStore({
  reducer: {
    modal: modalReducer,
    proposal: proposalReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
