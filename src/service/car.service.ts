import { unstable_cache } from 'next/cache'

import { prisma } from '@/shared/lib/prisma'
import { AwaitedPageProps, IInvetoryResponse } from '@/shared/types'

export const getCars = unstable_cache(
	async (
		searchParams: AwaitedPageProps['searchParams']
	): Promise<IInvetoryResponse> => {
		try {
			const data = await prisma.car.findMany({
				include: {
					images: true
				}
			})

			return { items: data, error: null }
		} catch (error) {
			console.log(error)
			return { items: [], error: 'Ошибка получения автомобилей' }
		}
	},
	['cars'],
	{
		tags: ['cars'],
		revalidate: 3600
	}
)
