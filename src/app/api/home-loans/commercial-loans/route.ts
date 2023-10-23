import { NextResponse } from 'next/server'
import { chain, round } from 'mathjs'

function principalInterestEqual(amount: number, periods: number, rate: number) {
  const month = chain(periods).multiply(12).done()
  const monthRate = round(rate / 12 / 100, 5)
  const totalAmount = chain(amount).multiply(10000).done()

  console.log('月利率 : ')
  console.log(month)
  console.log(monthRate)
  console.log(totalAmount)
}

export async function POST(req: Request) {
  try {
    const data = await req.json()

    const { amount, loanType, momth, periods, rateType, rateValue, year } = data

    principalInterestEqual(amount, periods, rateValue)

    return NextResponse.json({ success: false, message: 'You are not authorized.' })

  } catch (error) {
    console.log('Error in adding a new category:', error)
    return NextResponse.json({ success: false, message: 'Something went wrong. Please try again!' })
  }
}
