import { NextResponse } from 'next/server'
import { chain, round } from 'mathjs'

// 等额本息计算
function principalInterestEqual(
  amount: number,
  periods: number,
  rate: number,
  month: number,
) {
  const monthRate = round(rate / 12 / 100, 5)
  const totalMonth = chain(periods).multiply(12).done()
  const totalAmount = chain(amount).multiply(10000).done()

  const totalInterest = chain(totalAmount).multiply(monthRate).multiply(Math.pow((1 + monthRate), totalMonth)).done()
  const totalRate = Math.pow((1 + monthRate), totalMonth) - 1

  // 每月月供
  const monthAmount = round(totalInterest / totalRate, 2)

  // 总利息
  const allInterest = round(chain(totalMonth).multiply(monthAmount).done(), 2) - totalAmount

  // 还款总额
  const totalRepaymentAmount = chain(allInterest).add(totalAmount).done()

  // 具体每月月供
  const monthAmountArr = []

  console.log('起始月')
  console.log(month)

  return {
    totalRepaymentAmount,
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()

    const { amount, loanType, month, periods, rateType, rateValue, year } = data

    principalInterestEqual(amount, periods, rateValue, month)

    return NextResponse.json({ success: false, message: 'You are not authorized.' })

  } catch (error) {
    console.log('Error in adding a new category:', error)
    return NextResponse.json({ success: false, message: 'Something went wrong. Please try again!' })
  }
}
