import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    console.log(req)
    return NextResponse.json({ success: false, message: 'You are not authorized.' })

  } catch (error) {
    console.log('Error in adding a new category:', error)
    return NextResponse.json({ success: false, message: 'Something went wrong. Please try again!' })
  }
}
