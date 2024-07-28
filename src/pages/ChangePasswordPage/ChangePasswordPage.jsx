import { useMutation } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as UserService from "../../services/UserService"
import { error, success } from "../../components/Message/Message"
import { WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel } from "./style"
import { Loading } from "../../components/LoadingComponent/Loading"
import { ButtonComponent } from "../../components/ButtonComponent/ButtonComponent"
import { useNavigate } from "react-router-dom"
import { Input } from 'antd';

import { resetUser } from "../../features/slice/userSlice"


export const ChangePasswordPage = () => {
  const user = useSelector((state) => state.user)
  const [currentPassword, setcurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setcomfirmNewPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: async (data) => {
      const { id, access_token, ...rests } = data
      return await UserService.changePassword(id, rests, access_token)
    },
    onSuccess: (data) => {
      if (data.status === 'OK') {
        success(data.message);
        handleLogOut()
      } else {
        error(data.message);
      }
    },
    onError: (error) => {
      error('An error occurred');
    },
  })

  const { data ,isPending, isSuccess, isError } = mutation

  const handleLogOut = async() => {
    await UserService.logoutUser()
      localStorage.removeItem('access_token')
      dispatch(resetUser())
      navigate('/sign-in')
  }

  const hanldeChangPassword = async () => {
    const isMatch = newPassword === confirmNewPassword
    if(isMatch) {
      mutation.mutate({
        id: user?.id,
        currentPassword,
        newPassword,
        access_token: user?.access_token,
      })
    } else {
      error("Mật khẩu nhập lại không đúng")
    }
    
  }

  return (
    <div style={{ width: '1270px', margin: '0 auto', height: '500px' }}>
      <WrapperHeader>Thay đổi mật khẩu</WrapperHeader>
      <Loading isPending={isPending}>
        <WrapperContentProfile>
          <WrapperInput>
            <WrapperLabel htmlFor='name'>Mật khẩu hiện tại: </WrapperLabel>
            <Input.Password id='name' style={{ width: '300px' }} value={currentPassword} onChange={(e) => setcurrentPassword(e.target.value)} />
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel htmlFor='email'>Mật khẩu mới: </WrapperLabel>
            <Input.Password id='email' style={{ width: '300px' }} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel htmlFor='phone'>Nhập lại mật khẩu mới:</WrapperLabel>
            <Input.Password id='phone' style={{ width: '300px' }} value={confirmNewPassword} onChange={(e) => setcomfirmNewPassword(e.target.value)} />
            <ButtonComponent
              onClick={hanldeChangPassword}
              size={40}
              styleButton={{
                height: '30px',
                width: 'fit-content',
                borderRadius: '4px',
                background: '#fff',
              }}
              textButton={'Đổi mật khẩu'}
              styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
            />
          </WrapperInput>
        </WrapperContentProfile>
      </Loading>
    </div>
  )
}
