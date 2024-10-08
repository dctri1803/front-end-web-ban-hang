import axios from "axios";

export const axiosJWT = axios.create()

export const loginUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_URL_BACKEND}/user/sign-in`, data)
    return res.data
}

export const registerUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_URL_BACKEND}/user/sign-up`, data)
    return res.data
}

export const getAllUser = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_URL_BACKEND}/user/get-all`, {
        headers: {
            token: `Bearer ${access_token}`
        }
    })
    return res.data
}

export const getDetailsUser = async (id, access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_URL_BACKEND}/user/get-details/${id}`, {
        headers: {
            token: `Bearer ${access_token}`
        }
    })
    return res.data
}

export const refreshToken = async (refreshToken) => {
    const res = await axios.post(`${process.env.REACT_APP_URL_BACKEND}/user/refresh-token`, {}, {
        headers: {
            token: `Bearer ${refreshToken}`,
        }
    })
    return res.data
}

export const logoutUser = async () => {
    const res = await axios.post(`${process.env.REACT_APP_URL_BACKEND}/user/log-out`)
    return res.data
}

export const updateUser = async (id, data, access_token) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_URL_BACKEND}/user/update-user/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`
        }
    })
    return res.data
}

export const changePassword = async (id, data, access_token) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_URL_BACKEND}/user/change-password/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`
        }
    })
    return res.data
}

export const deleteUser = async (id, access_token) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_URL_BACKEND}/user/delete-user/${id}`, {
        headers: {
            token: `Bearer ${access_token}`
        }
    })
    return res.data
}

export const deleteManyUsers = async (data, access_token) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_URL_BACKEND}/user/delete-many`, data, {
        headers: {
            token: `Bearer ${access_token}`
        }
    })
    return res.data
}

export const sendPasswordResetLink = async (email) => {
    const res = await axios.post(`${process.env.REACT_APP_URL_BACKEND}/user/forgot-password`, { email });
    return res.data;
};

export const resetPassword = async (email, otp, newPassword) => {
    const res = await axios.post(`${process.env.REACT_APP_URL_BACKEND}/user/reset-password`, { email, otp, newPassword });
    return res.data;
};