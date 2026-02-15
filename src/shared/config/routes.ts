import { MultiStepForm } from '../types'

export const ROUTES = {
	CAR: {
		SINGLE: (slug: string) => `/cars/${slug}`,
		STEP: (slug: string, step: MultiStepForm) =>
			`/cars/${slug}/reserve?step=${step}`
	}
}
