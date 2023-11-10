'use client'

import { useEffect, useState } from 'react'

import {
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Button,
  Row,
  Col,
  message,
} from 'antd'

import dayjs from 'dayjs'

import { LoansField, PeriodsField } from '@/types/loans-interface'

import styles from './index.module.less'

// 表单初始化值
const initialValues = {
  amount: 5,
  periods: 30,
  loanType: 1,
  firsthMomth: dayjs(),
  rateType: 1,
  rateValue: 4.2,
  repayAmount: 5,
}

// 利率方式
const loanType = [{
  value: 1,
  label: '等额本息(每月金额相等)',
}, {
  value: 2,
  label: '等额本金(金额逐月减少)',
}]

const RepayLoans = (): React.ReactNode => {

  const [periods, setPeriods] = useState<PeriodsField[]>([])

  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    const _periods = []
    for (let i = 0; i < 30; i++) {
      _periods.push({
        value: i + 1,
        label: `${i + 1}年(${(i + 1) * 12}期)`,
      })
    }
    setPeriods(_periods)
  }, [])

  const handleTest = (value: LoansField) => {
    const { amount, repayAmount } = value as any
    if (repayAmount > amount) {
      messageApi.open({
        type: 'error',
        content: '提前还款金额不得大于剩余贷款金额',
      })
    }
  }

  return (
    <>
      {contextHolder}
      <div className={styles.repay_loans}>
        <Form
          layout="vertical"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 24 }}
          initialValues={initialValues}
          onFinish={handleTest}
        >
          <Row>
            <Col span={11}>
              <Form.Item<LoansField>
                labelCol={{ span: 8 }}
                label="剩余贷款金额(万元)"
                name="amount"
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
              <Form.Item<LoansField>
                labelCol={{ span: 8 }}
                label="贷款期数"
                name="periods"
                rules={[{ required: true, message: '请选择贷款期数' }]}
              >
                <Select
                  className={styles.input_item}
                  options={periods}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={11}>
              <Form.Item<LoansField>
                labelCol={{ span: 8 }}
                label="提前还款金额(万元)"
                name="repayAmount"
                rules={[{ required: true, message: '请输入提前还款金额' }]}
              >
                <InputNumber
                  className={styles.input_item}
                  controls={false}
                  placeholder="请输入提前还款金额"
                />
              </Form.Item>
            </Col>
            <Col span={11} offset={2}>
              <Form.Item<LoansField>
                labelCol={{ span: 8 }}
                label="下次还款月份"
                name="firsthMomth"
                rules={[{ required: true, message: '请选择下次还款月份' }]}
              >
                <DatePicker
                  className={styles.input_item}
                  picker="month"
                  format="YYYY年MM月"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <Form.Item<LoansField>
                labelCol={{ span: 8 }}
                label="贷款方式"
                name="loanType"
                rules={[{ required: true, message: '请选择贷款方式' }]}
              >
                <Select
                  className={styles.input_item}
                  options={loanType}
                />
              </Form.Item>
            </Col>
            <Col span={11} offset={2}>
              <Form.Item<LoansField>
                labelCol={{ span: 8 }}
                label="贷款利率%"
                name="rateValue"
                rules={[{ required: true, message: '请输入利率' }]}
              >
                <Input
                  className={styles.input_item}
                  placeholder="请输入利率"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col className={styles.submit_col} span={24}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
              >
              立即计算
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  )
}

export default RepayLoans