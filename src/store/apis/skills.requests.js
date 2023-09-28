import { BASE_URL } from "./baseURL";
import axios from "axios";

export const GetAllSkills = async (category) => {
    let GlobalData;
    await axios.get(`${BASE_URL}/skills/?category=${category}`).then((res) => {
        GlobalData = res.data;
    })
    return GlobalData;
}

export const PostSkills = (upload) => {
    axios.post(`${BASE_URL}/skills`, upload)
}

export const DeleteSkills = (id) => {
    axios.delete(`${BASE_URL}/skills/${id}`)
}