import { Inter } from 'next/font/google'
import StyledComponentsRegistry from '@/lib/antd-registry'

import '@/assets/reset.css'

const inter = Inter({ subsets: ['latin'] })

const RootLayout = ({ children }: { children: React.ReactNode }): React.ReactNode => {
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

export default RootLayout