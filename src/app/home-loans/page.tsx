'use client'

import { useState } from 'react'
import { Radio } from 'antd'
import type { RadioChangeEvent } from 'antd'
import dayjs from 'dayjs'

import Header from '@/components/header'
import ToolContentLayout from '@/components/tool-content-layout'
import CommercialLoans from '@/components/home-loans/commercial-loans'
import { submitCommercialLoans } from '@/service/home-loans'
import { LoansField } from '@/types/interface'

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

const HomeMortgage = (): React.ReactNode => {
  const [activeKey, setActiveKey] = useState<string>('1')

  const handleChangeMortgageClassify = ({ target: { value } }: RadioChangeEvent): void => {
    setActiveKey(value)
  }

  const handleSubmitCommercialLoans = (value: LoansField): void => {
    const { firsthMomth } = value
    const params = {
      ...value,
      year: dayjs(firsthMomth).year(),
      month: dayjs(firsthMomth).month() + 1,
    }
    delete params.firsthMomth
    submitCommercialLoans(params)
  }

  return (
    <>
      <title>等额本息和等额本金哪个划算-房贷计算器-房贷计算器2023年最新版</title>
      <meta name="description" content="想知道等额本息和等额本金哪个划算?房贷提前还款什么时候最划算？提供在线房贷计算器，可以根据2023年利率计算出利息和本金，以及每一期需要还款的金额明细。" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content="等额本息和等额本金哪个划算,房贷计算器2023年最新版,贷款计算器" />
      <Header isDefaultShow={true} />
      <ToolContentLayout>
        <div className={styles.home_mortgage_content}>
          <div className={styles.mortgage_classify}>
            <Radio.Group
              options={mortgageOption}
              onChange={handleChangeMortgageClassify}
              value={activeKey}
              optionType="button"
            />
          </div>
          <div className={styles.mortgage_content}>
            <CommercialLoans onSubmitCommercialLoans={handleSubmitCommercialLoans} />
          </div>
        </div>
      </ToolContentLayout>
    </>
  )
}

export default HomeMortgage