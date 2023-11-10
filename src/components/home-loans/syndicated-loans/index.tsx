'use client'

import { useEffect, useState } from 'react'
import { Form, Input, InputNumber, Select, DatePicker, Button, Row, Col } from 'antd'
import dayjs from 'dayjs'

import { LoansField, PeriodsField, SyndicatedLoansProps } from '@/types/loans-interface'

import styles from './index.module.less'

// 贷款方式
const rateType = [{
  value: 1,
  label: '固定利率',
}]

// 利率方式
const loanType = [{
  value: 1,
  label: '等额本息(每月金额相等)',
}, {
  value: 2,
  label: '等额本金(金额逐月减少)',
}]

// 表单初始化值
const initialValues = {
  amount: 5,
  periods: 30,
  loanType: 1,
  firsthMomth: dayjs(),
  rateType: 1,
  rateValue: 4.2,
  publicAmount: 5,
  publicRateValue: 3.1,
}

const SyndicatedLoans: React.FC<SyndicatedLoansProps> = (
  {
    loading,
    onSubmitSyndicatedLoans,
  },
): React.ReactNode => {

  const [periods, setPeriods] = useState<PeriodsField[]>([])

  const [loansForm] = Form.useForm()

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

  const handleSubmitSyndicatedLoans = async () => {
    try {
      const loansValue = await loansForm.validateFields()
      onSubmitSyndicatedLoans(loansValue)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className={styles.syndicated_loans}>
      <div className={styles.commercial_loans}>
        <Form
          layout="vertical"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 24 }}
          initialValues={initialValues}
          form={loansForm}
        >
          <Row>
            <Col span={11}>
              <Form.Item<LoansField>
                labelCol={{ span: 8 }}
                label="商业贷款金额(万元)"
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
                label="商业贷款利率%"
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
            <Col span={11}>
              <Form.Item<LoansField>
                labelCol={{ span: 8 }}
                label="公积金贷款金额(万元)"
                name="publicAmount"
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
                label="公积金贷款利率%"
                name="publicRateValue"
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
                label="首次还款月份"
                name="firsthMomth"
                rules={[{ required: true, message: '请选择首次还款月份' }]}
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
                label="利率模式"
                name="rateType"
                rules={[{ required: true, message: '请选择利率模式' }]}
              >
                <Select
                  className={styles.input_item}
                  options={rateType}
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

        </Form>
      </div>
      <div className={styles.submit_col}>
        <Button
          type="primary"
          size="large"
          loading={loading}
          onClick={handleSubmitSyndicatedLoans}
        >
          立即计算
        </Button>
      </div>
    </div>
  )
}

export default SyndicatedLoans