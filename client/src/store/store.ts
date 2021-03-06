import { configureStore } from "@reduxjs/toolkit";
import SidebarReducer  from '../feature/sidebar/sidebarSlice';
import AddingDeviceReducer from '../feature/AddingDevice/AddingDeviceSlice'
import HostnameReducer  from '../feature/hostname/hostname';
import FakeDeviceReducer from '../feature/FakeDevice/fakeDeviceSlice'
import ViwaterReducer from '../feature/viwater/ViwaterSlice'
import ProvinceReducer from '../feature/province/ProvinceSlice';

export const store = configureStore({
  reducer: {
    sidebar: SidebarReducer,
    addingDevice: AddingDeviceReducer,
    hostname: HostnameReducer,
    fakeDevice: FakeDeviceReducer,
    viwater: ViwaterReducer,
    province: ProvinceReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
