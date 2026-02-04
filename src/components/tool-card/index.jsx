'use client'

import Link from 'next/link'

import styles from './index.module.less'

const ToolCard = (props) => {
  const { tool } = props

  return (
    <div className={styles.tool_card} >
      <Link href={`${tool.url}`}>
        <div className={styles.card_item_content}>
          <div className={styles.card_header}>
            <img src={tool.imageUrl} />
            <div className={styles.card_header_content}>
              <p>{tool.name}</p>
              <span>{tool.introduce}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ToolCard