import 'dotenv/config'

import { prisma } from '@/shared/lib/prisma'

import { seedCars } from './cars.seed'
import { seedImages } from './images.seed'

async function main() {
	/* await prisma.$executeRaw`TRUNCATE TABLE "makes", "models" RESTART IDENTITY CASCADE`
	await seedTaxonomy(prisma) */
	/* await prisma.$executeRaw`TRUNCATE TABLE "cars" RESTART IDENTITY CASCADE`
	await seedCars(prisma) */
	await seedImages(prisma)
}

main()
	.catch(e => {
		throw e
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
