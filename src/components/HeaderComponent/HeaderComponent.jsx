import React, { useEffect, useState } from 'react';
import { Badge, Col, Popover, Modal } from 'antd';
import { WrapperHeader, WrapperTextHeader, WrapperHeaderAccount, WrapperTextHeaderSmall, WrapperConttentPopup, MobileSearchIcon, MobileSearchInput, MobileSearchWrapper } from './style';
import { UserOutlined, ShoppingCartOutlined, CaretDownOutlined, SearchOutlined } from '@ant-design/icons';
import { ButtonInputSearch } from '../ButtonInputSearch/ButtonInputSearch';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '../../services/UserService';
import { resetUser } from '../../features/slice/userSlice';
import { Loading } from '../LoadingComponent/Loading';
import { searchProduct } from '../../features/slice/productSlice';

export const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [search, setSearch] = useState('');
  const [isMobileSearchVisible, setIsMobileSearchVisible] = useState(false);

  const handleNavigateLogin = () => {
    navigate('/sign-in');
  };

  const handleNavigateProfile = () => {
    navigate('/profile');
  };

  const handleNavigateChangePassord = () => {
    navigate('/change-password');
  };

  const handleNavigateMyOrder = () => {
    navigate(`/my-order`, {
      state: {
        id: user?.id,
        token: user?.access_token,
      },
    });
  };

  const handleNavigateHome = () => {
    navigate('/');
  };

  const handleLogout = async () => {
    setIsLoading(true);
    await UserService.logoutUser();
    localStorage.removeItem('access_token');
    dispatch(resetUser());
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    setUserName(user?.name);
    setUserAvatar(user?.avatar);
    setIsLoading(false);
  }, [user?.name, user?.avatar]);

  const content = (
    <div>
      <WrapperConttentPopup onClick={handleNavigateProfile}>Thông tin người dùng</WrapperConttentPopup>
      <WrapperConttentPopup onClick={handleNavigateChangePassord}>Đổi mật khẩu</WrapperConttentPopup>
      <WrapperConttentPopup onClick={handleNavigateMyOrder}>Đơn hàng của tôi</WrapperConttentPopup>
      {user?.isAdmin && <WrapperConttentPopup onClick={() => { navigate('/systems/admin') }}>Quản lý hệ thống</WrapperConttentPopup>}
      <WrapperConttentPopup onClick={handleLogout}>Đăng xuất</WrapperConttentPopup>
    </div>
  );

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const onSearchClick = () => {
    dispatch(searchProduct(search));
  };

  const showMobileSearch = () => {
    setIsMobileSearchVisible(true);
  };

  const handleMobileSearch = () => {
    dispatch(searchProduct(search));
    setIsMobileSearchVisible(false);
  };

  return (
    <div style={{ width: '100%', display: 'block', background: 'rgb(26, 148, 255)' }}>
      <WrapperHeader style={{ justifyContent: isHiddenSearch && isHiddenCart ? 'space-between' : 'unset' }}>
        <Col span={3} xs={8} sm={6} md={4}>
          <WrapperTextHeader onClick={handleNavigateHome}>TAKA</WrapperTextHeader>
        </Col>
        {!isHiddenSearch && (
          <Col span={15} xs={0} sm={12} md={14}>
            <ButtonInputSearch
              size='large'
              textButton='Tìm kiếm'
              placeholder="Tên sản phẩm tìm kiếm..."
              onSearch={onSearchChange}
              onButtonClick={onSearchClick}
            />
          </Col>
        )}
        <Col span={6} xs={16} sm={6} md={6} style={{ display: 'flex', gap: 20, alignItems: 'center', justifyContent: 'flex-end' }}>
          <Loading isPending={isLoading}>
            <WrapperHeaderAccount style={{ padding: '0 10px' }}>
              {userAvatar ? (
                <img
                  src={userAvatar}
                  style={{
                    height: '46px',
                    width: '46px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                  alt='avatar'
                />
              ) : (
                <UserOutlined style={{ fontSize: '30px' }} />
              )}
              {user?.access_token ? (
                <Popover content={content} trigger="click">
                  <div style={{ cursor: 'pointer' }}>{userName || user.email || 'User'}</div>
                </Popover>
              ) : (
                <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
                  <WrapperTextHeaderSmall>Đăng nhập/ Đăng kí</WrapperTextHeaderSmall>
                  <div>
                    <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                    <CaretDownOutlined />
                  </div>
                </div>
              )}
            </WrapperHeaderAccount>
          </Loading>
          {!isHiddenCart && (
            <div onClick={() => navigate('/order')} style={{ cursor: 'pointer' }}>
              <Badge count={order?.orderItems?.length} size='small'>
                <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
              </Badge>
              <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
            </div>
          )}
          {!isHiddenSearch && (
            <MobileSearchIcon onClick={showMobileSearch}>
              <SearchOutlined />
            </MobileSearchIcon>
          )}
        </Col>
      </WrapperHeader>
      {isMobileSearchVisible && (
        <MobileSearchWrapper>
          <MobileSearchInput
            placeholder="Tên sản phẩm tìm kiếm..."
            value={search}
            onChange={onSearchChange}
          />
          <button onClick={handleMobileSearch}>Tìm kiếm</button>
        </MobileSearchWrapper>
      )}
    </div>
  );
};
