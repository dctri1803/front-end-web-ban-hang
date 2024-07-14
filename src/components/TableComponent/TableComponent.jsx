import React, { useState } from 'react'
import { Table } from 'antd';
import { Loading } from '../LoadingComponent/Loading';

export const TableComponent = (props) => {
  const { selectionType = 'checkbox', data = [], isPending = false, columns = [], handleDeleteMany } = props
  const [rowSelectedKey, setRowSelectedKeys] = useState([])
  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setRowSelectedKeys(selectedRowKeys)
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  const handleDeleteAll = () => {
    handleDeleteMany(rowSelectedKey)
  }

  return (
    <div>
      <Loading isPending={isPending}>
        {rowSelectedKey.length > 0 &&  
        <div style={{
          background: 'red',
          color: '#fff',
          fontWeight: 600,
          padding: '10px',
          cursor: 'pointer',
        }}
        onClick={handleDeleteAll}
        >Xóa tất cả
        </div>}
        <Table
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          columns={columns}
          dataSource={data}
          {...props}
        />
      </Loading>
    </div>
  )
}
