import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const prisma = new PrismaClient()
    const res = await prisma.category.findMany()
    console.log(res)
    return NextResponse.json({ code: 200, message: '', data: {} })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ code: 500, message: '请示失败，请稍后再试', data: {} })
  }
}