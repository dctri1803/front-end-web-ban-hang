import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  avatar: '',
  access_token: '',
  id: '',
  isAdmin: false,
  refreshToken: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { name ='', email = '', access_token = '', phone = '', address = '', avatar = '', _id='', isAdmin, city='', refreshToken = ''} = action.payload
      state.name         = name;
      state.email        = email;
      state.phone        = phone;
      state.address      = address;
      state.city         = city;
      state.avatar       = avatar;
      state.id           = _id;
      state.access_token = access_token;
      state.refreshToken = refreshToken ? refreshToken : state.refreshToken;
      state.isAdmin      = isAdmin
    },
    resetUser: (state) => {
      state.name         = '';
      state.email        = '';
      state.phone        = '';
      state.address      = '';
      state.city         = '';
      state.avatar       = '';
      state.access_token = '';
      state.id           = '';
      state.isAdmin      = false;
      state.refreshToken = ''
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlice.actions

export default userSlice.reducer