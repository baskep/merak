'use client'

import { useEffect, useState } from 'react'
import { Spin } from 'antd'
import { chain, round } from 'mathjs'
import { BasicInfoItem } from '@/types/loans-interface'
import { LoansInfoProps, LoansInfo } from '@/types/loans-interface'

import styles from './index.module.less'

const defaultLoansInfoProperty = [
  [
    {
      name: '总贷款金额(万元)',
      prop: 'amount',
      render(loansInfoData: LoansInfo, activeKey: string) {
        const { amount, repayAmount, publicAmount } = loansInfoData
        if (activeKey === '3') {
          return chain(amount).subtract(repayAmount).done()
        }
        return publicAmount ? `${round(chain(publicAmount).add(amount).done(), 2)}` : `${amount}`
      },
    },
    {
      name: '贷款期限',
      prop: 'periods',
      render(loansInfoData: LoansInfo) {
        const { periods } = loansInfoData
        return `${periods}年(${periods * 12}期)`
      },
    },
  ],
  [
    {
      name: '贷款方式',
      prop: 'loanType',
      render(loansInfoData: LoansInfo) {
        const { loanType } = loansInfoData
        return loanType === 1 ? '等额本息(每月金额相等)' : '等额本金(金额逐月减少)'
      },
    },
    {
      name: '首次还款月份',
      prop: 'month',
      render(loansInfoData: LoansInfo) {
        const { year, month } = loansInfoData
        return `${year}年${month}月`
      },
    },
  ],
  [
    {
      name: '利率模式',
      prop: 'rateMode',
      render() {
        return '固定利率'
      },
    },
    {
      name: '利率(百分比)',
      prop: 'rateValue',
      render(loansInfoData: LoansInfo, activeKey: string) {
        if (activeKey === '2') {
          return `商业贷款利率${loansInfoData.rateValue}%, 公积金贷款利率${loansInfoData.publicRateValue}%`
        }
        return `${loansInfoData.rateValue}`

      },
    },
  ],
  [
    {
      name: '总利息',
      prop: 'totalAllInterest',
    },
    {
      name: '每月总还款(月供)',
      prop: 'monthAmount',
      render(loansInfoData: LoansInfo) {
        const { loanType, monthAmountArr } = loansInfoData
        return loanType === 1 ? `${monthAmountArr[0].totalMonthAmount}` : '金额逐月减少，请看下表'
      },
    },
  ],
]

const renderText = (
  loansInfoData: LoansInfo,
  propertyItem: BasicInfoItem[],
  activeKey?: string,
): React.ReactNode => {
  return (
    propertyItem.map((property: BasicInfoItem) => {
      const key = property.prop
      return (
        <div className={styles.loans_info_detail} key={property.prop}>
          <div className={styles.label}>
            {property.name}
          </div>
          <div className={styles.text}>
            {property.render ? `${property.render(loansInfoData, activeKey)}` : loansInfoData[key]}
          </div>
        </div>
      )
    })
  )
}

const LoansBasicInfo: React.FC<LoansInfoProps> = (props): React.ReactNode => {
  const { activeKey, loading, loansInfoData } = props as any
  const [loansInfoProperty, setLoansInfoProperty] = useState(defaultLoansInfoProperty)

  useEffect(() => {
    const _loansInfoProperty = [...loansInfoProperty]
    _loansInfoProperty[0][0].name = activeKey === '3' ? '剩余贷款金额(万元)' : '总贷款金额(万元)'
    setLoansInfoProperty(_loansInfoProperty)
  }, [activeKey])

  return (
    <div className="common-card-wrap">
      <div className="common-card-content">
        <div className={styles.loans_basic_info}>
          {loansInfoProperty.map((propertyItem: BasicInfoItem[], index: number) => {
            return (
              <div className={styles.loans_info_item} key={index}>
                {renderText(loansInfoData, propertyItem, activeKey)}
              </div>
            )
          })}
          {loading ? (
            <div className={styles.loans_info_loading}>
              <Spin />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default LoansBasicInfo