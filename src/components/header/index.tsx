'use client'

import styles from './index.module.less'

export default function Header() {
  return (
    <div className={styles.app_header}>
      <div className={styles.header_left}>
        <div className={`${styles.header_item} ${styles.weather}`}>
          <span className={styles.text}>重庆</span>
        </div>
      </div>
    </div>
  )
}