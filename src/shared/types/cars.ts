import { Car, Image } from '../../../prisma/schema/generated/prisma/client'

export type TCarImage = Car & {
	images: Image[]
}

export interface IInvetoryResponse {
	items: TCarImage[]
	error: string | null
}
