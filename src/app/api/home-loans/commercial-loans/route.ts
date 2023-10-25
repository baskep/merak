import { NextResponse } from 'next/server'
import { chain, round } from 'mathjs'

// 等额本息计算
function amountInterestEqual(
  amount: number, // 贷款总金额(万元)
  periods: number, // 贷款总年限
  rate: number, // 利率
  year: number, // 起始年份
  month: number, // 起始月份
) {
  const monthRate = round(rate / 12 / 100, 5)
  const totalMonth = chain(periods).multiply(12).done()
  const totalAmount = chain(amount).multiply(10000).done()

  const totalInterest = chain(totalAmount)
    .multiply(monthRate)
    .multiply(Math.pow((1 + monthRate), totalMonth))
    .done()

  const totalRate = Math.pow((1 + monthRate), totalMonth) - 1

  // 每月总月供
  // 每月月供额 =(贷款本金 × 月利率 × (1＋月利率) ^ 还款月数) ÷ ((1＋月利率) ^ 还款月数-1)
  const totalMonthAmount = round(totalInterest / totalRate, 2)

  // 所有利息
  // 总利息 = 还款月数 × 每月月供额 - 贷款本金
  const totalAllInterest = round(chain(totalMonth).multiply(totalMonthAmount).done(), 2) - totalAmount

  // 全部还款金额
  // 还款金额 = 总利息 + 贷款本金
  const totalRepaymentAmount = chain(totalAllInterest).add(totalAmount).done()

  // 剩余还款本金
  let resetRepaymentAmount = totalAmount

  // 具体每月明细
  const monthAmountArr = []

  let _month = month - 1

  for (let i = 1; i <= totalMonth; i++) {
    _month += 1

    if (_month > 12) {
      _month = 1
      year += 1
    }

    // 每月应还利息
    // 每月应还利息 = 贷款本金 × 月利率 × ((1 + 月利率) ^ 还款月数 - (1+月利率) ^ (还款月序号-1)) ÷((1+月利率) ^ 还款月数 - 1)
    const monthInterest = round((
      chain(totalAmount)
        .multiply(monthRate)
        .multiply(Math.pow((1 + monthRate), totalMonth) - Math.pow((1 + monthRate), i - 1))
        .done()
    ) / (
      Math.pow((1 + monthRate), totalMonth) - 1
    ), 2)

    // 每月应还本金
    // 每月应还本金 = 贷款本金 × 月利率 × (1+月利率) ^ (还款月序号-1) ÷ ((1+月利率) ^ 还款月数 - 1)
    const monthAmount = round((
      chain(totalAmount)
        .multiply(monthRate)
        .multiply(Math.pow((1 + monthRate), i - 1))
        .done()
    ) / (
      (Math.pow((1 + monthRate), totalMonth) - 1)
    ), 2)

    // 每月还款后剩余本金
    resetRepaymentAmount = round(chain(resetRepaymentAmount).subtract(monthAmount).done(), 2)

    monthAmountArr.push({
      monthName: `${year}年${month}月`,
      monthInterest,
      monthAmount,
      totalMonthAmount,
      resetRepaymentAmount,
    })
  }

  return {
    monthAmountArr,
    totalRepaymentAmount,
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
  const monthRate = round(rate / 12 / 100, 5)
  const totalMonth = chain(periods).multiply(12).done()
  const totalAmount = chain(amount).multiply(10000).done()

  // 已还本金
  const refundAmount = 0

  // 每月应还本金
  const monthAmount = round(totalAmount / totalMonth, 2)

  // 总利息
  const totalAllInterest = ''
}

export async function POST(req: Request) {
  try {
    const data = await req.json()

    const { amount, loanType, month, periods, rateType, rateValue, year } = data

    const res = amountInterestEqual(amount, periods, rateValue, year, month)

    const res1 = amountEqual(amount, periods, rateValue, year, month)

    return NextResponse.json({ success: false, message: 'You are not authorized.' })

  } catch (error) {
    console.log('Error in adding a new category:', error)
    return NextResponse.json({ success: false, message: 'Something went wrong. Please try again!' })
  }
}
