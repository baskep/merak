'use client'

import { useMemo, useState, useEffect } from 'react'
import { ConfigProvider } from 'antd'
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs'
import zhCN from 'antd/locale/zh_CN'
import 'dayjs/locale/zh-cn'

import { useServerInsertedHTML } from 'next/navigation'

const StyledComponentsRegistry = ({ children }) => {

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const cache = useMemo(
    () => createCache(),
    [createCache],
  )

  useServerInsertedHTML(() => {
    return (
      <style id="antd" dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }} />
    )
  })

  return (
    <StyleProvider >
      <ConfigProvider
        theme={{
          token: {
            colorBorder: '#dee2e6',
            colorPrimary: '#007bff',
          },
        }}
        locale={zhCN}
      >
        {mounted && children}
      </ConfigProvider>
    </StyleProvider>
  )
}

export default StyledComponentsRegistry