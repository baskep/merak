'use client'

import { AiOutlineRight } from 'react-icons/ai'
import ToolContentAnimatie from '@/components/tool-content-animate'
import { ToolLayoutChild } from '@/types/common-interface'

import styles from './index.module.less'

const ToolContentLayout = (props: ToolLayoutChild): React.ReactNode => {
  const { children } = props

  return (
    <>
      <ToolContentAnimatie />
      <div className={styles.tool_content_layout}>
        <div className={styles.tool_detail_header}>
          <div className={styles.test_img} />
          <div className={styles.header_info}>
            <div className={styles.tool_path}>
              <span>软件工具</span>
              <AiOutlineRight />
              <span>在线工具</span>
            </div>
            <h2 className={styles.tool_title}>
            房贷计算器
            </h2>
            <p className={styles.tool_description}>
            在线生成临时邮箱、十分钟邮箱（10分钟)、临时邮、临时Email、快速注册Email、24小时Mail，开通邮箱最长支持24小时，支持邮件转发，自动刷新！
            </p>
          </div>
        </div>
        <div className={styles.tool_detail_coontent}>
          {children}
        </div>
      </div>
    </>
  )
}

export default ToolContentLayout