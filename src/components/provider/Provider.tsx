'use client'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { FC, PropsWithChildren } from 'react'
import AuthProvider from './AuthProvider'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			staleTime: Infinity,
		},
	},
})

const Provider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	return (
		<SessionProvider>
			<QueryClientProvider client={queryClient}>
				<AuthProvider> {children} </AuthProvider>
			</QueryClientProvider>
		</SessionProvider>
	)
}

export default Provider
