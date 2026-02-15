import type { Metadata } from 'next'
import { Mulish, Roboto } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

import { Toaster } from '@/shared/components/ui/toast'
import { cn } from '@/shared/utils'

import './globals.css'

const mulish = Mulish({
	weight: 'variable',
	subsets: ['cyrillic', 'latin'],
	variable: '--font-heading',
	display: 'swap'
})

const roboto = Roboto({
	weight: '400',
	subsets: ['cyrillic', 'latin'],
	variable: '--font-body',
	display: 'swap'
})

export const metadata: Metadata = {
	title: 'Продажа автомобилей',
	description: ''
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body
				className={cn(
					'bg-background overscroll-none antialiased',
					roboto.variable,
					mulish.variable
				)}
			>
				<NuqsAdapter>{children}</NuqsAdapter>
				<NextTopLoader showSpinner={false} />
				<Toaster />
			</body>
		</html>
	)
}
