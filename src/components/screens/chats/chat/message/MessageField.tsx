'use client'
import { $fetch } from '@/$api/api.fetch'
import Field from '@/components/ui/field/Field'
import { useAuth } from '@/hooks/useAuth'
import { useReactQuerySubscription } from '@/hooks/useReactQuerySubscription'
import { useMutation } from '@tanstack/react-query'
import { ArrowRightToLine, Paperclip, Send } from 'lucide-react'
import { useParams } from 'next/navigation'
import { FC, useState } from 'react'

const MessageField: FC = () => {
	const [message, setMessage] = useState('')
	const { id } = useParams()
	const { user } = useAuth()

	const send = useReactQuerySubscription()
	const { mutate } = useMutation({
		mutationKey: ['update chat', id],
		mutationFn: () =>
			$fetch.post(
				'/messages',
				{
					data: {
						text: message,
						sender: Number(user?.id),
						chat: id,
					},
				},
				true
			),
		onSuccess() {
			setMessage('')
			send({
				entity: 'chat',
				id: id.toString(),
				operation: 'update',
			})
		},
	})
	const onSubmit = () => {
		if (!message) return
		mutate()
	}

	return (
		<div className='border-t border-border p-layout w-full flex items-center justify-between'>
			<div className='flex items-center mt-4 mb-2'>
				<Paperclip
					className='ml-6 mr-10 opacity-30 hover:opacity-70 transition-opacity duration-300'
					size={20}
				/>
				<Field
					placeholder='Write a message...'
					value={message}
					onChange={e => setMessage(e.target.value)}
					classNameInput='w-[20rem]'
					onKeyDown={e => {
						if (e.key === 'Enter') onSubmit()
					}}
				/>
			</div>
			<button
				className={`mr-1 ${
					message && 'hover:text-primary'
				}  transition-colors duration-300`}
				onClick={onSubmit}
				disabled={!message}
			>
				<Send size={20} className='ml-8' />
			</button>
		</div>
	)
}

export default MessageField
