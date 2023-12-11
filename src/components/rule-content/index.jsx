'use client'

import { useMemo } from 'react'
import { Typography } from 'antd'

import styles from './index.module.less'

const { Title, Text } = Typography

const RuleContent = (props) => {
  const { rule } = props

  const renderText = (textArr) => {
    return (
      textArr.map((text) => {
        return (
          <p key={text} style={{ marginBottom: '0' }}>
            {text}
          </p>
        )
      })
    )
  }

  const ruleContent = useMemo(() => {
    return rule.map((item, index) => {
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