const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function test() {
  try {
    console.log('Testing connection to Neon...')
    const count = await prisma.license.count()
    console.log('Connection successful! License count:', count)
    const all = await prisma.license.findMany({ take: 1 })
    console.log('Sample data:', all)
  } catch (err) {
    console.error('DATABASE CONNECTION ERROR:', err)
  } finally {
    await prisma.$disconnect()
  }
}

test()
