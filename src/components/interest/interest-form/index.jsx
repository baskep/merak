import {
  Form,
  InputNumber,
  Select,
  Row,
  Col,
  Button,
} from 'antd'

import styles from './index.module.less'
import { useState } from 'react'

const { Option } = Select

const defaultFormValue = {
  periodType: 'year',
  periodValue: 0,
  rateType: 'year',
  rateValue: 0,
  amount: 0,
}

const InterestForm = (props) => {
  const { loading } = props
  const [formValue, setFormValue] = useState(defaultFormValue)

  const handleSubmitInterest = (value) => {
    const _formValue = { ...formValue, ...value }
    console.log('提交值')
    console.log(_formValue)
  }

  const handeleChangePeriod = (value) => {
    formValue.periodType = value
    setFormValue(formValue)
  }

  const handleChangeRate = (value) => {
    formValue.rateType = value
    setFormValue(formValue)
  }

  const PeriodSelectAfter = () => {
    return (
      <Select
        defaultValue={formValue.periodType}
        onChange={handeleChangePeriod}
        style={{ width: 110 }}
      >
        <Option value="year">年(365天)</Option>
        <Option value="month">月(30天)</Option>
        <Option value="day">天</Option>
      </Select>
    )
  }

  const RateSelectAfter = () => {
    return (
      <Select
        defaultValue={formValue.rateType}
        onChange={handleChangeRate}
        style={{ width: 140 }}
      >
        <Option value="year">年利率(365天)</Option>
        <Option value="month">月利率(30天)</Option>
        <Option value="day">日利率</Option>
      </Select>
    )
  }

  return (
    <div className={styles.interest_form_wrap}>
      <Form
        layout="vertical"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 24 }}
        initialValues={formValue}
        onFinish={handleSubmitInterest}
      >
        <Row>
          <Col span={11}>
            <Form.Item
              labelCol={{ span: 8 }}
              label="本金(元)"
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
            <Form.Item
              labelCol={{ span: 8 }}
              label="期限"
              name="periodValue"
              rules={[{ required: true, message: '请输入期限' }]}
            >
              <InputNumber
                className={styles.input_item}
                addonAfter={<PeriodSelectAfter />}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={11}>
            <Form.Item
              labelCol={{ span: 8 }}
              label="利率(%)"
              name="rateValue"
              rules={[{ required: true, message: '请输入利率' }]}
            >
              <InputNumber
                className={styles.input_item}
                addonAfter={<RateSelectAfter />}
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
              loading={loading}
            >
              立即计算
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default InterestForm