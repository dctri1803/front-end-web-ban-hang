import React from 'react'
import { Spin } from 'antd';

export const Loading = ({ children, isPending}) => {
  return (
    <Spin tip="Loading" spinning={isPending} size="small" delay={200}>
        {children}
      </Spin>
  )
}
