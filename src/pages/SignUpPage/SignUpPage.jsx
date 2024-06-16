import React, { useState } from 'react';
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style';
import imageLogo from '../../assets/images/logo-login.png';
import { Image } from 'antd';
import InputForm from '../../components/InputForm/InputForm';
import { ButtonComponent } from '../../components/ButtonComponent/ButtonComponent';
import {
  EyeOutlined,
  EyeInvisibleOutlined,
} from '@ant-design/icons';

const SignUpPage = () => {
  const { isShowPassword, setIsShowPassword } = useState(false);
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.53)', height: '100vh' }}>
      <div style={{ width: '800px', height: '527px', borderRadius: '20px', background: '#fff', display: 'flex' }}>
        <WrapperContainerLeft>
          <h1>Xin chào</h1>
          <p>Đăng kí tài khoản</p>
          <InputForm style={{ marginBottom: '10px' }} placeholder='abc@email.com' />
          <div style={{ position: 'relative' ,marginBottom: '10px'  }}>
            <span
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
            <InputForm placeholder='Mật khẩu' />
          </div>
          <div style={{ position: 'relative',}}>
            <span
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
            <InputForm placeholder='Nhập lại mật khẩu' />
            </div>
          <ButtonComponent
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
          <p>Bạn đã có tài khoản? <WrapperTextLight> Đăng nhập</WrapperTextLight> </p>
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