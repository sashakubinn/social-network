'use client'
import { getImageUrl } from '@/config/get-image-url.config'
import { useAuth } from '@/hooks/useAuth'
import { useProfile } from '@/hooks/useProfile'
import { GripHorizontal } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Rings } from 'react-loader-spinner'

export default function CurrentUser() {
	const { data, isLoading } = useProfile()
	const { push } = useRouter()

	return (
		<div className='p-layout flex justify-between'>
			<div className='flex items-center'>
				{isLoading ? (
					<Rings
						visible={true}
						height='70'
						width='70'
						color='white'
						ariaLabel='triangle-loading'
					/>
				) : (
					<Image
						src={getImageUrl(data?.avatar?.url)}
						alt={data?.username || ''}
						height={50}
						width={50}
						className='mr-3'
						priority
					/>
				)}

				<div className='text-base block mt-2'>
					<div className='text-lg'>{data?.username}</div>
					<div className='opacity-45 text-xs'> UI / UX Designer </div>
				</div>
			</div>
			<button
				onClick={() =>
					signOut({
						redirect: true,
					}).then(() => {
						window.localStorage.removeItem('token')
						push('/login')
					})
				}
			>
				<GripHorizontal size={27} className='icon' />
			</button>
		</div>
	)
}
