import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import StyledComponentsRegistry from '@/lib/antd-registry'

import '@/assets/reset.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '一个网站',
  description: '测试网站',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className={inter.className}>
        <StyledComponentsRegistry>
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
