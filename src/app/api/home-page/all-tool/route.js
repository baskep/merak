import { NextResponse } from 'next/server'

export async function GET() {
  try {
    return NextResponse.json({ code: 200, message: '', data: {} })

  } catch (error) {
    return NextResponse.json({ code: 500, message: '请示失败，请稍后再试', data: {} })
  }
}