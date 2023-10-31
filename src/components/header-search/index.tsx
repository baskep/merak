'use client'

import { useState } from 'react'
import { RiSearchLine } from 'react-icons/ri'
import { SearchTabItem } from '@/types/interface'

import treeBg from '@/assets/img/tree-bg.png'
import styles from './index.module.less'

const defaultTabItems = [
  {
    tab: '1',
    label: '站内',
  },
  {
    tab: '2',
    label: '百度',
  },
  {
    tab: '3',
    label: '谷歌',
  },
  {
    tab: '4',
    label: '必应',
  },
  {
    tab: '5',
    label: 'stackoverflow',
  },
  {
    tab: '6',
    label: 'github',
  },
]

const headerSearch = (): React.ReactNode => {
  const [activeTab, setActiveTab] = useState<string>('1')

  const handleClickSearchAreaTab = (item: SearchTabItem) => {
    setActiveTab(item.tab)
  }

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
                <div
                  className={`${styles.search_area_tab} ${activeTab === item.tab ? styles.active : ''}`}
                  key={item.label}
                  onClick={() => handleClickSearchAreaTab(item)}
                >
                  {item.label}
                </div>
              )
            })}
          </div>
          <div className={styles.search_area_input} >
            <input placeholder="请输入搜索内容" />
            <RiSearchLine />
          </div>
        </div>
      </div>
      <script type="text/javascript" src="/static/star-landscape.js" />
    </>
  )
}

export default headerSearch