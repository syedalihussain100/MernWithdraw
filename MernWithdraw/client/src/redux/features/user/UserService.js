import axios from "axios";
import { config } from "../../../utils/axiosConfig";




// register
const register = async (userData) => {
    const response = await axios.post("http://localhost:4000/api/user/register", userData);
    return response?.data;
};


// login
const login = async (userData) => {
    const response = await axios.post("http://localhost:4000/api/user/login", userData);

    if (response?.data) {
        localStorage.setItem("user", JSON.stringify(response?.data));
    }

    return response?.data;
};


// logout
const logout = async () => {
    const response = await axios.get("http://localhost:4000/api/user/logout");
    return response?.data;

};


// getAllusers
const getUsers = async (userData) => {
    const response = await axios.get("http://localhost:4000/api/user/allusers", config);

    return response?.data;
};

// user active
const UserActive = async (userData) => {
    const response = await axios.get("http://localhost:4000/api/user/user-active", config);

    return response?.data;
};


// update profile
const UpdateProfile = async (userData) => {
    const response = await axios.put(`http://localhost:4000/api/user/update-profile`, {
        username: userData?.username,
        email: userData?.email,
        phone: userData?.phone
    }, config);

    return response?.data;
};


// wallet update 
const UpdateWallet = async (userData) => {
    const response = await axios.post(`http://localhost:4000/api/user/watch-video`, userData, config);

    return response?.data;
};





// GetProfile
const GetProfile = async (userData) => {
    const response = await axios.get("http://localhost:4000/api/user/get-profile", config);

    return response?.data;
};











export const authService = {
    register,
    login,
    logout,
    getUsers,
    UserActive,
    UpdateProfile,
    GetProfile,
    UpdateWallet
}