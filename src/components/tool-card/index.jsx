'use client'

import { BiChevronRightCircle } from 'react-icons/bi'

import styles from './index.module.less'

const ToolCard = () => {
  return (
    <div className={styles.tool_card} >
      <div className={styles.card_item_content}>
        <div className={styles.card_header}>
          <img
            src="https://avatars.githubusercontent.com/u/31160752?v=4"
            alt="avatar"
          />
          <div className={styles.card_header_content}>
            <p>房贷计算器</p>
            <span>在AI随机生成的地图中可以让你暂时脱离生活，享受沿途风景！</span>
          </div>
        </div>
        <div className={styles.card_footer}>
          <span>基础工具</span>
          <BiChevronRightCircle />
        </div>
      </div>
    </div>
  )
}

export default ToolCard