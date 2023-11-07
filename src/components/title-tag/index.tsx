'use client'

import { TbCategory } from 'react-icons/tb'
import { Title } from '@/types/common-interface'

import styles from './index.module.less'

const TitleTag = (props: Title): React.ReactNode => {
  const { title } = props
  return (
    <div className={styles.title_tag_wrap}>
      <TbCategory />
      <span>{title}</span>
    </div>
  )
}

export default TitleTag