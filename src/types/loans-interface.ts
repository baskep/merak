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

// 普通贷款组件 props定义
export interface LoansProps {
  loading: boolean
  commercialLoansRes: CommercialLoansResponse
  onSubmitCommercialLoans(value: LoansField): void
}

// 普通贷款计算信息数据遍历
export interface BasicInfoItem {
  name: string
  prop: string
}

// 普通贷款基本信息
export interface CommercialLoansInfo {
  amount: number
  periods: number
  rateType: number
  rateValue: number
  totalAllInterest: number
  totalRepaymentAmount: number
  monthAmountArr: LoansResponseItem[]
}

// 普通贷款基本信息组件props
export interface CommercialLoansInfoProps {
  loansInfoData: CommercialLoansInfo
}