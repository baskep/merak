'use client'

import Weather from '@/icons/weather'
import { AiFillHome } from 'react-icons/ai'
import { BsFire } from 'react-icons/bs'
import { BiLinkAlt } from 'react-icons/bi'

import styles from './index.module.less'

const Header = (): React.ReactNode => {
  return (
    <header className={styles.header_content}>
      <div className={styles.header_left}>
        <div className={`${styles.header_item} ${styles.weather}`}>
          <span className={styles.text}>重庆</span>
          <Weather />
          <span className={styles.centigrade}>22℃</span>
          <span className={styles.air_quality}>优</span>
        </div>
        <div className={`${styles.header_item} ${styles.header_item_icon}`}>
          <AiFillHome />
          <span>首页</span>
        </div>
        <div className={`${styles.header_item} ${styles.header_item_icon}`}>
          <BsFire />
          <span>今日热榜</span>
        </div>
        <div className={`${styles.header_item} ${styles.header_item_icon}`}>
          <BiLinkAlt />
          <span>友情链接</span>
        </div>
      </div>
      <div className={styles.header_right}>
        <span className={styles.tip}>今天就到这里了，先回去等通知吧</span>
      </div>
    </header>
  )
}

export default Header