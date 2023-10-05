import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {

  const user = await prisma.user.create({
    data: {
      name: '测试',
    },
  })
  return NextResponse.json({
    user: {},
  })
}
