import { config } from "../../../utils/axiosConfig";
import axios from "axios";


const Invite = async (formData) => {
    const response = await axios.post('http://localhost:4000/api/invite/generate-invite', formData, config, {
        headers: {
            'Content-Type': 'multipart/form-data', // Important for Multer to handle the file
        },
    });

    return response.data
}

//  accept invite here


const acceptInvite = async (formData) => {
    const response = await axios.post(`http://localhost:4000/api/invite/accept-invite/${formData.inviteToken}`, {
        username: formData?.username,
        email: formData?.email,
        phone: formData?.phone,
        password: formData?.password
    }, {
    });

    return response.data
}








export const inviteService = { Invite, acceptInvite }