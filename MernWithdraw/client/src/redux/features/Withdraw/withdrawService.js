import axios from "axios";
import { config } from "../../../utils/axiosConfig";


// create wallet

const createwallet = async (userData) => {
    const response = await axios.post("http://localhost:4000/api/draw/create-withdraw",userData, config);
    return response?.data;
};

// get wallet
const getwallet = async () => {
    const response = await axios.get("http://localhost:4000/api/draw/total-withdraw", config);
    return response?.data;
};





export const walletService = {
    createwallet,
    getwallet
}

