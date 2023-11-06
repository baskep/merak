'use client'

import { useEffect, useState } from 'react'
import { Radio } from 'antd'
import type { RadioChangeEvent } from 'antd'
import dayjs from 'dayjs'
import { useRequest } from 'ahooks'
import { isEmpty } from 'lodash'

import Header from '@/components/header'
import ToolContentLayout from '@/components/tool-content-layout'
import CommercialLoans from '@/components/home-loans/commercial-loans'
import SyndicatedLoans from '@/components/home-loans/syndicated-loans'
import LoansBasicInfo from '@/components/home-loans/loans-basic-info'
import RepayLoans from '@/components/home-loans/repay-loans'
import RuleContent from '@/components/rule-content'
import CommercialLoansTable from '@/components/home-loans/commercial-loans-table'

import { submitCommercialLoans } from '@/service/home-loans'
import { RuleItem } from '@/types/common-interface'
import { LoansField, CommercialLoansInfo, CommercialLoansResponse, requestField } from '@/types/loans-interface'
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

const HomeLoans = (): React.ReactNode => {
  const [activeKey, setActiveKey] = useState<string>('1')
  const [loansInfoData, setLoansInfoData] = useState<CommercialLoansInfo>()
  const [commercialLoansRes, setCommercialLoansRes] = useState<CommercialLoansResponse>(defaultCommercialLoansRes)
  const [requestCacheParams, setRequestCacheParams] = useState<requestField>()
  const [rule] = useState<RuleItem[]>(commercialLoansRule)

  useEffect(() => {
    if (
      !isEmpty(commercialLoansRes) &&
      commercialLoansRes.totalAllInterest &&
      commercialLoansRes.totalRepaymentAmount
    ) {
      const { amount, periods, rateType, rateValue, year, month } = requestCacheParams as any
      const { totalAllInterest, monthAmountArr, totalRepaymentAmount } = commercialLoansRes
      const params = {
        year,
        month,
        amount,
        periods,
        rateType,
        rateValue,
        monthAmountArr,
        totalAllInterest,
        totalRepaymentAmount,
      }
      setLoansInfoData(params)
    }
  }, [commercialLoansRes])

  const { loading: commercialLoading, run: getCommercialLoans } = useRequest(submitCommercialLoans, {
    manual: true,
    onSuccess(res) {
      if (res?.code === 200) {
        setCommercialLoansRes(res?.data || {})
      }
    },
  })

  const handleChangeLoansClassify = ({ target: { value } }: RadioChangeEvent) => {
    if (commercialLoading) return
    setActiveKey(value)
    setCommercialLoansRes(defaultCommercialLoansRes)
  }

  const handleSubmitCommercialLoans = async (value: LoansField) => {
    const { firsthMomth } = value
    const params = {
      ...value,
      year: dayjs(firsthMomth).year(),
      month: dayjs(firsthMomth).month() + 1,
    }
    delete params.firsthMomth
    getCommercialLoans(params)
    setRequestCacheParams(params)
  }

  return (
    <>
      <title>等额本息和等额本金哪个划算-房贷计算器-房贷计算器2023年最新版</title>
      <meta name="description" content="想知道等额本息和等额本金哪个划算?房贷提前还款什么时候最划算？提供在线房贷计算器，可以根据2023年利率计算出利息和本金，以及每一期需要还款的金额明细。" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content="等额本息和等额本金哪个划算,房贷计算器2023年最新版,贷款计算器" />
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
                  onSubmitCommercialLoans={handleSubmitCommercialLoans}
                />
              )}
              {activeKey === '2' && <SyndicatedLoans />}
              {activeKey === '3' && <RepayLoans /> }
            </div>
          </div>
        </div>
        {!isEmpty(loansInfoData) && (
          <LoansBasicInfo
            loading={commercialLoading}
            loansInfoData={loansInfoData}
          />
        )}
        {!isEmpty(loansInfoData) && (
          <CommercialLoansTable
            loading={commercialLoading}
            loansInfoData={loansInfoData}
            commercialLoansRes={commercialLoansRes}
          />
        )}
        <RuleContent rule={rule} />
      </ToolContentLayout>
    </>
  )
}

export default HomeLoans