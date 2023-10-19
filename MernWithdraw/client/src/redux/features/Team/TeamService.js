import { config } from "../../../utils/axiosConfig";
import axios from "axios";


const TeamGet = async () => {
    const response = await axios.get('http://localhost:4000/api/team/allteam', config);

    return response.data
}





export const TeamSerice = { TeamGet }