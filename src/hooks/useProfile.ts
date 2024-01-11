import { $fetch } from '@/$api/api.fetch'
import { useQuery } from '@tanstack/react-query'
import { IUser } from './../types/user.types'
export function useProfile() {
	const { data, isLoading, refetch } = useQuery({
		queryKey: ['profile'],
		queryFn: () =>
			$fetch.get<IUser>(`/users/me?populate=avatar&populate=friends`, true),
	})
	return { data, isLoading, refetch }
}
