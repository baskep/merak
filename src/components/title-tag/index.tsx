'use client'

import { TbCategory } from 'react-icons/tb'

import styles from './index.module.less'

interface TitleInterface {
  title: string
}

const TitleTag = (props: TitleInterface): React.ReactNode => {
  const { title } = props
  return (
    <div className={styles.title_tag_wrap}>
      <TbCategory />
      <span>{title}</span>
    </div>
  )
}

export default TitleTag