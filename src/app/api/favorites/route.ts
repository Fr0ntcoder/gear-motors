import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import z from 'zod'

import { ROUTES } from '@/shared/config'
import { redis } from '@/shared/lib/redis-store'
import { setSourceId } from '@/shared/lib/source-id'
import { IFavorites } from '@/shared/types'

export async function POST(req: NextRequest) {
	const body = await req.json()

	const { data, error } = z.object({ id: z.number().int() }).safeParse(body)
	console.log(data)
	if (!data) {
		return NextResponse.json(
			{
				error: error?.message
			},
			{ status: 400 }
		)
	}

	if (typeof data.id !== 'number') {
		return NextResponse.json(
			{
				error: 'Invalid id'
			},
			{ status: 400 }
		)
	}

	const sourceId = await setSourceId()

	const storedFavoites = await redis.get<IFavorites>(sourceId)
	const favorites: IFavorites = storedFavoites || { ids: [] }

	if (favorites.ids.includes(data.id)) {
		favorites.ids = favorites.ids.filter(favid => favid !== data.id)
	} else {
		favorites.ids.push(data.id)
	}

	await redis.set(sourceId, favorites)

	revalidatePath(ROUTES.FAVORITES)

	return NextResponse.json({ ids: favorites.ids }, { status: 200 })
}
