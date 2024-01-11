import { IUser } from '@/types/user.types'
export interface IMessage {
	id: number
	text: string
	createdAt: string
	sender: IUser
}
export interface IChat {
	id: number
	messages: IMessage[]
	members: IUser[]
}
