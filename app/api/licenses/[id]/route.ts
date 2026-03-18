import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: paramId } = await params
    const data = await req.json()
    const { id: _, ...updateData } = data
    const license = await prisma.license.update({
      where: { id: parseInt(paramId) },
      data: updateData
    })
    return NextResponse.json(license)
  } catch (error: any) {
    console.error('API Error (PUT):', error)
    return NextResponse.json({ error: 'Failed to update license', details: error.message }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: paramId } = await params
    await prisma.license.delete({
      where: { id: parseInt(paramId) }
    })
    return NextResponse.json({ message: 'License deleted' })
  } catch (error: any) {
    console.error('API Error (DELETE):', error)
    return NextResponse.json({ error: 'Failed to delete license', details: error.message }, { status: 500 })
  }
}
