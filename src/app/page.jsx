'use client'

import Header from '@/components/header'
import HeaderSearch from '@/components/header-search'
import TitleTag from '@/components/title-tag'
import HotCard from '@/components/hot-card'
import ToolCard from '@/components/tool-card'

import styles from './index.module.less'

const testToolCard = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const testHotCard = [1, 2, 3]

const Home = () => {

  return (
    <>
      <Header />
      <HeaderSearch />
      <div className={styles.home_page_wrap}>
        {/* <div className={styles.home_hot_content}>
          {testHotCard.map((item) => {
            return (
              <HotCard key={item} />
            )
          })}
        </div> */}
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
    </>
  )
}

export default Home