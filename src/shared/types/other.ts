type Params = {
	[x: string]: string | string[]
}
export type TPage = {
	params?: Promise<Params>
	searchParams: Promise<{ [x: string]: string | string[] | undefined }>
}

export type AwaitedPageProps = {
	params?: Awaited<TPage['params']>
	searchParams: Awaited<TPage['searchParams']>
}

export enum MultiStepForm {
	WELCOME = 1,
	SELECT_DATE = 2,
	SUBMIT_DETAILS = 3
}
