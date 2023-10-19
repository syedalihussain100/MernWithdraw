import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { TeamSerice } from "./TeamService";


// team get full 
export const getTeam = createAsyncThunk(
    "team/get-full",
    async (formData, thunkAPI) => {
        try {
            return await TeamSerice.TeamGet();
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


export const teamSlice = createSlice({
    name: "team",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTeam.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTeam.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.teamData = action.payload;
                state.message = "Your Team!"
            })
            .addCase(getTeam.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })


        // .addCase(resetState, () => initialState);
    },
});


export default teamSlice.reducer