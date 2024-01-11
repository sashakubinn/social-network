'use client'
import { useAuth } from '@/hooks/useAuth'
import cn from 'clsx'
import { Sun } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'
import { MENU } from './sidebar.data'
import s from './Sidebar.module.scss'

const Sidebar: FC = () => {
	const { isLoggedIn } = useAuth()

	const pathname = usePathname()
	return (
		<aside className={s.sidebar}>
			{isLoggedIn ? (
				<>
					<Link href='/'>
						<Image alt='' src='/favicon.png' priority width={60} height={70} />
					</Link>
					<div>
						{MENU.map(item => (
							<Link
								href={item.url}
								key={item.url}
								className={cn({
									[s.active]: pathname === item.url,
								})}
							>
								<item.icon size={27} />
							</Link>
						))}
					</div>
					<Sun />
				</>
			) : null}
		</aside>
	)
}

export default Sidebar
