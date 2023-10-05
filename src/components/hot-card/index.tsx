'use client'

import Weibo from '@/icons/weibo'

import styles from './index.module.less'

const HotCard = (): React.ReactNode => {
  return (
    <div className={styles.hot_card}>
      <div className={styles.hot_card_content}>
        <div className={styles.hot_card_header}>
          <div className={styles.card_header_title}>
            <Weibo />
            <span>微博</span>
          </div>
        </div>
        <div className={styles.hot_card_detail}>
          <div className={styles.hot_list_item}>
            <span className={`${styles.sort} ${styles.first}`}>1</span>
            <span className={styles.list_content}>远房亲戚结婚妈妈让女儿随礼2000</span>
          </div>
          <div className={styles.hot_list_item}>
            <span className={`${styles.sort} ${styles.second}`}>2</span>
            <span className={styles.list_content}>远房亲戚结婚妈妈让女儿随礼2000</span>
          </div>

          <div className={styles.hot_list_item}>
            <span className={`${styles.sort} ${styles.third}`}>3</span>
            <span className={styles.list_content}>远房亲戚结婚妈妈让女儿随礼2000</span>
          </div>

          <div className={styles.hot_list_item}>
            <span className={styles.sort}>4</span>
            <span className={styles.list_content}>远房亲戚结婚妈妈让女儿随礼2000</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HotCard