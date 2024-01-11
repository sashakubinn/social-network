'use client'
import { $fetch } from '@/$api/api.fetch'
import Field from '@/components/ui/field/Field'
import { useAuth } from '@/hooks/useAuth'
import { Rings } from 'react-loader-spinner'
import { useDebounce } from '@/hooks/useDebounce'
import { IChat } from '@/types/chat.types'
import { useQuery } from '@tanstack/react-query'
import { Plus, Search } from 'lucide-react'
import { FC, useState } from 'react'
import ChatListItem from './ChatListItem'

const ChatList: FC = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const { user, isLoggedIn } = useAuth()
	const debounceValue = useDebounce(searchTerm)
	const { data } = useQuery({
		queryKey: ['chats', debounceValue],
		queryFn: () =>
			$fetch.get<{ data: IChat[] }>(
				`/chats?sort=createdAt:desc&populate[messages]=*
				&populate[members][populate][avatar]=*
				&filters[members][email][$eq]=${user?.email}
				&filters[$or][0][members][username][$contains]=${debounceValue}
				&filters[$or][1][messages][text][$contains]=${debounceValue}`,
				true
			),
		enabled: isLoggedIn,
	})

	return (
		<>
			<div className='p-layout flex border-y  border-border '>
				<Search className='mr-3' size={22} />
				<Field
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
					placeholder='People groups and messages'
					className='w-60'
				/>
				<Plus size={22} />
			</div>
			<div>
				{data?.data.length ? (
					data.data.map(chat => <ChatListItem key={chat.id} chat={chat} />)
				) : (
					<div className='flex items-center justify-center h-screen'>
						<Rings
							visible={true}
							height='70'
							width='70'
							color='white'
							ariaLabel='triangle-loading'
						/>
					</div>
				)}
			</div>
		</>
	)
}

export default ChatList
