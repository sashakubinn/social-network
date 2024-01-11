import { $fetch } from '@/$api/api.fetch'
import { IUser } from '@/types/user.types'
import NextAuth, { AuthOptions, User } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const nextAuthOptions: AuthOptions = {
	providers: [
		Credentials({
			credentials: {
				username: {
					type: 'text',
				},
				email: {
					type: 'text',
				},
				password: { type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials.password) return null
				if (credentials.username) {
					try {
						const data = await $fetch.post<{
							user: IUser
							jwt: string
						}>(`/auth/local/register`, credentials)
						return {
							id: data.user.id.toString(),
							email: data.user.email,
							avatar: data.user.avatar?.url,
							username: data.user.username,
							jwt: data.jwt,
						} as User
					} catch (e) {
						return Promise.reject(new Error((e as TypeError).message))
					}
				}
				try {
					const data = await $fetch.post<{
						user: IUser
						jwt: string
					}>(`/auth/local`, {
						identifier: credentials.email,
						password: credentials.password,
					})
					return {
						id: data.user.id.toString(),
						email: data.user.email,
						avatar: data.user.avatar?.url,
						username: data.user.username,
						jwt: data.jwt,
					} as User
				} catch (e) {
					return Promise.reject(new Error((e as TypeError).message))
				}
			},
		}),
	],
	callbacks: {
		jwt({ token, account, user }) {
			return { ...token, ...user }
		},
		session({ session, user, token }) {
			session.user = token as User
			return session
		},
		/*
		jwt: async (token, user, account) => {
			const isSignIn = user ? true : false
			if (isSignIn) {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/auth/${account.provider}/callback?access_token=${account?.accessToken}`
				)
				const data = await response.json()
				token.jwt = data.jwt
				token.id = data.user.id
			}
			return Promise.resolve(token)
		}, */
	},
}
