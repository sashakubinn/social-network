import { useAuth } from '@/hooks/useAuth'
import { usePathname, useRouter } from 'next/navigation'
import { FC, PropsWithChildren, useEffect } from 'react'

const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const { user, isLoggedIn } = useAuth()
	const pathname = usePathname()
	const { push } = useRouter()
	useEffect(() => {
		if (isLoggedIn) {
			window.localStorage.setItem('token', user?.jwt || '')
		}
	}, [user, isLoggedIn])
	useEffect(() => {
		if (pathname !== '/login' && pathname !== '/register') {
			const isLoggedIn = !!window.localStorage.getItem('token')
			if (!isLoggedIn) {
				push('/login')
			}
		}
	}, [pathname, isLoggedIn])
	useEffect(() => {
		if (pathname === '/login' || pathname === '/register') {
			if (isLoggedIn) {
				push('/')
			}
		}
	}, [isLoggedIn, pathname])
	return <> {children} </>
}

export default AuthProvider
