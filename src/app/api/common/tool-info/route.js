import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

import '@/utils/patch'

export async function GET(req) {
  try {
    const pathname = req.nextUrl.searchParams.get('pathname')
    if (pathname) {
      const prisma = new PrismaClient()
      const data = await prisma.tool.findFirst({
        where: {
          OR: [{
            url: pathname,
          }],
        },
        include: {
          category: true,
        },
      })
      return NextResponse.json({ code: 200, message: '', data })
    }
    throw new Error('pathname is empty')
  } catch (error) {
    console.log(error)
    return NextResponse.json({ code: 500, message: '请示失败，请稍后再试', data: {} })
  }
}