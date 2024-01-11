import Friends from '@/components/ui/sidebar/friends/Friends'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Friends',
	description: 'Thats page about your friends',
}

const FriendsPage = () => {
	return <Friends />
}

export default FriendsPage
