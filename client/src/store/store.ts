import { configureStore } from "@reduxjs/toolkit";
import SidebarReducer  from '../feature/sidebar/sidebarSlice';
import AddingDeviceReducer from '../feature/AddingDevice/AddingDeviceSlice'

export const store = configureStore({
  reducer: {
    sidebar: SidebarReducer,
    addingDevice: AddingDeviceReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
