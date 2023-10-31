'use client'

import { useEffect, useState } from 'react'
import { useDebounceFn } from 'ahooks'
import Weather from '@/icons/weather'
import { AiFillHome } from 'react-icons/ai'
import { BiLinkAlt } from 'react-icons/bi'
// import { BsFire } from 'react-icons/bs'

import styles from './index.module.less'

const Header = ({ isDefaultShow = false }): React.ReactNode => {
  const [isShowBg, setIsShowBg] = useState<boolean>(isDefaultShow)

  const scrollFunction = () => {
    const ele = document.documentElement || document.body
    setIsShowBg(['/'].includes(location.pathname) ? ele.scrollTop > 74 : true)
  }

  const { run } = useDebounceFn(scrollFunction, { wait: 50 })

  useEffect(() => {
    window.addEventListener('scroll', run)
    return () => {
      window.removeEventListener('scroll', run)
    }
  }, [])

  return (
    <header className={`${styles.header_content} ${isShowBg ? styles.header_content_show : ''}`}>
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
        {/* <div className={`${styles.header_item} ${styles.header_item_icon}`}>
          <BsFire />
          <span>消息订阅</span>
        </div> */}
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