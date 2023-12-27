'use client'

import { useState } from 'react'
import { Input, Button, message } from 'antd'
import QRCode from 'qrcode'

import MetaInfo from '@/components/meta-info'
import Header from '@/components/header'
import ToolContentLayout from '@/components/tool-content-layout'
import RuleContent from '@/components/rule-content'
import GenerateResult from '@/components/qrcode/generate-result'
import { useToolInfo } from '@/hooks/use-tool-info'
import { qrcodeRule } from '@/config/qrcode'

import { filterXSS } from '@/utils'

import styles from './index.module.less'

const { TextArea } = Input

const metaInfo = {
  title: '在线免费二维码生成器-二维码怎么制作',
  keywords: '二维码生成器,二维码怎么制作',
  description: '二维码生成工具是一款免费的在线二维码生成工具,支持网址生成二维码,网址转换成二维码,用户可以输入文本内容、网址或者中文，就能一键生成专属的二维码图片，以供二维码扫描器扫描。生成的二维码只需要扫一扫就能把内容扫描进手机，方便快捷',
}

const QrCodeUtil = () => {
  const [toolInfo] = useToolInfo()
  const [value, setValue] = useState('')
  const [dataUrl, setDataUrl] = useState('')
  const [messageApi, contextHolder] = message.useMessage()

  const handleChangeValue = (e) => {
    const { value } = e.target
    setValue(value)
  }

  const handleGenerateQRCode = async () => {
    if (!value) {
      messageApi.open({
        type: 'error',
        content: '内容不能为空！',
      })
      return
    }

    const text = filterXSS(value)
    const dataUrl = await QRCode.toDataURL(text, { margin: 1, width: 200 })
    setDataUrl(dataUrl)
  }

  const handleClearQRCode = () => {
    setDataUrl('')
  }

  return (
    <>
      <MetaInfo {...metaInfo} />
      {contextHolder}
      <Header isDefaultShow={true} />
      <ToolContentLayout toolInfo={toolInfo}>
        <div className="common-card-wrap">
          <div className="common-card-content">
            <div className={styles.qrcode_form}>
              <TextArea
                rows={4}
                maxLength={100}
                showCount
                placeholder="请输入需要生成二维码的内容"
                value={value}
                onChange={handleChangeValue}
              />
              <div className={styles.submit_btn}>
                <Button
                  type="primary"
                  size="large"
                  onClick={handleGenerateQRCode}
                >
                  立即生成
                </Button>
                <Button
                  size="large"
                  onClick={handleClearQRCode}
                >
                  清空内容
                </Button>
              </div>
            </div>
          </div>
        </div>
        {dataUrl && <GenerateResult dataUrl={dataUrl}/>}
        <RuleContent rule={qrcodeRule} />
      </ToolContentLayout>
    </>
  )
}

export default QrCodeUtil