import { faker } from '@faker-js/faker'
import slugify from 'slugify'

import {
	BodyType,
	CarStatus,
	Color,
	Currency,
	FuelType,
	OdoUnit,
	type Prisma,
	type PrismaClient,
	Transmission,
	UlesComplience
} from '../schema/generated/prisma/client'

export async function seedCars(prisma: PrismaClient) {
	const makes = await prisma.make.findMany({
		include: {
			models: {
				include: {
					modelVariants: true
				}
			}
		}
	})

	const carsData: Prisma.CarCreateManyInput[] = []

	for (let i = 0; i < 25; i++) {
		const make = faker.helpers.arrayElement(makes)
		if (!make.models.length) continue
		const model = faker.helpers.arrayElement(make.models)

		const variant = model.modelVariants.length
			? faker.helpers.arrayElement(model.modelVariants)
			: null

		const year = faker.date
			.between({
				from: new Date(1925, 0, 1),
				to: new Date()
			})
			.getFullYear()

		const title = [year, make.name, model.name, variant?.name]
			.filter(Boolean)
			.join(' ')

		const vrm = faker.vehicle.vrm()

		const baseSlug = slugify(`${title}-${vrm}`)

		carsData.push({
			year,
			vrm,
			slug: baseSlug,
			makeId: make.id,
			modelId: model.id,
			...(variant?.id && { modelVariantId: variant.id }),
			title,
			price: faker.number.int({ min: 400000, max: 10000000 }),
			odoReading: faker.number.int({ min: 0, max: 200000 }),
			doors: faker.number.int({ min: 2, max: 8 }),
			seats: faker.number.int({ min: 2, max: 8 }),
			views: faker.number.int({ min: 100, max: 10000 }),
			description: faker.commerce.productDescription(),
			currency: faker.helpers.arrayElement(Object.values(Currency)),
			odoUnit: faker.helpers.arrayElement(Object.values(OdoUnit)),
			bodyType: faker.helpers.arrayElement(Object.values(BodyType)),
			transmission: faker.helpers.arrayElement(Object.values(Transmission)),
			fuelType: faker.helpers.arrayElement(Object.values(FuelType)),
			color: faker.helpers.arrayElement(Object.values(Color)),
			ulezCompliance: faker.helpers.arrayElement(Object.values(UlesComplience)),
			status: faker.helpers.arrayElement(Object.values(CarStatus))
		})
	}
	const result = await prisma.car.createMany({
		data: carsData,
		skipDuplicates: true
	})

	console.log(`Total of ${result.count} classifieds seeded 🌱`)
}
