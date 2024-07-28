import axios from 'axios';
import { axiosJWT } from './UserService';

export const getCommentsByProductId = async (productId) => {
    const res = await axios.get(`${process.env.REACT_APP_URL_BACKEND}/comment/product/${productId}`);
    return res.data;
};

export const addComment = async (data, access_token) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_URL_BACKEND}/comment/create`, data, {
        headers: {
            token: `Bearer ${access_token}`
        }
    });
    return res.data;
};


export const likeComment = async (commentId, userId, access_token) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_URL_BACKEND}/comment/like/${commentId}`, { userId }, {
        headers: {
            token: `Bearer ${access_token}`
        }
    });
    return res.data;
};

export const dislikeComment = async (commentId, userId, access_token) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_URL_BACKEND}/comment/dislike/${commentId}`, { userId }, {
        headers: {
            token: `Bearer ${access_token}`
        }
    });
    return res.data;
}

export const replyToComment = async (data, access_token) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_URL_BACKEND}/comment/reply`, data, {
        headers: {
            token: `Bearer ${access_token}`
        }
    });
    return res.data;
};