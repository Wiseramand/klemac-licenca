import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const licenses = await prisma.license.findMany({
      orderBy: { data_expiracao: 'asc' }
    })
    return NextResponse.json(licenses)
  } catch (error: any) {
    console.error('API Error (GET):', error)
    return NextResponse.json({ error: 'Failed to fetch licenses', details: error.message }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const { id, ...licenseData } = data // We ignore the ID if provided to let Prisma handle it
    const license = await prisma.license.create({
      data: licenseData
    })
    return NextResponse.json(license)
  } catch (error: any) {
    console.error('API Error (POST):', error)
    return NextResponse.json({ error: 'Failed to create license', details: error.message }, { status: 500 })
  }
}
