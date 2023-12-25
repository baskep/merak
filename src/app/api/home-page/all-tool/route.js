import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

import '@/utils/patch'

export async function GET() {
  try {
    const prisma = new PrismaClient()
    const res = await prisma.category.findMany()
    return NextResponse.json({ code: 200, message: '', data: res })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ code: 500, message: '请示失败，请稍后再试', data: {} })
  }
}