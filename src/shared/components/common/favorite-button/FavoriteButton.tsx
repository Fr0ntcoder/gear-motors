'use client'

import { HeartIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { api } from '@/shared/config/api-client'
import { ENDPOINTS } from '@/shared/config/endpoints'
import { cn } from '@/shared/utils'

interface Props {
	setIsFavorite: (isFavorite: boolean) => void
	isFavorite: boolean
	id: number
}

export const FavoriteButton = ({ setIsFavorite, isFavorite, id }: Props) => {
	const router = useRouter()
	const handleFavorite = async () => {
		const { ids } = await api.post<{ ids: number[] }>(ENDPOINTS.FAVORITES, {
			json: { id }
		})

		if (ids.includes(id)) {
			setIsFavorite(true)
		} else {
			setIsFavorite(false)
		}
		/* setTimeout(() => router.refresh(), 250) */
	}
	return (
		<button
			className='absolute top-2 left-2 transition-all duration-300 hover:bg-transparent hover:text-red-500'
			onClick={handleFavorite}
		>
			<HeartIcon
				className={cn('h-6 w-6', isFavorite ? 'text-red-500' : 'text-white')}
				fill={isFavorite ? 'red' : 'white'}
			/>
		</button>
	)
}
