import React, { useEffect, useRef, useState } from 'react'
import { WrapperHeader, WrapperUploadAvatar } from './style'
import { Button, Form, Space } from 'antd'
import { error, success } from '../../components/Message/Message'
import { DeleteFilled, EditFilled, SearchOutlined } from '@ant-design/icons';
import { TableComponent } from '../TableComponent/TableComponent';
import { InputComponent } from '../InputComponent/InputComponent';
import { DrawerComponent } from '../DrawerComponent/DrawerComponent';
import { Loading } from '../LoadingComponent/Loading';
import { ModalComponent } from '../ModalComponent/ModalComponent';
import { getBase64 } from '../../utils';
import { useSelector } from 'react-redux';
import { useMutation, useQuery } from '@tanstack/react-query';
import * as UserService from '../../services/UserService'

export const AdminUser = () => {
    const user = useSelector((state) => state.user)
    const [form] = Form.useForm();
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [isPendingUpdate, setIsPendingUpdate] = useState(false);
    const searchInput = useRef(null);
    const [stateDetailsUser, setStateDetailsUser] = useState({
        name: '',
        email: '',
        phone: '',
        isAdmin: false,
        avatar: '',
        address: ''
    })
    const [rowSelected, setRowSelected] = useState('')

    const mutationUpdate = useMutation({
        mutationFn: async (data) => {
            const { id, access_token, ...rests } = data
            console.log('data', data)
            const res = await UserService.updateUser(id, { ...rests }, access_token)
            return res
        },
    })

    const { data: dataUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate

    const mutationDeleted = useMutation({
        mutationFn: async (data) => {
            const { id, access_token } = data
            const res = await UserService.deleteUser(id, access_token)
            return res
        },
    })

    const { data: dataDeleted, isSuccess: isSuccessDeleted, isPending: isPendingDeleted, isError: isErrorDeleted } = mutationDeleted

    const mutationDeletedMany = useMutation({
        mutationFn: async (data) => {
            const { access_token, ...ids } = data
            const res = await UserService.deleteManyUsers(ids, access_token)
            return res
        },
    })

    const { data: dataDeletedMany, isSuccess: isSuccessDeletedMany, isPending: isPendingDeletedMany, isError: isErrorDeletedMany } = mutationDeletedMany

    const handleDeleteManyUsers = (ids) => {
        mutationDeletedMany.mutate({ ids: ids, access_token: user?.access_token }, {
            onSettled: () => {
                queryUser.refetch()
            }
        })
    }

    useEffect(() => {
        if (isSuccessDeletedMany && dataDeletedMany?.status === 'OK') {
            success()
        } else if (isErrorDeletedMany) {
            error()
        }
    }, [isSuccessDeletedMany, isErrorDeletedMany])

    const getAllUser = async () => {
        const res = await UserService.getAllUser()
        console.log('res', res)
        return res
    }

    const fetchGetDetailsUser = async (rowSelected) => {
        const res = await UserService.getDetailsUser(rowSelected)
        if (res?.data) {
            setStateDetailsUser({
                name: res?.data?.name,
                email: res?.data?.email,
                phone: res?.data?.phone,
                isAdmin: res?.data?.isAdmin,
                avatar: res?.data?.avatar,
                address: res?.data?.address
            })
        }
        setIsPendingUpdate(false)
        return res
    }

    useEffect(() => {
        form.setFieldsValue(stateDetailsUser)
    }, [form, stateDetailsUser])

    useEffect(() => {
        if (rowSelected) {
            fetchGetDetailsUser(rowSelected)
        }
    }, [rowSelected])

    const handleDetailsUser = async () => {
        if (rowSelected) {
            setIsPendingUpdate(true)
            fetchGetDetailsUser(rowSelected)
        }
        setIsOpenDrawer(true)
        console.log('rowSelected', rowSelected)
    }

    const queryUser = useQuery({ queryKey: ['users'], queryFn: getAllUser, })
    const { isPending: isPendingUser, data: users } = queryUser
    const renderAction = () => {
        return (
            <div>
                <DeleteFilled style={{ color: 'red', cursor: 'pointer', fontSize: '30px' }} onClick={() => { setIsModalDeleteOpen(true) }} />
                <EditFilled style={{ color: 'orange', cursor: 'pointer', fontSize: '30px' }} onClick={handleDetailsUser} />
            </div>
        )
    }

    const handleSearch = (confirm) => {
        confirm();
    };
    const handleReset = (clearFilters) => {
        clearFilters();
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <InputComponent
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
    });

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            ...getColumnSearchProps('name')
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: (a, b) => a.name.length - b.name.length,
            ...getColumnSearchProps('email')
        },
        {
            title: 'Admin',
            dataIndex: 'isAdmin',
            key: 'isAdmin',
            filters: [
                {
                    text: 'Admin',
                    value: 'Admin',
                },
                {
                    text: 'User',
                    value: 'User',
                },
            ],
            onFilter: (value, record) => {
                if (value === 'Admin') {
                    return record.isAdmin === 'Admin'
                } else if (value === 'User') {
                    return record.isAdmin === 'No'
                }
            },

        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            sorter: (a, b) => a.phone - b.phone,
            ...getColumnSearchProps('phone')
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            sorter: (a, b) => a.address.length - b.address.length,
            ...getColumnSearchProps('address')
        },
        {
            title: 'Created at',
            dataIndex: 'createdAt',
            key: 'createdAt',
            sorter: (a, b) => a.createdAt - b.createdAt,
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: renderAction
        },
    ];

    useEffect(() => {
        if (isSuccessUpdated && dataUpdated?.status === 'OK') {
            success()
            handleCloseDrawer()
        } else if (isErrorUpdated) {
            error()
        }
    }, [isSuccessUpdated, isErrorUpdated])

    useEffect(() => {
        if (isSuccessDeleted && dataDeleted?.status === 'OK') {
            success()
            handleCancelDelete()
        } else if (isErrorDeleted) {
            error()
        }
    }, [isSuccessDeleted, isErrorDeleted])

    const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
        setStateDetailsUser({
            name: '',
            email: '',
            phone: '',
            isAdmin: false,
            avatar: '',
            address: ''
        })
        form.resetFields()
    };

    const handleOnChangeDetails = (e) => {
        setStateDetailsUser({
            ...stateDetailsUser,
            [e.target.name]: e.target.value
        })
    }

    const handleUpDetailsAvatar = async (info) => {
        await getBase64(info.file.originFileObj, (url) => {
            setStateDetailsUser({
                ...stateDetailsUser,
                avatar: url
            })
        });
    }

    const handleCancelDelete = () => {
        setIsModalDeleteOpen(false)
    }

    const handleDeleteUser = () => {
        if (user?.access_token, rowSelected) {
            mutationDeleted.mutate({ id: rowSelected, access_token: user.access_token },
                {
                    onSettled: () => {
                        queryUser.refetch()
                    }
                }
            )
                ;

        } else {
            error('Access token is missing');
        }
    }

    const onUpdateUser = () => {
        if (user?.access_token, rowSelected) {
            mutationUpdate.mutate({ id: rowSelected, access_token: user.access_token, ...stateDetailsUser },
                {
                    onSettled: () => {
                        queryUser.refetch()
                    }
                }
            );
        } else {
            error('Access token is missing');
        }
    }

    const dataTable = users?.data.length && users?.data.map((user) => {
        return {
            ...user,
            key: user._id,
            isAdmin: user.isAdmin ? 'Admin' : 'No',
        }
    })

    return (
        <div>
            <WrapperHeader>Quản lý người dùng</WrapperHeader>
            <div style={{ marginTop: '20px' }} >
                <TableComponent handleDeleteMany={handleDeleteManyUsers} data={dataTable} isPending={isPendingUser} columns={columns} onRow={(record, rowIndex) => {
                    return {
                        onClick: (event) => {
                            setRowSelected(record._id)
                        },
                    };
                }} />
            </div>
            <DrawerComponent title='Chi tiết người dùng' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width='90%'>
                <Loading isPending={isPendingUpdate}>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 2,
                        }}
                        wrapperCol={{
                            span: 22,
                        }}
                        style={{
                            width: '100%',
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        autoComplete="off"
                        form={form}
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your name!',
                                },
                            ]}
                        >
                            <InputComponent value={stateDetailsUser.name} onChange={handleOnChangeDetails} name="name" />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                            ]}
                        >
                            <InputComponent value={stateDetailsUser.email} onChange={handleOnChangeDetails} name="email" />
                        </Form.Item>

                        <Form.Item
                            label="Phone"
                            name="phone"
                            rules={[
                                {
                                    required: false,
                                    message: 'Please input your phone!',
                                },
                            ]}
                        >
                            <InputComponent value={stateDetailsUser.phone} onChange={handleOnChangeDetails} name="phone" />
                        </Form.Item>

                        <Form.Item
                            label="Address"
                            name="address"
                            rules={[
                                {
                                    required: false,
                                    message: 'Please input your address!',
                                },
                            ]}
                        >
                            <InputComponent value={stateDetailsUser.address} onChange={handleOnChangeDetails} name="address" />
                        </Form.Item>

                        <Form.Item
                            label="Avatar"
                            name="avatar"
                            rules={[
                                {
                                    required: false,
                                    message: 'Please input your avatar!',
                                },
                            ]}
                        >
                            <WrapperUploadAvatar onChange={handleUpDetailsAvatar} maxCount={1}>
                                <Button >Click to Upload</Button>
                                {stateDetailsUser.avatar && (<img src={stateDetailsUser.avatar} style={{
                                    height: '80px',
                                    width: '80px',
                                    objectFit: 'contain',
                                    marginLeft: 20,
                                }} alt='avatar'></img>)}
                            </WrapperUploadAvatar>
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                offset: 20,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit" onClick={onUpdateUser}>
                                Apply
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </DrawerComponent>
            <ModalComponent title="Xóa người dùng" open={isModalDeleteOpen} onOk={handleDeleteUser} onCancel={handleCancelDelete} okText={'Xác nhận'} cancelText={'Hủy'}>
                <Loading isPending={isPendingDeleted}>
                    <div>Bạn chắc chắn muốn xóa người dùng này</div>
                </Loading>
            </ModalComponent>
        </div>
    )
}
