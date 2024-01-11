'use client'
import { $fetch } from '@/$api/api.fetch'
import { useAuth } from '@/hooks/useAuth'
import { IChat } from '@/types/chat.types'
import { Rings } from 'react-loader-spinner'
import { useQuery } from '@tanstack/react-query'
import ChatProfile from './ChatProfile'
import { Message } from './message/Message'
import MessageField from './message/MessageField'

export function Chat({ id }: { id: string }) {
	const { user } = useAuth()
	const { data, isLoading } = useQuery({
		queryKey: ['chat', id],
		queryFn: () =>
			$fetch.get<{ data: IChat }>(
				`/chats/${id}?populate[messages][populate][sender]=*
				&populate[members][populate][avatar]=*`,
				true
			),
		select: ({ data }) => data,
		enabled: !!id,
	})
	const correspondent = data?.members.find(
		member => member?.email !== user?.email
	)
	return (
		<div
			className='w-[60rem] grid'
			style={{
				gridTemplateRows: '.7fr 8fr .4fr',
			}}
		>
			<ChatProfile isLoading={isLoading} member={correspondent} />
			<div className='p-layout'>
				{isLoading ? (
					<div className='flex items-center h-screen justify-center'>
						<Rings
							visible={true}
							height='70'
							width='70'
							color='white'
							ariaLabel='triangle-loading'
						/>{' '}
					</div>
				) : (
					data?.messages.map(message => (
						<Message
							key={message.id}
							member={correspondent}
							message={message}
						/>
					))
				)}
			</div>

			<MessageField />
		</div>
	)
}

export default Chat
