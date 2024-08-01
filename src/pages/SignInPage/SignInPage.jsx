import React, { useEffect, useState } from 'react'
import InputForm from '../../components/InputForm/InputForm'
import { ButtonComponent } from '../../components/ButtonComponent/ButtonComponent'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style'
import imageLogo from '../../assets/images/logo-login.png'
import { Image } from 'antd'
import {
  EyeOutlined,
  EyeInvisibleOutlined,
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import * as UserService from '../../services/UserService'
import { Loading } from '../../components/LoadingComponent/Loading'
import { error, success } from '../../components/Message/Message'
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux'
import { updateUser } from '../../features/slice/userSlice'
const SignInPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState('admin@gmail.com');
  const [password, setPassword] = useState('123456');
  const dispatch = useDispatch();
  const mutation = useMutation({
    mutationFn: data => UserService.loginUser(data)
  })
  const { data, isPending } = mutation

  useEffect(() => {
    console.log('location', location)
    if (data?.status === 'OK') {
      if (location?.state) {
        navigate(location?.state)
      } else {
        navigate('/');
      }
      success('Đăng nhập thành công!');
      localStorage.setItem('access_token', JSON.stringify(data?.access_token))
      if (data?.access_token) {
        const decoded = jwtDecode(data?.access_token);
        if (decoded?.id) {
          handleGetDetailsUser(decoded?.id, data?.access_token)
        }
      }
    } else if (data?.status === 'ERR') {
      error('Đăng nhập thất bại!')
    }
  }, [data?.status === 'OK', data?.status === 'ERR'])

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({ ...res?.data, access_token: token }))
  }

  const handleNavigateSignUp = () => {
    navigate('/sign-up')
  }
  const handleSignIn = () => {
    mutation.mutate({
      email,
      password
    })
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.53)', height: '100vh' }}>
      <div style={{ width: '800px', height: '527px', borderRadius: '20px', background: '#fff', display: 'flex' }}>
        <WrapperContainerLeft>
          <h1>Xin chào</h1>
          <p>Đăng nhập vào tài khoản</p>
          <InputForm style={{ marginBottom: '10px' }} placeholder='abc@email.com' value={email} onChange={(e) => setEmail(e.target.value)} />
          <div style={{ position: 'relative' }}>
            <span
              onClick={() => setIsShowPassword(!isShowPassword)}
              style={{
                zIndex: 10,
                position: 'absolute',
                top: '6px',
                right: '8px',
              }}
            >{isShowPassword ? (
              <EyeOutlined />
            ) : (<EyeInvisibleOutlined />)
              }
            </span>
            <InputForm placeholder='Mật khẩu' type={isShowPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
          <Loading isPending={isPending}>
            <ButtonComponent
              disabled={!email.length || !password.length}
              onClick={handleSignIn}
              size={40}
              styleButton={{
                background: 'rgb(255, 57, 59)',
                height: '48px',
                width: '100%',
                border: 'none',
                borderRadius: '4px',
                margin: '26px 0 10px'
              }}
              textButton={'Đăng nhập'}
              styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
            />
          </Loading>
          <p><WrapperTextLight onClick={() => navigate('/forgot-password')}>Quên mật khẩu</WrapperTextLight></p>
          <p>Chưa có tài khoản? <WrapperTextLight onClick={handleNavigateSignUp}> Tạo tài khoản</WrapperTextLight> </p>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <Image src={imageLogo} preview={false} alt='image-logo' height={203} width={203} />
          <h4>Mua sắm tại Taka</h4>
        </WrapperContainerRight>
      </div>
    </div>
  )
}
export default SignInPage          