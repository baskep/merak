import { Dayjs } from 'dayjs'

// 搜索区域tab
export interface SearchTabItem {
  tab: string
  label: string
}

// 首页tab 组件 props定义
export interface TitleProps {
  title: string
}

// 工具详情页children定义
export interface ToolLayoutProps {
  children?: React.ReactNode
}

// 普通贷款表单字段
export interface LoansField {
  amount?: number
  periods?: number
  loanType?: number
  firsthMomth?: Dayjs
  rateType?: number
  rateValue?: number
}

// 普通贷款组件 props定义
export interface LoansProps {
  onSubmitCommercialLoans(value: LoansField): void
}

// 分期选项
export interface PeriodsField {
  value: number
  label: string
}
