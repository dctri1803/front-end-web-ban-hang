import React, { useState } from 'react'
import { WrapperHeader } from './style'
import { Button, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import { TableComponent } from '../TableComponent/TableComponent';

export const AdminUser = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    
    return (
        <div>
            <WrapperHeader>Quản lý người dùng</WrapperHeader>
            <div style={{ marginTop: '10px' }}>
                <Button style={{ height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed' }} onClick={showModal}><PlusOutlined style={{ fontSize: '60px' }} /> </Button>
            </div>
            <div style={{ marginTop: '20px' }} >
                <TableComponent />
            </div>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </div>
    )
}
