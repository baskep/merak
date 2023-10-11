'use client'

import { useState } from 'react'
import { Form, InputNumber, Row, Col } from 'antd'

import styles from './index.module.less'

type FormType = {
  name?: string
}

const CommercialLoans = (): React.ReactNode => {

  return (
    <div className={styles.commercial_loans}>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 24 }}
      >
        <Row>
          <Col span={11}>
            <Form.Item
              label="贷款金额"
              name="password"
              rules={[{ required: true, message: '请输入贷款金额' }]}
            >
              <InputNumber
                className={styles.input_item}
                controls={false}
                placeholder="请输入贷款金额"
              />
            </Form.Item>
          </Col>
          <Col span={11} offset={2}>
            <Form.Item
              label="贷款金额"
              name="password"
              rules={[{ required: true, message: '请输入贷款金额' }]}
            >
              <InputNumber
                className={styles.input_item}
                controls={false}
                placeholder="请输入贷款金额"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default CommercialLoans