import { Spin } from 'antd'
import { BasicInfoItem } from '@/types/loans-interface'
import { CommercialLoansInfoProps, CommercialLoansInfo } from '@/types/loans-interface'

import styles from './index.module.less'

const loansInfoProperty = [
  [
    {
      name: '贷款金额(万元)',
      prop: 'amount',
    },
    {
      name: '贷款期限',
      prop: 'periods',
      render(loansInfoData: CommercialLoansInfo) {
        const { periods } = loansInfoData
        return `${periods}年(${periods * 12}期)`
      },
    },
  ],
  [
    {
      name: '贷款方式',
      prop: 'rateType',
      render(loansInfoData: CommercialLoansInfo) {
        const { rateType } = loansInfoData
        return rateType === 1 ? '等额本息(每月金额相等)' : '等额本金(金额逐月减少)'
      },
    },
    {
      name: '首次还款月份',
      prop: 'month',
      render(loansInfoData: CommercialLoansInfo) {
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
      render(loansInfoData: CommercialLoansInfo) {
        const { rateType, monthAmountArr } = loansInfoData
        return rateType === 1 ? `${monthAmountArr[0].totalMonthAmount}` : '金额逐月减少，请看下表'
      },
    },
  ],
]

const renderText = (loansInfoData: CommercialLoansInfo, propertyItem: BasicInfoItem[]): React.ReactNode => {
  return (
    propertyItem.map((property: BasicInfoItem) => {
      const key = property.prop
      return (
        <div className={styles.loans_info_detail} key={property.prop}>
          <div className={styles.label}>
            {property.name}
          </div>
          <div className={styles.text}>
            {property.render ? `${property.render(loansInfoData)}` : loansInfoData[key]}
          </div>
        </div>
      )
    })
  )
}

const LoansBasicInfo: React.FC<CommercialLoansInfoProps> = (props): React.ReactNode => {
  const { loading, loansInfoData } = props as any

  return (
    <div className="common-card-wrap">
      <div className="common-card-content">
        <div className={styles.loans_basic_info}>
          {loansInfoProperty.map((propertyItem: BasicInfoItem[], index: number) => {
            return (
              <div className={styles.loans_info_item} key={index}>
                {renderText(loansInfoData, propertyItem)}
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