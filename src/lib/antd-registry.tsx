'use client'

import { useMemo, useState, useEffect } from 'react'
import { ConfigProvider } from 'antd'
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs'
import type Entity from '@ant-design/cssinjs/es/Cache'
import zhCN from 'antd/locale/zh_CN'
import 'dayjs/locale/zh-cn'

import { useServerInsertedHTML } from 'next/navigation'

const StyledComponentsRegistry = ({ children }: { children: React.ReactNode }) => {

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const cache = useMemo<Entity>(
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
          components: {
            Radio: {
              buttonBg: '#ffffff',
              buttonCheckedBg: '#007bff',
              buttonColor: '#282a2d',
              colorBorder: '#dee2e6',
              colorPrimary: '#007bff',
            },
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