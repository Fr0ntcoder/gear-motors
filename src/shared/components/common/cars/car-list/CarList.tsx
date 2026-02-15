import { getInventory } from '@/service/car.service'
import { AwaitedPageProps } from '@/shared/types'

import { CarCard } from '../car-card'

interface Props {
	params: AwaitedPageProps['searchParams']
}

export const CarList = async ({ params }: Props) => {
	const { items } = await getInventory(params)
	return (
		<div className='grid grid-cols-4 gap-5'>
			{items.map(item => (
				<CarCard item={item} key={item.id} />
			))}
		</div>
	)
}
