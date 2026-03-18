import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const data = await req.json()
    const { id: _, ...updateData } = data
    const license = await prisma.license.update({
      where: { id: parseInt(params.id) },
      data: updateData
    })
    return NextResponse.json(license)
  } catch (error) {
    console.error('API Error (PUT):', error)
    return NextResponse.json({ error: 'Failed to update license' }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.license.delete({
      where: { id: parseInt(params.id) }
    })
    return NextResponse.json({ message: 'License deleted' })
  } catch (error) {
    console.error('API Error (DELETE):', error)
    return NextResponse.json({ error: 'Failed to delete license' }, { status: 500 })
  }
}
