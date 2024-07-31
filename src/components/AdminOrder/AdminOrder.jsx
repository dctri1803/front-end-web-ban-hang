import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as OrderService from '../../services/OrderService';
import { useQuery, useMutation } from '@tanstack/react-query';
import { InputComponent } from '../InputComponent/InputComponent';
import { Button, Space, Switch, Form, Modal } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { WrapperHeader } from './style';
import { TableComponent } from '../TableComponent/TableComponent';
import { orderConstant } from '../../constant';
import { convertPrice, formatDateTime } from '../../utils';
import { error, success } from '../Message/Message';

export const AdminOrder = () => {
    const user = useSelector((state) => state?.user);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const getAllOrders = async () => {
        const res = await OrderService.getAllOrders(user?.access_token);
        return res;
    };

    const queryOrder = useQuery({ queryKey: ['orders'], queryFn: getAllOrders });
    const { isLoading: isLoadingOrders, data: orders } = queryOrder;

    const mutationUpdate = useMutation({
        mutationFn: async (data) => {
            const { id, access_token, ...rests } = data;
            const res = await OrderService.updateOrder(id, { ...rests }, access_token);
            return res;
        },
    });

    const { data: dataUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate;

    useEffect(() => {
        if (isSuccessUpdated && dataUpdated?.status === 'OK') {
            success('Order updated successfully');
            setIsModalOpen(false);
            queryOrder.refetch();
        } else if (isErrorUpdated) {
            error('Failed to update order');
        }
    }, [isSuccessUpdated, isErrorUpdated]);

    const handleEditOrder = (record) => {
        setSelectedOrder(record);
        form.setFieldsValue({
            isPaid: record.isPaid === "Đã trả", 
            isDelivered: record.isDelivered === "Đã giao",
        });
        setIsModalOpen(true);
    };

    const handleUpdateOrder = () => {
        form.validateFields().then((values) => {
            const { isPaid, isDelivered } = values;
            mutationUpdate.mutate({
                id: selectedOrder._id,
                access_token: user?.access_token,
                isPaid,
                isDelivered,
            });
        });
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
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => confirm()}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && clearFilters()}
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
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    });

    const parseDate = (dateString) => new Date(dateString);

    const columns = [
        {
            title: 'User name',
            dataIndex: 'userName',
            sorter: (a, b) => a.userName.length - b.userName.length,
            ...getColumnSearchProps('userName'),
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            sorter: (a, b) => a.phone.length - b.phone.length,
            ...getColumnSearchProps('phone'),
        },
        {
            title: 'Address',
            dataIndex: 'address',
            sorter: (a, b) => a.address.length - b.address.length,
            ...getColumnSearchProps('address'),
        },
        {
            title: 'Paided',
            dataIndex: 'isPaid',
            sorter: (a, b) => a.isPaid.length - b.isPaid.length,
            ...getColumnSearchProps('isPaid'),
        },
        {
            title: 'Shipped',
            dataIndex: 'isDelivered',
            sorter: (a, b) => a.isDelivered.length - b.isDelivered.length,
            ...getColumnSearchProps('isDelivered'),
        },
        {
            title: 'Payment method',
            dataIndex: 'paymentMethod',
            sorter: (a, b) => a.paymentMethod.length - b.paymentMethod.length,
            ...getColumnSearchProps('paymentMethod'),
        },
        {
            title: 'Total price',
            dataIndex: 'totalPrice',
            sorter: (a, b) => a.totalPrice.length - b.totalPrice.length,
            ...getColumnSearchProps('totalPrice'),
        },
        {
            title: 'Order Date',
            dataIndex: 'updatedAt',
            sorter: (a, b) => parseDate(a.updatedAt) - parseDate(b.updatedAt),
            render: (text) => formatDateTime(text),
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_, record) => (
                <Button type="primary" onClick={() => handleEditOrder(record)}>
                    Cập nhật
                </Button>
            ),
        },
    ];

    const dataTable = orders?.data?.length && orders?.data.map((order) => ({
        ...order,
        key: order._id,
        userName: order?.shippingAddress?.fullName,
        phone: order?.shippingAddress?.phone,
        address: order?.shippingAddress?.address,
        paymentMethod: orderConstant.payment[order?.paymentMethod],
        isPaid: order?.isPaid ? "Đã trả" : "Chưa trả",
        isDelivered: order?.isDelivered ? "Đã giao" : "Chưa giao",
        totalPrice: convertPrice(order?.totalPrice),
    }));

    return (
        <div>
            <WrapperHeader>Quản lý đơn hàng</WrapperHeader>
            <div style={{ marginTop: '20px' }}>
                <TableComponent columns={columns} isLoading={isLoadingOrders} data={dataTable} />
            </div>
            <Modal
                title="Update Order"
                visible={isModalOpen}
                onOk={handleUpdateOrder}
                onCancel={() => setIsModalOpen(false)}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="updateOrderForm"
                    initialValues={selectedOrder}
                >
                    <Form.Item label="Paid" name="isPaid" valuePropName="checked">
                        <Switch checkedChildren="Đã trả" unCheckedChildren="Chưa trả" />
                    </Form.Item>
                    <Form.Item label="Delivered" name="isDelivered" valuePropName="checked">
                        <Switch checkedChildren="Đã giao" unCheckedChildren="Chưa giao" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};
