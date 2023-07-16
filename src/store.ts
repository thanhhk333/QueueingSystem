import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import roleManagementReducer from "./page/management/role/redux/roleManagementSlice";
import deviceSlice from "./page/device/redux/deviceSlice";
import serviceSlice from "./page/service/redux/serviceSilece";
import accountSlice from "./page/management/account/redux/AccountSlice";
import progressiveSlice from "./page/progressive/redux/progressiveSlice";
import userLogSlice from "./page/management/user/userLogSlice";

const store = configureStore({
    reducer: {
        roleManagement: roleManagementReducer,
        device: deviceSlice,
        service: serviceSlice,
        account: accountSlice,
        progressive: progressiveSlice,
        userLog: userLogSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

export default store;
