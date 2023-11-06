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
  const totalAllInterest = round(chain(totalMonth).multiply(totalMonthAmount).subtract(totalAmount).done(), 2)

  // 全部还款金额
  // 还款金额 = 总利息 + 贷款本金
  const totalRepaymentAmount = chain(totalAllInterest).add(totalAmount).done()

  // 剩余还款本金
  let restRepaymentAmount = totalAmount

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
    restRepaymentAmount = round(chain(restRepaymentAmount).subtract(monthAmount).done(), 2)

    monthAmountArr.push({
      monthName: `${year}年${_month}月`,
      monthInterest,
      monthAmount,
      totalMonthAmount,
      restRepaymentAmount: restRepaymentAmount < 0 ? 0 : restRepaymentAmount,
    })
  }

  return {
    monthAmountArr,
    totalRepaymentAmount,
    totalAllInterest,
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

  // 每月应还本金
  // 每月应还本金 = 贷款本金 ÷ 还款月数
  const monthPrincipal = round(totalAmount / totalMonth, 2)

  // 已还本金
  let refundAmount = 0

  // 每月递减额
  // 每月递减额 = 每月应还本金 × 月利率 = 贷款本金 ÷ 还款月数 × 月利率
  // const monthDecrease = round(chain(monthPrincipal).multiply(monthRate).done(), 2)

  // 总利息
  // 总利息 = ((总贷款额 ÷ 还款月数 + 总贷款额 × 月利率) + 总贷款额 ÷ 还款月数 × (1 + 月利率)) ÷ 2 × 还款月数 - 总贷款额
  const totalAllInterest = round(
    (
      chain(
        chain(totalAmount)
          .multiply(monthRate)
          .add(monthPrincipal)
          .done(),
      )
        .add(totalAmount / totalMonth * (1 + monthRate))
        .done()) / 2 * totalMonth - totalAmount,
    2,
  )
  // 还款总额
  // 还款总额 = 总利息 + 本金
  const totalRepaymentAmount = chain(totalAllInterest).add(totalAmount).done()

  // 剩余本金
  let restRepaymentAmount = totalAmount

  // 具体每月明细
  const monthAmountArr = []

  let _month = month - 1
  for (let i = 1; i <= totalMonth; i++) {
    if (_month > 12) {
      _month = 1
      year += 1
    }

    // 已还本金
    refundAmount = round(chain(monthPrincipal).multiply(i - 1).done(), 2)

    // 每月还款额
    const totalMonthAmount = round(chain(totalAmount - refundAmount).multiply(monthRate).add(monthPrincipal).done(), 2)

    // 每月利息
    const monthInterest = round(chain(totalAmount - refundAmount).multiply(monthRate).done(), 2)

    // 更新剩余本金
    refundAmount = round(chain(monthPrincipal).multiply(i).done(), 2)
    restRepaymentAmount = round(chain(totalAmount).subtract(refundAmount).done(), 2)

    if (restRepaymentAmount < 0) {
      restRepaymentAmount = 0
    }

    monthAmountArr.push({
      monthName: `${year}年${month}月`,
      monthAmount: monthPrincipal,
      monthInterest,
      totalMonthAmount,
      restRepaymentAmount: restRepaymentAmount < 0 ? 0 : restRepaymentAmount,
    })
  }

  return {
    monthAmountArr,
    totalRepaymentAmount,
    totalAllInterest,
  }
}

export async function POST(req: Request) {
  try {
    const params = await req.json()

    const { amount, loanType, month, periods, rateValue, year } = params

    let data = {}
    if (loanType === 1) {
      data = amountInterestEqual(amount, periods, rateValue, year, month)
    } else {
      data = amountEqual(amount, periods, rateValue, year, month)
    }

    return NextResponse.json({ code: 200, message: '', data })

  } catch (error) {
    return NextResponse.json({ code: 500, message: '请示失败，请稍后再试', data: {} })
  }
}
