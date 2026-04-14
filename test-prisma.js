const { PrismaClient } = require('@prisma/client')
try {
  const p = new PrismaClient({ invalidProperty: true })
} catch (e) {
  console.log(e.message)
}
