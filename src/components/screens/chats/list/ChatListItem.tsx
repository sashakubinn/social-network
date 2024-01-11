'use client'
import { useAuth } from '@/hooks/useAuth'
import { IChat } from '@/types/chat.types'
import userImage from '../../../../../public/user/image(2).png'
import dayjs from 'dayjs'
import Image from 'next/image'
import { GripHorizontal } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { $fetch } from '@/$api/api.fetch'
import Link from 'next/link'
import { getImageUrl } from '@/config/get-image-url.config'

interface IChatListItem {
	chat: IChat
}

export default function ChatListItem({ chat }: IChatListItem) {
	const { user } = useAuth()

	const correspondent = chat.members?.find(
		member => member.email !== user?.email
	)
	const lastMessage = chat.messages?.at(-1)
	return (
		<Link
			href={`/chat/${chat.id}`}
			className='p-layout flex border-b border-border duration-300 ease-linear transition-colors hover:bg-[#22191d] animation-slide-fade'
		>
			<Image
				src={getImageUrl(correspondent?.avatar?.url) || userImage}
				alt={correspondent?.username || 'Design Team'}
				height={40}
				width={40}
				className='mr-3'
			/>
			<div className='w-full'>
				<div className='flex items-center justify-between'>
					<span>{correspondent?.username}</span>
					<span className='mt-4 text-sm opacity-30'>
						{dayjs(lastMessage?.createdAt).format('HH:mm')}
					</span>
				</div>
				<div className='opacity-45 text-xs'>
					<span> {lastMessage?.text} </span>
					<span></span>{' '}
				</div>
			</div>
		</Link>
	)
}
