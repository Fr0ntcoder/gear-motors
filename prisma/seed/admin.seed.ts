import { bcryptPasswordHash } from '@/shared/lib/bcypt'

import { PrismaClient } from '../schema/generated/prisma/client'

export async function seedAdmin(prisma: PrismaClient) {
	const password = await bcryptPasswordHash('abc123#')

	const admin = await prisma.user.create({
		data: {
			email: 'jambox228@gmail.com',
			hashedPassword: password
		}
	})

	console.log('Создан: ', admin)

	return admin
}
