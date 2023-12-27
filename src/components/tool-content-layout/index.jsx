'use client'

import ToolContentAnimatie from '@/components/tool-content-animate'

import styles from './index.module.less'

const ToolContentLayout = (props) => {
  const { children, toolInfo } = props

  return (
    <>
      <ToolContentAnimatie />
      <div className={styles.tool_content_layout}>
        <div className={styles.tool_detail_header}>
          <div className={styles.header_img}>
            <img src={toolInfo?.imageUrl} />
          </div>
          {toolInfo?.category?.name
            ? (
              <div className={styles.header_info}>
                <div className={styles.tool_path}>
                  <span>{toolInfo?.category?.name}</span>
                </div>
                <h2 className={styles.tool_title}>
                  {toolInfo?.name}
                </h2>
                <p className={styles.tool_description}>
                  {toolInfo?.introduce}
                </p>
              </div>
            ) : null}
        </div>
        <div className={styles.tool_detail_coontent}>
          {children}
        </div>
      </div>
    </>
  )
}

export default ToolContentLayout