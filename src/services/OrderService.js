import { axiosJWT } from "./UserService";

export const createOrder = async (data, access_token) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_URL_BACKEND}/order/create`, data, {
        headers: {
            token: `Bearer ${access_token}`
        }
    })
    return res.data
}

export const getOrderByUserId = async (id,access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_URL_BACKEND}/order/get-all-order/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
  }
  
  export const getDetailsOrder = async (id,access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_URL_BACKEND}/order/get-details-order/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
  }
  
  export const cancelOrder = async (id, access_token, orderItems, userId ) => {
    const data = {orderItems, orderId: id}
    const res = await axiosJWT.delete(`${process.env.REACT_APP_URL_BACKEND}/order/cancel-order/${userId}`, {data}, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
  }
  
  export const getAllOrders = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_URL_BACKEND}/order/get-all-order`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
  }

  export const updateOrder = async (orderId, data, access_token) => {
    const response = await axiosJWT.patch(`${process.env.REACT_APP_URL_BACKEND}/order/update-order-status/${orderId}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    });
    return response.data;
};