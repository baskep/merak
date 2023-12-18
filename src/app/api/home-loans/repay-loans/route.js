import { NextResponse } from 'next/server'
import { chain } from 'mathjs'
import { averageInterest, averageCapital } from 'house-loan-calculator'

// 等额本息计算
const amountInterestEqual = (
  amount, // 贷款总金额(万元)
  periods, // 贷款总年限
  rate, // 利率
  year, // 起始年份
  month, // 起始月份
) => {
  const totalMonth = chain(periods).multiply(12).done()

  const res = averageInterest(amount, rate, totalMonth)
  const { totalRepay, totalInterest, monthRepay } = res

  const monthAmountArr = []
  let _month = month - 1

  monthRepay.map((item) => {
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
const amountEqual = (
  amount, // 贷款总金额(万元)
  periods, // 贷款总年限
  rate, // 利率
  year, // 起始年份
  month, // 起始月份
) => {
  const totalMonth = chain(periods).multiply(12).done()

  const res = averageCapital(amount, rate, totalMonth)
  const { totalRepay, totalInterest, monthRepay } = res

  const monthAmountArr = []
  let _month = month - 1

  monthRepay.map((item) => {
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

export async function POST(req) {
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
