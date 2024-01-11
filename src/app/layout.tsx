import LayoutClient from '@/components/layout/Layout'
import { getSiteUrl } from '@/config/url.config'
import { SITE_NAME } from '@/constants/seo.constants'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: {
		absolute: SITE_NAME,
		template: `%s | ${SITE_NAME}`,
	},
	openGraph: {
		type: 'website',
		emails: ['info@social-web.com'],
		siteName: SITE_NAME,
	},
	icons: '/armor.png',
}

export const viewPort: Viewport = {
	themeColor: '#0E0B18',
	colorScheme: 'dark',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<LayoutClient>{children}</LayoutClient>
			</body>
		</html>
	)
}
