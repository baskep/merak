import { NextResponse } from 'next/server'
import { chain } from 'mathjs'
import { averageInterest, averageCapital } from 'house-loan-calculator'
import { LoansResponseItem } from '@/types/loans-interface'

interface ComputedResType {
  repay: number
  interest: number
  capital: number
  oddCapital: number
}

// 等额本息计算
function amountInterestEqual(
  amount: number, // 贷款总金额(万元)
  periods: number, // 贷款总年限
  rate: number, // 利率
  year: number, // 起始年份
  month: number, // 起始月份
) {
  const totalMonth = chain(periods).multiply(12).done()

  const res = averageInterest(amount, rate, totalMonth)
  const { totalRepay, totalInterest, monthRepay } = res

  const monthAmountArr: LoansResponseItem[] = []
  let _month = month - 1

  monthRepay.map((item: ComputedResType) => {
    const { repay, interest, capital, oddCapital } = item
    _month += 1

    if (_month > 12) {
      _month = 1
      year += 1
    }

    monthAmountArr.push({
      monthName: `${year}年${_month}月`,
      monthInterest: interest,
      monthAmount: capital,
      totalMonthAmount: repay,
      restRepaymentAmount: oddCapital < 0 ? 0 : oddCapital,
    })
  })

  return {
    monthAmountArr: monthAmountArr,
    totalRepaymentAmount: totalRepay,
    totalAllInterest: totalInterest,
  }
}

// 等额本金计算
function amountEqual(
  amount: number, // 贷款总金额(万元)
  periods: number, // 贷款总年限
  rate: number, // 利率
  year: number, // 起始年份
  month: number, // 起始月份
) {
  const totalMonth = chain(periods).multiply(12).done()

  const res = averageCapital(amount, rate, totalMonth)
  const { totalRepay, totalInterest, monthRepay } = res

  const monthAmountArr: LoansResponseItem[] = []
  let _month = month - 1

  monthRepay.map((item: ComputedResType) => {
    const { repay, interest, capital, oddCapital } = item
    _month += 1

    if (_month > 12) {
      _month = 1
      year += 1
    }

    monthAmountArr.push({
      monthName: `${year}年${_month}月`,
      monthInterest: interest,
      monthAmount: capital,
      totalMonthAmount: repay,
      restRepaymentAmount: oddCapital < 0 ? 0 : oddCapital,
    })
  })

  return {
    monthAmountArr: monthAmountArr,
    totalRepaymentAmount: totalRepay,
    totalAllInterest: totalInterest,
  }

}

export async function POST(req: Request) {
  try {
    const params = await req.json()

    const { amount, repayAmount, loanType, month, periods, rateValue, year } = params

    const restAmount = chain(amount).subtract(repayAmount).done()

    let data = {}

    if (loanType === 1) {
      data = amountInterestEqual(restAmount, periods, rateValue, year, month)
    } else {
      data = amountEqual(restAmount, periods, rateValue, year, month)
    }

    return NextResponse.json({ code: 200, message: '', data })

  } catch (error) {
    return NextResponse.json({ code: 500, message: '请示失败，请稍后再试', data: {} })
  }
}
