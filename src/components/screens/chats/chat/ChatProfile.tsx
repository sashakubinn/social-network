import { getImageUrl } from '@/config/get-image-url.config'
import { IUser } from '@/types/user.types'
import { GripHorizontal, Search } from 'lucide-react'
import Image from 'next/image'
import { FC } from 'react'
import { Rings } from 'react-loader-spinner'

interface IChatProfile {
	member?: IUser
	isLoading?: boolean
}

const ChatProfile: FC<IChatProfile> = ({ member, isLoading }) => {
	return (
		<div className='p-layout border-b flex justify-between items-center border-border h-[6.2rem]'>
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
						alt='Profile'
						src={getImageUrl(member?.avatar?.url)}
						height={45}
						width={55}
						className='p-2 mr-4'
					/>
				)}

				<div>
					<p className='text-lg'> {member?.username} </p>
					<p className='opacity-30 text-xs'> 2 members </p>
				</div>
			</div>
			<div className='mr-24 flex'>
				<Search size={27} className='icon mx-6' />
				<GripHorizontal size={27} className='icon mx-6' />
			</div>
		</div>
	)
}

export default ChatProfile
