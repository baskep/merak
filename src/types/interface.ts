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
  loading: boolean
  commercialLoansRes: CommercialLoansResponse[]
  onSubmitCommercialLoans(value: LoansField): void
}

// 分期选项
export interface PeriodsField {
  value: number
  label: string
}

interface LoansResponseItem {
  monthName: string
  monthAmount: number
  monthInterest: number
  totalMonthAmount: number
  restRepaymentAmount: number
}

// 普通贷款响应结果
export interface CommercialLoansResponse {
  monthAmountArr: LoansResponseItem[]
  totalRepaymentAmount: number
  totalAllInterest: number
}

// 规则定义
export interface RuleItem {
  title: string
  text: string[]
}

// 贷款计算信息数据遍历时的定义
export interface BasicInfoItem {
  name: string
  prop: string
}