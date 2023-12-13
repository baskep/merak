'use client'

import { Button } from 'antd'
import { downloadBase64File } from '@/utils'

import styles from './index.module.less'

const GenerateResult = (props) => {
  const { dataUrl } = props

  const handleDownloadQRCode = () => {
    downloadBase64File(dataUrl, `二维码_${ new Date().getTime() }` )
  }

  return (
    <div className="common-card-wrap">
      <div className="common-card-content">
        <div className={styles.generate_result}>
          <img src={dataUrl} />
        </div>
        <div className={styles.qrcode_download}>
          <Button
            type="primary"
            size="large"
            onClick={handleDownloadQRCode}
          >
            下载
          </Button>
        </div>
      </div>
    </div>
  )
}

export default GenerateResult