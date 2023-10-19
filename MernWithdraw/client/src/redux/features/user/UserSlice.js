import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { authService } from "./UserService";


// register
export const registerUser = createAsyncThunk(
    "auth/register",
    async (userData, thunkAPI) => {
        try {
            return await authService.register(userData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

// login
export const loginUser = createAsyncThunk(
    "auth/login",
    async (userData, thunkAPI) => {
        try {
            return await authService.login(userData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);


// logout
export const logoutUser = createAsyncThunk(
    "auth/logout",
    async (userData, thunkAPI) => {
        try {
            return await authService.logout();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);


// all users
export const AllUsers = createAsyncThunk(
    "auth/users",
    async (userData, thunkAPI) => {
        try {
            return await authService.getUsers();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);


// userActive
export const UserActive = createAsyncThunk(
    "auth/user-active",
    async (userData, thunkAPI) => {
        try {
            return await authService.UserActive();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);


// update profile 

export const UpdateProfile = createAsyncThunk(
    "auth/update-profile",
    async (userData, thunkAPI) => {
        try {
            return await authService.UpdateProfile(userData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

// update wallet
export const UpdateWallet = createAsyncThunk(
    "auth/update-wallet",
    async (userData, thunkAPI) => {
        try {
            return await authService.UpdateWallet(userData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);





// get Profile
export const GetProfile = createAsyncThunk(
    "auth/get-profile",
    async (userData, thunkAPI) => {
        try {
            return await authService.GetProfile();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);








//   Reset here
export const resetState = createAction("Reset_all");

const getCustomerfromLocalStorage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

const initialState = {
    user: getCustomerfromLocalStorage,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};


export const userSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdUser = action.payload;
                state.message = "Register Successfully!"
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                //   if (state.isError === true) {
                //     toast.error(action.payload.response.data.message);
                //   }
            })
            .addCase(loginUser.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false;
                state.isSuccess = true;
                state.logInUser = action.payload;
                state.message = "Login Successfully!"
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(logoutUser.pending, (state, action) => {
                state.isLoading = false
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false;
                state.isSuccess = true;
                state.logoutuser = action.payload;
                state.message = "Logout Successfully!"
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(AllUsers.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(AllUsers.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false;
                state.isSuccess = true;
                state.allUser = action.payload;
                state.message = "All Users"
            })

            .addCase(AllUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = "Something Went Wrong";
            })
            .addCase(UserActive.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(UserActive.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false;
                state.isSuccess = true;
                state.activeUser = action.payload;
                state.message = "Users Active"
            })

            .addCase(UserActive.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = "Something Went Wrong";
            })
            .addCase(UpdateProfile.pending, (state, action) => {
                state.isLoading = true
            })

            .addCase(UpdateProfile.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false;
                state.isSuccess = true;
                state.updateProfile = action.payload;
                state.message = "User has been Updated"
            })

            .addCase(UpdateProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = "Something Went Wrong";
            })
            .addCase(GetProfile.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(GetProfile.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false;
                state.isSuccess = true;
                state.getProfile = action.payload;
                state.message = "Your Profile"
            })

            .addCase(GetProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = "Something Went Wrong";
            })

            .addCase(UpdateWallet.pending, (state, action) => {
                state.isLoading = true
            })

            .addCase(UpdateWallet.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false;
                state.isSuccess = true;
                state.updatewallet = action.payload;
                state.message = "congratulations!"
                setTimeout(() => {
                    window.alert("congratulations!")
                }, 2000);
            })
            .addCase(UpdateWallet.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true;
                state.isSuccess = false;
                state.message = "You will be able to watch the video after 24 hours";
                setTimeout(() => {
                    window.alert("You will be able to watch the video after 24 hours")
                }, 2000);
            })

            .addCase(resetState, () => initialState);
    },
});


export default userSlice.reducer