'use client'

import { useEffect, useState } from 'react'
import TitleTag from '@/components/title-tag'
import ToolCard from '@/components/tool-card'

import styles from './index.module.less'

const HomePage = (props) => {
  const { allTool } = props
  const [toolCard, setToolCard] = useState({})

  useEffect(() => {
    if (Array.isArray(allTool)) {
      const _toolCard = {}
      allTool.map((tool) => {
        const { category } = tool
        const { name } = category
        _toolCard[name] = _toolCard[name] || []
        _toolCard[name].push({ ...tool })
      })
      setToolCard(_toolCard)
    }
  }, [allTool])

  return (
    <div className={styles.home_page_wrap}>
      <div className={styles.home_page_content}>
        {Object.keys(toolCard).map((key) => {
          const tools = toolCard[key]
          return (
            <div className={styles.home_content_item} key={key}>
              <TitleTag title="生活实用" />
              <div className={styles.card_content}>
                {tools.map((item) => {
                  return (
                    <ToolCard key={item.id} tool={item} />
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default HomePage