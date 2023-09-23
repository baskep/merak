'use client'

import { Tabs } from 'antd'
import { useState } from 'react'
import treeBg from '@/assets/img/tree-bg.png'
import styles from './index.module.less'

const defaultTabItems = [
  {
    key: '1',
    label: '站内',
  },
  {
    key: '2',
    label: '百度',
  },
  {
    key: '3',
    label: '谷歌',
  },
  {
    key: '4',
    label: '必应',
  },
  {
    key: '5',
    label: 'stackoverflow',
  },
  {
    key: '6',
    label: 'github',
  },
]

const headerSearch = (): React.ReactNode => {

  return (
    <>
      <div className={`${styles.header_search} header-search`}>
        <div className={styles.landscape} style={{ backgroundImage: `url(${treeBg.src})` }} />
        <div className={styles.filter} />
        <canvas id="canvas" className={styles.canvas} />
        <div className={styles.search_area}>
          <h2>一个网站</h2>
          <div className={styles.search_area_tabs}>
            {defaultTabItems.map((item) => {
              return (
                <div className={styles.search_area_tab} key={item.label}>
                  {item.label}
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <script type="text/javascript" src="/static/star-landscape.js" />
    </>
  )
}

export default headerSearch