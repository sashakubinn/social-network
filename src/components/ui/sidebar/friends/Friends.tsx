'use client'
import { $fetch } from '@/$api/api.fetch'
import { getImageUrl } from '@/config/get-image-url.config'
import { useProfile } from '@/hooks/useProfile'
import { IUser } from '@/types/user.types'
import { useMutation, useQuery } from '@tanstack/react-query'
import { UserRoundPlus, UserRoundX } from 'lucide-react'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { Rings } from 'react-loader-spinner'

const Friends = () => {
	const { data: currentUser, refetch: refetchProfile } = useProfile()
	const { data, isLoading, isFetching, refetch } = useQuery({
		queryKey: ['users'],
		queryFn: () => $fetch.get<IUser[]>('/users?populate=avatar', true),
	})

	return (
		<div>
			{isLoading || isFetching ? (
				<div className='flex h-screen items-center justify-center'>
					<Rings
						visible={true}
						height='70'
						width='70'
						color='white'
						ariaLabel='triangle-loading'
					/>
				</div>
			) : (
				data?.map(user => {
					const isFriend =
						true /* currentUser?.friends.find(u => u.id === user.id) */
					return (
						<div
							key={user.id}
							className='flex items-center justify-around p-layout border-b border-border'
						>
							<Image
								width={100}
								height={100}
								src={getImageUrl(user.avatar?.url)}
								alt={user.username}
							/>
							<div className='p-layout text-xl'> {user.username} </div>
							<button className=''>
								{isFriend ? (
									<UserRoundX className='icon' size={26} />
								) : (
									<UserRoundPlus className='icon' size={26} />
								)}
							</button>
						</div>
					)
				})
			)}
		</div>
	)
}

export default Friends
