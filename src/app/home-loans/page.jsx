'use client'

import { useEffect, useState } from 'react'
import { Radio } from 'antd'
import dayjs from 'dayjs'
import { useRequest } from 'ahooks'
import { isEmpty } from 'lodash'

import MetaInfo from '@/components/meta-info'
import Header from '@/components/header'
import ToolContentLayout from '@/components/tool-content-layout'
import CommercialLoans from '@/components/home-loans/commercial-loans'
import SyndicatedLoans from '@/components/home-loans/syndicated-loans'
import LoansBasicInfo from '@/components/home-loans/loans-basic-info'
import RepayLoans from '@/components/home-loans/repay-loans'
import RuleContent from '@/components/rule-content'
import CommercialLoansTable from '@/components/home-loans/loans-table'

import { submitCommercialLoans, submitSyndicatedLoans, submitRepayLoans } from '@/service/home-loans'
import { commercialLoansRule } from '@/config/home-loans'

import styles from './index.module.less'

const loansOption = [{
  label: '普通贷款',
  value: '1',
}, {
  label: '组合贷款',
  value: '2',
}, {
  label: '提前还贷',
  value: '3',
}]

const defaultCommercialLoansRes = {
  totalAllInterest: 0,
  totalRepaymentAmount: 0,
  monthAmountArr: [],
}

const metaInfo = {
  title: '等额本息和等额本金哪个划算-房贷计算器-房贷计算器年最新版',
  keywords: '等额本息和等额本金哪个划算,房贷计算器年最新版,贷款计算器',
  description: '想知道等额本息和等额本金哪个划算?房贷提前还款什么时候最划算?提供在线房贷计算器,可以根据年利率计算出利息和本金,以及每一期需要还款的金额明细',
}

const HomeLoans = () => {
  const [activeKey, setActiveKey] = useState('1')
  const [loansInfoData, setLoansInfoData] = useState()
  const [loansRes, setLoansRes] = useState(defaultCommercialLoansRes)
  const [requestCacheParams, setRequestCacheParams] = useState()

  useEffect(() => {
    if (
      !isEmpty(loansRes) &&
      loansRes.totalAllInterest &&
      loansRes.totalRepaymentAmount
    ) {
      const {
        amount,
        repayAmount,
        periods,
        rateType,
        rateValue,
        year,
        month,
        loanType,
        publicAmount,
        publicRateValue,
      } = requestCacheParams

      const { totalAllInterest, monthAmountArr, totalRepaymentAmount } = loansRes

      const params = {
        year,
        month,
        amount,
        repayAmount,
        periods,
        rateType,
        rateValue,
        loanType,
        monthAmountArr,
        totalAllInterest,
        totalRepaymentAmount,
        publicAmount,
        publicRateValue,
      }
      setLoansInfoData(params)
    }
  }, [loansRes])

  const { loading: commercialLoading, run: getCommercialLoans } = useRequest(submitCommercialLoans, {
    manual: true,
    onSuccess(res) {
      if (res?.code === 200) {
        setLoansRes(res?.data || {})
      }
    },
  })

  const { loading: syndicatedLoading, run: getSyndicatedLoans } = useRequest(submitSyndicatedLoans, {
    manual: true,
    onSuccess(res) {
      if (res?.code === 200) {
        setLoansRes(res?.data || {})
      }
    },
  })

  const { loading: repayLoading, run: getRepayLoans } = useRequest(submitRepayLoans, {
    manual: true,
    onSuccess(res) {
      if (res?.code === 200) {
        setLoansRes(res?.data || {})
      }
    },
  })

  const handleChangeLoansClassify = ({ target: { value } }) => {
    if (commercialLoading) return
    setActiveKey(value)
    setLoansRes(defaultCommercialLoansRes)
    setLoansInfoData(null)
  }

  const handleSubmitLoans = async (value) => {
    if (commercialLoading || syndicatedLoading || repayLoading) return
    const { firsthMomth } = value
    const params = {
      ...value,
      year: dayjs(firsthMomth).year(),
      month: dayjs(firsthMomth).month() + 1,
    }
    delete params.firsthMomth
    switch (activeKey) {
    case '1':
      getCommercialLoans(params)
      break
    case '2':
      getSyndicatedLoans(params)
      break
    case '3':
      getRepayLoans(params)
      break
    default:
      break
    }
    setRequestCacheParams(params)
  }

  return (
    <>
      <MetaInfo {...metaInfo} />
      <Header isDefaultShow={true} />
      <ToolContentLayout>
        <div className={`${styles.home_loans_content} common-card-wrap`}>
          <div className="common-card-content">
            <div className={styles.loans_classify}>
              <Radio.Group
                options={loansOption}
                onChange={handleChangeLoansClassify}
                value={activeKey}
                optionType="button"
              />
            </div>
            <div className={styles.loans_content}>
              {activeKey === '1' && (
                <CommercialLoans
                  loading={commercialLoading}
                  onSubmitLoans={handleSubmitLoans}
                />
              )}
              {activeKey === '2' && (
                <SyndicatedLoans
                  loading={syndicatedLoading}
                  onSubmitLoans={handleSubmitLoans}
                />
              ) }
              {activeKey === '3' && (
                <RepayLoans
                  loading={repayLoading}
                  onSubmitLoans={handleSubmitLoans}
                />
              )}
            </div>
          </div>
        </div>
        {!isEmpty(loansInfoData) && loansInfoData.monthAmountArr.length
          ? (
            <LoansBasicInfo
              activeKey={activeKey}
              loading={commercialLoading || syndicatedLoading}
              loansInfoData={loansInfoData}
            />
          ) : null}

        {!isEmpty(loansInfoData) && loansInfoData.monthAmountArr.length
          ? (
            <CommercialLoansTable
              loading={commercialLoading || syndicatedLoading}
              loansInfoData={loansInfoData}
              loansRes={loansRes}
            />
          ) : null}
        <RuleContent rule={commercialLoansRule} />
      </ToolContentLayout>
    </>
  )
}

export default HomeLoans