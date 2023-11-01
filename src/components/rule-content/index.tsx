import { useMemo } from 'react'
import { Typography } from 'antd'
import { RuleItem } from '@/types/interface'

import styles from './index.module.less'
const { Title, Text } = Typography

const RuleContent = (props: { rule: RuleItem[] }): React.ReactNode => {
  const { rule } = props

  const renderText = (textArr: string[]): React.ReactNode => {
    return (
      textArr.map((text: string) => {
        return (
          <p key={text} style={{ marginBottom: '0' }}>
            {text}
          </p>
        )
      })
    )
  }

  const ruleContent = useMemo(() => {
    return rule.map((item: RuleItem, index) => {
      return (
        <div key={index} className={styles.rule_item}>
          <Title style={{ fontSize: '14px', color: '#f1404b' }}>
            {item.title}
          </Title>
          <Text style={{ fontSize: '12px', color: '#282a2d' }}>
            {renderText(item.text)}
          </Text>
        </div>
      )
    })
  }, [rule])

  return (
    <div className="common-card-wrap">
      <div className="common-card-content">
        {ruleContent}
      </div>
    </div>
  )
}

export default RuleContent