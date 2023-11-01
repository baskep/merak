'use client'

import { useState } from 'react'
import { Radio } from 'antd'
import type { RadioChangeEvent } from 'antd'
import dayjs from 'dayjs'
import { useRequest } from 'ahooks'

import Header from '@/components/header'
import ToolContentLayout from '@/components/tool-content-layout'
import CommercialLoans from '@/components/home-loans/commercial-loans'
import SyndicatedLoans from '@/components/home-loans/syndicated-loans'
import LoansBasicInfo from '@/components/home-loans/loans-basic-info'
import RepayLoans from '@/components/home-loans/repay-loans'
import RuleContent from '@/components/rule-content'

import { submitCommercialLoans } from '@/service/home-loans'
import { LoansField, CommercialLoansResponse, RuleItem } from '@/types/interface'
import { commercialLoansRule } from '@/config/home-loans'

import styles from './index.module.less'

const mortgageOption = [{
  label: '普通贷款',
  value: '1',
}, {
  label: '组合贷款',
  value: '2',
}, {
  label: '提前还贷',
  value: '3',
}]

const HomeLoans = (): React.ReactNode => {
  const [activeKey, setActiveKey] = useState<string>('1')
  const [commercialLoansRes, setCommercialLoans] = useState<CommercialLoansResponse[]>([])
  const [rule, setRule] = useState<RuleItem[]>(commercialLoansRule)

  const { loading, run: getCommercialLoans } = useRequest(submitCommercialLoans, {
    manual: true,
    onSuccess(res) {
      if (res?.code === 200) {
        setCommercialLoans(res?.data || {})
      }
    },
  })

  const handleChangeMortgageClassify = ({ target: { value } }: RadioChangeEvent) => {
    if (loading) return
    setActiveKey(value)
    setCommercialLoans([])
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
                options={mortgageOption}
                onChange={handleChangeMortgageClassify}
                value={activeKey}
                optionType="button"
              />
            </div>
            <div className={styles.loans_content}>
              {activeKey === '1' && (
                <CommercialLoans
                  loading={loading}
                  commercialLoansRes={commercialLoansRes}
                  onSubmitCommercialLoans={handleSubmitCommercialLoans}
                />
              )}
              {activeKey === '2' && <SyndicatedLoans />}
              {activeKey === '3' && <RepayLoans /> }
            </div>
          </div>
        </div>

        <div className="common-card-wrap">
          <div className="common-card-content">
            <LoansBasicInfo />
          </div>
        </div>
        <RuleContent rule={rule} />
      </ToolContentLayout>
    </>
  )
}

export default HomeLoans