import React, { useState } from 'react';
import { Badge, Col, Popover } from 'antd';
import { WrapperHeader, WrapperTextHeader, WrapperHeaderAccount, WrapperTextHeaderSmall, WrapperConttentPopup } from './style';
import { UserOutlined, ShoppingCartOutlined, CaretDownOutlined } from '@ant-design/icons';
import { ButtonInputSearch } from '../ButtonInputSearch/ButtonInputSearch';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '../../services/UserService'
import { resetUser } from '../../features/slice/userSlice'
import { Loading } from '../LoadingComponent/Loading';


export const HeaderComponent = () => {

  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)

  const handleNavigateLogin = () => {
    navigate('/sign-in')
  }
  const handleLogout = async () => {
    setIsLoading(true)
    await UserService.logoutUser()
    dispatch(resetUser())
    setIsLoading(false)
  }

  const content = (
    <div>
      <WrapperConttentPopup onClick={handleLogout}>Đăng xuất</WrapperConttentPopup>
      <WrapperConttentPopup>Thông tin người dùng</WrapperConttentPopup>
    </div>
  );

  return (
    <div style={{ width: '100%', display: 'block', background: 'rgb(26, 148, 255)' }}>
      <WrapperHeader >
        <Col span={3}>
          <WrapperTextHeader>TAKA</WrapperTextHeader>
        </Col>
        <Col span={15}>
          <ButtonInputSearch
            size='large'
            textButton='Tìm kiếm'
            placeholder="Tên sản phẩm tìm kiếm..."
          // onSearch={onSearch}
          />
        </Col>
        <Col span={6} style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <Loading isPending={isLoading}>
            <WrapperHeaderAccount style={{ padding: '0 30px' }}>
              <UserOutlined style={{ fontSize: '30px' }} />
              {user?.name ? (
                <>
                  <Popover content={content} trigger="click">
                    <div style={{ cursor: 'pointer' }}>{user.name}</div>
                  </Popover>
                </>
              ) : (
                <div onClick={handleNavigateLogin} style={{ cursor: 'pointer', }}>
                  <WrapperTextHeaderSmall>Đăng nhập/ Đăng kí</WrapperTextHeaderSmall>
                  <div>
                    <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                    <CaretDownOutlined />
                  </div>
                </div>
              )}
            </WrapperHeaderAccount>
          </Loading>
          <div>
            <div>
              <Badge count={4} size='small'>
                <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
              </Badge>
              <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
            </div>
          </div>
        </Col>
      </WrapperHeader>
    </div>
  )
}

