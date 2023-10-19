import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/user/UserSlice";
import homeReducer from "./features/Home/HomeSlice";
import teamReducer from "./features/Team/TeamSlice";
import inviteReducer from "./features/Invite/InviteSlice";
import withdrawReducer from "./features/Withdraw/withdrawSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        payment: homeReducer,
        team: teamReducer,
        invite: inviteReducer,
        withdraw: withdrawReducer
    },
});