import React, { useEffect, useState } from 'react'
import { WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel, WrapperUploadAvatar } from './style'
import InputForm from '../../components/InputForm/InputForm'
import { ButtonComponent } from '../../components/ButtonComponent/ButtonComponent'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import * as UserService from '../../services/UserService'
import { Loading } from '../../components/LoadingComponent/Loading'
import { message, Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { updateUser } from '../../features/slice/userSlice'
import { getBase64 } from '../../utils'
import { error, success } from '../../components/Message/Message'

export const ProfilePage = () => {
  const user = useSelector((state) => state.user)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [avatar, setAvatar] = useState('')

  const dispatch = useDispatch()
  const mutation = useMutation({
    mutationFn: async (data) => {
      const { id, access_token, ...rests } = data
      await UserService.updateUser(id, rests, access_token)
    }
  })

  const { isPending, isSuccess, isError } = mutation

  useEffect(() => {
    if (isSuccess) {
      success('Cập nhật thành công')
      handleGetDetailsUser(user?.id, user?.access_token)
    } else if (isError) {
      error('Cập nhật thất bại')
    }
  }, [isSuccess, isError])

  useEffect(() => {
    setName(user?.name)
    setEmail(user?.email)
    setPhone(user?.phone)
    setAddress(user?.address)
    setCity(user?.city)
    setAvatar(user?.avatar)
  }, [user])

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({ ...res?.data, access_token: token }))
  }

  const handleUpAvatar = async (info) => {
    await getBase64(info.file.originFileObj, (url) => {
      setAvatar(url);
    });
  }

  const handleUpdate = () => {
    mutation.mutate({
      id: user?.id,
      name,
      email,
      phone,
      address,
      city,
      avatar,
      access_token: user?.access_token,
    })
  }

  return (
    <div style={{ width: '1270px', margin: '0 auto', height: '500px' }}>
      <WrapperHeader>Thông tin người dùng</WrapperHeader>
      <Loading isPending={isPending}>
        <WrapperContentProfile>
          <WrapperInput>
            <WrapperLabel htmlFor='avatar'>Avatar</WrapperLabel>
            <WrapperUploadAvatar onChange={handleUpAvatar} maxCount={1}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </WrapperUploadAvatar>
            {avatar && (<img src={avatar} style={{
              height: '60px',
              width: '60px',
              borderRadius: '50%',
              objectFit: 'cover'
            }} alt='avatar'></img>)}
            <ButtonComponent
              onClick={handleUpdate}
              size={40}
              styleButton={{
                height: '30px',
                width: 'fit-content',
                borderRadius: '4px',
                background: '#fff',
              }}
              textButton={'Cập nhật'}
              styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
            />
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel htmlFor='name'>Tên người dùng:</WrapperLabel>
            <InputForm id='name' style={{ width: '300px' }} value={name} onChange={(e) => setName(e.target.value)} />
            <ButtonComponent
              onClick={handleUpdate}
              size={40}
              styleButton={{
                height: '30px',
                width: 'fit-content',
                borderRadius: '4px',
                background: '#fff',
              }}
              textButton={'Cập nhật'}
              styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
            />
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel htmlFor='email'>Email: </WrapperLabel>
            <InputForm id='email' style={{ width: '300px' }} value={email} onChange={(e) => setEmail(e.target.value)} />
            <ButtonComponent
              onClick={handleUpdate}
              size={40}
              styleButton={{
                height: '30px',
                width: 'fit-content',
                borderRadius: '4px',
                background: '#fff',
              }}
              textButton={'Cập nhật'}
              styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
            />
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel htmlFor='phone'>Số điện thoại:</WrapperLabel>
            <InputForm id='phone' style={{ width: '300px' }} value={phone} onChange={(e) => setPhone(e.target.value)} />
            <ButtonComponent
              onClick={handleUpdate}
              size={40}
              styleButton={{
                height: '30px',
                width: 'fit-content',
                borderRadius: '4px',
                background: '#fff',
              }}
              textButton={'Cập nhật'}
              styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
            />
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel htmlFor='address'>Địa chỉ</WrapperLabel>
            <InputForm id='address' style={{ width: '300px' }} value={address} onChange={(e) => setAddress(e.target.value)} />
            <ButtonComponent
              onClick={handleUpdate}
              size={40}
              styleButton={{
                height: '30px',
                width: 'fit-content',
                borderRadius: '4px',
                background: '#fff',
              }}
              textButton={'Cập nhật'}
              styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
            />
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel htmlFor='city'>Thành phố</WrapperLabel>
            <InputForm id='city' style={{ width: '300px' }} value={city} onChange={(e) => setCity(e.target.value)} />
            <ButtonComponent
              onClick={handleUpdate}
              size={40}
              styleButton={{
                height: '30px',
                width: 'fit-content',
                borderRadius: '4px',
                background: '#fff',
              }}
              textButton={'Cập nhật'}
              styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
            />
          </WrapperInput>
        </WrapperContentProfile>
      </Loading>
    </div>
  )
}
