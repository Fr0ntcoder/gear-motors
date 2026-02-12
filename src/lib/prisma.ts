import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../../prisma/schema/generated/prisma/client'
const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
	throw new Error('Database is not defined.')
}

const adapter = new PrismaPg({
	connectionString: databaseUrl
})

export const prisma = new PrismaClient({
	adapter,
	log: ['error', 'info', 'warn']
})
