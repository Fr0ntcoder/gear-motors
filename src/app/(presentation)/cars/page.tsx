import { Metadata } from 'next'
import { Suspense } from 'react'

import { CarList } from '@/shared/components/common/cars/car-list'
import { redis } from '@/shared/lib/redis-store'
import { getSourceId } from '@/shared/lib/source-id'
import type { IFavorites, TPage } from '@/shared/types'

export const metadata: Metadata = {
	title: 'Автомобили'
}

export default async function CarsPage({ searchParams }: TPage) {
	const params = await searchParams

	return (
		<Suspense fallback={<div className=''>Идет загрузка</div>}>
			<CarList params={params} />
		</Suspense>
	)
}
