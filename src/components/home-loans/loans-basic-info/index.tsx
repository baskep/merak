import { BasicInfoItem } from '@/types/interface'

import styles from './index.module.less'

const loansInfoProperty = [
  [
    {
      name: '贷款金额',
      prop: 'test1',
    },
    {
      name: '贷款期限',
      prop: 'test2',
    },
  ],
  [
    {
      name: '贷款方式',
      prop: 'test3',
    },
    {
      name: '首次还款月份',
      prop: 'test4',
    },
  ],
  [
    {
      name: '利率模式',
      prop: 'test5',
    },
    {
      name: '	利率(百分比)',
      prop: 'test6',
    },
  ],
  [
    {
      name: '总利息',
      prop: 'test7',
    },
    {
      name: '每月总还款(月供)',
      prop: 'test8',
    },
  ],
]

const renderText = (propertyItem: BasicInfoItem[]): React.ReactNode => {
  return (
    propertyItem.map((property: BasicInfoItem, index: number) => {
      return (
        <>
          <div className={styles.label}>
            {property.name}
          </div>
          <div className={styles.text}>
            {property.prop}
          </div>
        </>
      )
    })
  )
}

const LoansBasicInfo = (): React.ReactNode => {
  return (
    <div className={styles.loans_basic_info}>
      {loansInfoProperty.map((propertyItem: BasicInfoItem[], index: number) => {
        return (
          <div className={styles.loans_info_item} key={index}>
            {renderText(propertyItem)}
          </div>
        )
      })}
    </div>
  )
}

export default LoansBasicInfo