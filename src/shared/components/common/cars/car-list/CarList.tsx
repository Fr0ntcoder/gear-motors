import { getCars } from '@/service/car.service'
import { redis } from '@/shared/lib/redis-store'
import { getSourceId } from '@/shared/lib/source-id'
import { AwaitedPageProps, IFavorites } from '@/shared/types'

import { CarCard } from '../car-card'

interface Props {
	params: AwaitedPageProps['searchParams']
}

export const CarList = async ({ params }: Props) => {
	const { items } = await getCars(params)
	const sourceId = await getSourceId()
	const favorites = await redis.get<IFavorites>(sourceId ?? '')
	return (
		<div className='grid grid-cols-4 gap-5'>
			{items.map(item => (
				<CarCard item={item} key={item.id} favorites={favorites?.ids ?? []} />
			))}
		</div>
	)
}
