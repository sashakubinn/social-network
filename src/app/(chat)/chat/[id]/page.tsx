'use client'
import Chat from '@/components/screens/chats/chat/Chat'
import Share from '@/components/screens/share/Share'

export default function ChatPage({ params }: { params: { id: string } }) {
	return (
		<div className='flex'>
			<div className=''>
				<Chat id={params.id} />
			</div>
			<div className=''>
				<Share />
			</div>
		</div>
	)
}
