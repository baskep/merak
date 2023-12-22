'use client'

import TitleTag from '@/components/title-tag'
import ToolCard from '@/components/tool-card'

import styles from './index.module.less'

const testToolCard = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const HomePage = () => {
  return (
    <div className={styles.home_page_wrap}>
      <div className={styles.home_page_content}>
        <div className={styles.home_content_item}>
          <TitleTag title="生活实用" />
          <div className={styles.card_content}>
            {testToolCard.map((item) => {
              return (
                <ToolCard key={item} />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage