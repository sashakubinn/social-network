import { getImageUrl } from '@/config/get-image-url.config'
import { useAuth } from '@/hooks/useAuth'
import { IMessage } from '@/types/chat.types'
import dayjs from 'dayjs'
import userImage from '../../../../../../public/user/image(2).png'
import Image from 'next/image'
import { IUser } from '@/types/user.types'
import { useProfile } from '@/hooks/useProfile'

export function Message({
	message,
	member,
}: {
	message: IMessage
	member?: IUser
}) {
	const { data } = useProfile()
	const isSender = data?.email === message?.sender.email

	return (
		<div
			className={` flex ${isSender ? 'justify-end' : 'justify-start'} mb-2.5`}
		>
			<div
				className={`flex items-center ${isSender ? 'flex-row-reverse' : ''}`}
			>
				<Image
					alt={message?.sender.username}
					className='rounded-full'
					src={
						isSender
							? getImageUrl(data?.avatar?.url)
							: getImageUrl(member?.avatar?.url)
					}
					height={40}
					width={40}
				/>
				<div
					className={`py-[0.55rem] px-3 rounded-2xl ${
						isSender
							? 'mr-3 rounded-tr-none bg-primary'
							: 'ml-3 rounded-tl-none bg-border'
					}`}
				>
					<p className='text-white '> {message?.text} </p>
				</div>
				<span
					className={`px-3 text-xs text-white opacity-50 flex 
					${!isSender ? 'justify-end' : 'justify-start'} mt-1`}
				>
					{dayjs(message?.createdAt).format('HH:mm')}
				</span>
			</div>
		</div>
	)
}
