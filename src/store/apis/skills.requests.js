import { BASE_URL } from "./baseURL";
import axios from "axios";

export const GetAllSkills = async (category) => {
    const response = await axios.get(`${BASE_URL}/skills/?category=${category}`)
    return response.data;


    // return axios.get(`${BASE_URL}/skills/?category=${category}`)
    //     .then((res) => {
    //         return res.data;
    //     }).catch((error) => 
}



export const PostSkills = (upload) => {
    axios.post(`${BASE_URL}/skills`, upload)
}

export const DeleteSkills = (id) => {
    axios.delete(`${BASE_URL}/skills/${id}`)
}