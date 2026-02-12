import { prisma } from '@/lib/prisma'
import { seedTaxonomy } from './taxonomy.seed'

import 'dotenv/config'
async function main() {
	await prisma.$executeRaw`TRUNCATE TABLE "makes", "models" RESTART IDENTITY CASCADE`
	await seedTaxonomy(prisma)
}

main()
	.catch(e => {
		throw e
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
