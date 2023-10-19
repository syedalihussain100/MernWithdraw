import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { walletService } from "./withdrawService";


// register
export const createWithdraw = createAsyncThunk(
    "withdraw/create",
    async (userData, thunkAPI) => {
        try {
            return await walletService.createwallet(userData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);


// get withdraw

export const getWithdraw = createAsyncThunk(
    "withdraw/get",
    async (thunkAPI) => {
        try {
            return await walletService.getwallet();
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


export const withdrawSlice = createSlice({
    name: "withdraw",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createWithdraw.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createWithdraw.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.withData = action.payload;
                state.message = "Your Team!"
            })
            .addCase(createWithdraw.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getWithdraw.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getWithdraw.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.getwithdraw = action.payload;
                state.message = "Your Withdraw"
            })
            .addCase(getWithdraw.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })


        // .addCase(resetState, () => initialState);
    },
});


export default withdrawSlice.reducer