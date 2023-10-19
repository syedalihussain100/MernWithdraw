import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { formService } from "./HomeService";

export const paymentForm = createAsyncThunk(
    "payment/form",
    async (formData, thunkAPI) => {
        try {
            return await formService.paymentForm(formData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);


// video get full 
export const getFullVideos = createAsyncThunk(
    "payment/videos",
    async (formData, thunkAPI) => {
        try {
            return await formService.videoGet();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);






const initialState = {
    payment: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};


export const paymentSlice = createSlice({
    name: "payment",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(paymentForm.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(paymentForm.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.paymentData = action.payload;
                state.message = "Your Payment has been approved in 8 hours!"
            })
            .addCase(paymentForm.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getFullVideos.pending, (state, action) => {
                state.isLoading = true
            })

            .addCase(getFullVideos.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.getVideos = action.payload;
                state.message = "All Videos"
            })

            .addCase(getFullVideos.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })


        // .addCase(resetState, () => initialState);
    },
});


export default paymentSlice.reducer