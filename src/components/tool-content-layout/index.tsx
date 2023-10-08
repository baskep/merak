'use client'

import styles from './index.module.less'

interface ToolLayoutInterface {
  children?: React.ReactNode
}

const ToolContentLayout = (props: ToolLayoutInterface): React.ReactNode => {
  const { children } = props

  return (
    <div className={styles.tool_content_layout}>
      <div className={styles.tool_detail_header}>
        <div className={styles.test_img} />
        <div className={styles.header_info}>
          <div className={styles.tool_path}>
            <span>软件工具</span>
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}

export default ToolContentLayout