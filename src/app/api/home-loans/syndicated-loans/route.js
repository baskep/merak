import { NextResponse } from 'next/server'
import { chain } from 'mathjs'
import { houseLoanCalc } from 'house-loan-calculator'

// 等额本息计算
const amountInterestEqual = (
  amount, // 贷款总金额(万元)
  periods, // 贷款总年限
  rate, // 利率
  year, // 起始年份
  month, // 起始月份
  publicAmount, // 公积金贷款金额(万元)
  publicRateValue, // 公积金贷款利率
) => {
  const totalMonth = chain(periods).multiply(12).done()

  const res = houseLoanCalc(amount, rate, totalMonth, publicAmount, publicRateValue, totalMonth, 'debx')

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
  publicAmount, // 公积金贷款金额(万元)
  publicRateValue, // 公积金贷款利率
) => {
  const totalMonth = chain(periods).multiply(12).done()

  const res = houseLoanCalc(amount, rate, totalMonth, publicAmount, publicRateValue, totalMonth, 'debj')

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

    const {
      amount,
      loanType,
      month,
      periods,
      rateValue,
      year,
      publicAmount,
      publicRateValue,
    } = params

    let data = {}
    if (loanType === 1) {
      data = amountInterestEqual(
        amount,
        periods,
        rateValue,
        year,
        month,
        publicAmount,
        publicRateValue,
      )
    } else {
      data = amountEqual(
        amount,
        periods,
        rateValue,
        year,
        month,
        publicAmount,
        publicRateValue,
      )
    }

    return NextResponse.json({ code: 200, message: '', data })

  } catch (error) {
    return NextResponse.json({ code: 500, message: '请示失败，请稍后再试', data: {} })
  }
}
