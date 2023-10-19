import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { inviteService } from "./InviteService";


// team get full 
export const createinvite = createAsyncThunk(
    "invite/invite",
    async (formData, thunkAPI) => {
        try {
            return await inviteService.Invite(formData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

// accept invite here
export const acceptInvite = createAsyncThunk(
    "invite/accept-invite",
    async (formData, thunkAPI) => {
        try {
            return await inviteService.acceptInvite(formData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);






const initialState = {
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};


export const inviteSlice = createSlice({
    name: "invite",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createinvite.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createinvite.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.inviteData = action.payload;
                state.message = "Your Invite has been sent"
            })
            .addCase(createinvite.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(acceptInvite.pending, (state, action) => {
                state.isLoading = true
            })

            .addCase(acceptInvite.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.acceptInvite = action.payload;
                state.message = "Your Invite has been Accepted"
            })

            .addCase(acceptInvite.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })


        // .addCase(resetState, () => initialState);
    },
});


export default inviteSlice.reducer