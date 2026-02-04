'use client'

import { Table } from 'antd'

import styles from './index.module.less'

const columns = [
  {
    title: '期数',
    dataIndex: 'number',
    key: 'periods',
    render(text, record, index) {
      return (
        <span>{index + 1}期</span>
      )
    },
  },
  {
    title: '月份',
    dataIndex: 'monthName',
    key: 'monthName',
    render(text, record, index) {
      return (
        <span>{record.monthName}</span>
      )
    },
  },
  {
    title: '每月还款总额(元)',
    dataIndex: 'totalMonthAmount',
    key: 'totalMonthAmount',
  },
  {
    title: '每月利息(元)',
    dataIndex: 'monthInterest',
    key: 'monthInterest',
  },
  {
    title: '每月本金(元)',
    dataIndex: 'monthAmount',
    key: 'monthAmount',
  },
  {
    title: '剩余还款金额(元)',
    dataIndex: 'restRepaymentAmount',
    key: 'restRepaymentAmount',
  },
]

const CommercialLoansTable = ({ loading, loansRes }) => {

  const { monthAmountArr } = loansRes

  return (
    <div className="common-card-wrap">
      <div className="common-card-content">
        <div className={styles.commercial_loans_table} />
        <Table
          className="commercial-loans-table"
          rowKey={(record) => record.monthName}
          columns={columns}
          dataSource={monthAmountArr}
          pagination={false}
          loading={loading}
          bordered
        />
      </div>
    </div>
  )
}

export default CommercialLoansTable