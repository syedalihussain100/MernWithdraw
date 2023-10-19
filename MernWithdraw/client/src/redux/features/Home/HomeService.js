import axios from "axios";
import { config } from "../../../utils/axiosConfig"


// payment form data here


const paymentForm = async (formData) => {
    const response = await axios.post('http://localhost:4000/api/payment/createpayment', formData, config, {
        headers: {
            'Content-Type': 'multipart/form-data', // Important for Multer to handle the file
        },
    });

    return response.data
}


// all videos get here

const videoGet = async (formData) => {
    const response = await axios.get('http://localhost:4000/api/video/get-videos', config);

    return response.data
}







export const formService = {
    paymentForm,
    videoGet
}