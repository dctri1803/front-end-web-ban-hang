import React, { useEffect, useState } from 'react';
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style';
import imageLogo from '../../assets/images/logo-login.png';
import { Image } from 'antd';
import InputForm from '../../components/InputForm/InputForm';
import { ButtonComponent } from '../../components/ButtonComponent/ButtonComponent';
import {
  EyeOutlined,
  EyeInvisibleOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import * as UserService from '../../services/UserService';
import { Loading } from '../../components/LoadingComponent/Loading';
import { useMutation } from '@tanstack/react-query';
import { error, success } from '../../components/Message/Message';

const SignUpPage = () => {
  const navigate = useNavigate();

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const mutation = useMutation({
    mutationFn: data => UserService.registerUser(data)
  })

  const { data, isPending, isSuccess, isError } = mutation

  useEffect(() => {
    if(isSuccess) {
      success('Đăng kí thành công! ');
      handleNavigateLogin()
    } else if(isError) {
      error('Đăng kí thất bại! ');
    }
  },[isSuccess, isError])

  const handleNavigateLogin = () => {
    navigate('/sign-in')
  }

  const handleSignUp = () => {
    mutation.mutate({email, password, confirmPassword})
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.53)', height: '100vh' }}>
      <div style={{ width: '800px', height: '527px', borderRadius: '20px', background: '#fff', display: 'flex' }}>
        <WrapperContainerLeft>
          <h1>Xin chào</h1>
          <p>Đăng kí tài khoản</p>
          <InputForm style={{ marginBottom: '10px' }} placeholder='abc@email.com' value={email} onChange={(e) => setEmail(e.target.value)} />
          <div style={{ position: 'relative', marginBottom: '10px' }}>
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
          <div style={{ position: 'relative', }}>
            <span
              onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
              style={{
                zIndex: 10,
                position: 'absolute',
                top: '6px',
                right: '8px',
              }}
            >{isShowConfirmPassword ? (
              <EyeOutlined />
            ) : (<EyeInvisibleOutlined />)
              }
            </span>
            <InputForm placeholder='Nhập lại mật khẩu' type={isShowConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
          {data?.status === 'ERR' && <span style={{color: 'red'}}>{data?.message}</span>}
          <Loading isPending={isPending}>
            <ButtonComponent
              disabled={!email.length || !password.length || !confirmPassword.length}
              onClick={handleSignUp}
              size={40}
              styleButton={{
                background: 'rgb(255, 57, 59)',
                height: '48px',
                width: '100%',
                border: 'none',
                borderRadius: '4px',
                margin: '26px 0 10px'
              }}
              textButton={'Đăng kí'}
              styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
            />
          </Loading>
          <p>Bạn đã có tài khoản? <WrapperTextLight onClick={handleNavigateLogin}> Đăng nhập</WrapperTextLight> </p>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <Image src={imageLogo} preview={false} alt='image-logo' height={203} width={203} />
          <h4>Mua sắm tại Taka</h4>
        </WrapperContainerRight>
      </div>
    </div>
  )
}

export default SignUpPage