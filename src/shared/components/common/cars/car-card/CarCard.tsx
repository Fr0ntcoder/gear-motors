import { Cog, Fuel, GaugeCircle, Paintbrush2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

import { Button } from '@/shared/components/ui'
import {
	CARS_COLOR,
	CARS_FUEL_TYPE,
	CARS_TRANSMISSION,
	ROUTES
} from '@/shared/config'
import { MultiStepForm, TCarImage } from '@/shared/types'
import { declensionUnit, formatPrice } from '@/shared/utils'

import { HtmlParser } from '../../html-parser'

type StatList = {
	label: string
	icon: ReactNode
	value: string
}

interface Props {
	item: TCarImage
}

export const CarCard = ({ item }: Props) => {
	const statList: StatList[] = [
		{
			label: 'Пробег',
			icon: <GaugeCircle className='h-5 w-5 flex-none' />,
			value: `${declensionUnit(item.odoReading)}`
		},
		{
			label: 'Трансмиссия',
			icon: <Cog />,
			value: `${CARS_TRANSMISSION[item.transmission]}`
		},
		{
			label: 'Тип топлива',
			icon: <Fuel />,
			value: `${CARS_FUEL_TYPE[item.fuelType]}`
		},
		{
			label: 'Цвет',
			icon: <Paintbrush2 />,
			value: `${CARS_COLOR[item.color]}`
		}
	]
	return (
		<div>
			<div className='relative h-50' key={item.id}>
				{
					<Image
						src={item.images[0].src}
						alt={item.images[0].alt}
						fill
						blurDataURL={item.images[0].blurhash}
						className='object-cover'
					/>
				}
				<div className='bg-primary absolute top-2 right-2 rounded px-2 py-1'>
					{formatPrice(item.price)}
				</div>
			</div>
			<div className='flex flex-col gap-4 p-2'>
				<h3 className=''>
					<Link
						href={ROUTES.CAR.SINGLE(item.slug)}
						className='hover:text-primary transition-all duration-300'
					>
						{item.title}
					</Link>
				</h3>
				{item.description && (
					<div className=''>{<HtmlParser html={item.description} />}</div>
				)}
				<div className='grid grid-cols-2 gap-5'>
					{statList.map(stat => (
						<div className='flex flex-col items-end gap-2' key={stat.label}>
							<div className='flex gap-2'>
								{stat.label}
								{stat.icon}
							</div>
							{stat.value}
						</div>
					))}
				</div>
				<div className='grid grid-cols-2 items-center gap-5'>
					<Button variant='outline' size='lg' className='font-bold'>
						<Link href={ROUTES.CAR.STEP(item.slug, MultiStepForm.WELCOME)}>
							Забронировать
						</Link>
					</Button>
					<Button size='lg' className='font-bold'>
						Подробнее
					</Button>
				</div>
			</div>
		</div>
	)
}
