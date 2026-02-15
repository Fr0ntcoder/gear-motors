import { faker } from '@faker-js/faker'
import { createPngDataUri } from 'unlazy/thumbhash'

import { imageSources } from '@/shared/config/constants'

import { Prisma, PrismaClient } from '../schema/generated/prisma/client'

export async function seedImages(prisma: PrismaClient) {
	const cars = await prisma.car.findMany()

	const carIds = cars.map(car => car.id)

	for (const car of carIds) {
		const image: Prisma.ImageCreateInput = {
			src: imageSources.carPlaceholder,
			alt: faker.lorem.words(2),
			car: { connect: { id: car } },
			blurhash: createPngDataUri('jPcJDYCndnZwl4h6Z2eYhWZ/c/VI')
		}

		await prisma.image.create({ data: image })
	}
}
