import axios from "axios";
import { REACT_API_URL_BACKEND } from "../constants/constants";

export const loginUser = async (data) => {
    const res = await axios.post(`${REACT_API_URL_BACKEND}/user/sign-in`, data)
    return res.data
}

export const registerUser = async (data) => {
    const res = await axios.post(`${REACT_API_URL_BACKEND}/user/sign-up`, data)
    return res.data
}

export const getDetailsUser = async (id, access_token) => {
    const res = await axios.get(`${REACT_API_URL_BACKEND}/user/get-details/${id}`, {
        headers: {
            token: `Bearer ${access_token}`
        }
    })
    return res.data
}