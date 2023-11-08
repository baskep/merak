import { Dayjs } from 'dayjs'

// 普通贷款表单字段
export interface LoansField {
  amount?: number
  periods?: number
  loanType?: number
  firsthMomth?: Dayjs
  rateType?: number
  rateValue?: number
}

// 普通贷款请求完整字段
export type requestField = LoansField & { year: number; month: number }

// 分期选项
export interface PeriodsField {
  value: number
  label: string
}

export interface LoansResponseItem {
  monthName: string
  monthAmount: number
  monthInterest: number
  totalMonthAmount: number
  restRepaymentAmount: number
}

// 普通贷款响应结果
export interface LoansResponse {
  monthAmountArr: LoansResponseItem[]
  totalRepaymentAmount: number
  totalAllInterest: number
}

// 普通贷款组件 props定义
export interface LoansProps {
  loading: boolean
  onSubmitCommercialLoans(value: LoansField): void
}

// 普通贷款计算信息数据遍历
export interface BasicInfoItem {
  name: string
  prop: string
  render?(value: LoansField, activeKey?: string): string
}

// 普通贷款基本信息
export interface LoansInfo {
  year: number
  month: number
  amount: number
  periods: number
  rateType: number
  rateValue: number
  totalAllInterest: number
  totalRepaymentAmount: number
  monthAmountArr: LoansResponseItem[]
  [key: string]: any
}

// 普通贷款基本信息组件props
export interface LoansInfoProps {
  activeKey: string
  loansInfoData: LoansInfo
  loading: boolean
}

// 普通贷款组件table 列表props
export interface LoansTableProps {
  loansRes: LoansResponse
  loansInfoData: LoansInfo
  loading: boolean
}

// 公积金贷款表单字段
export interface PublicLoansField {
  publicAmount?: number
  publicRateValue?: number
}

export type SyndicatedLoansField = LoansField & PublicLoansField

// 组合贷款组件 props定义
export interface SyndicatedLoansProps {
  loading: boolean
  onSubmitSyndicatedLoans(value: SyndicatedLoansField): void
}

