'use client'

import Weather from '@/components/icons/weather'

import styles from './index.module.less'

const Header = () => {
  return (
    <div className={styles.app_header}>
      <div className={styles.header_left}>
        <div className={`${styles.header_item} ${styles.weather}`}>
          <span className={styles.text}>重庆</span>
          <Weather></Weather>
          <span className={styles.centigrade}>22℃</span>
          <span className={styles.air_quality}>优</span>
        </div>
      </div>
      <div className={styles.header_right}>
        <span className={styles.tip}>今天就到这里了，先回去等通知吧</span>
      </div>
    </div>
  )
}

export default Header