import { FC, PropsWithChildren } from 'react'
import s from './Layout.module.scss'
import Sidebar from './sidebar/Sidebar'
import { Toaster } from 'react-hot-toast'
import Provider from '../provider/Provider'

const LayoutClient: FC<PropsWithChildren<unknown>> = ({ children }) => {
	return (
		<Provider>
			<main className={s.layout}>
				<Sidebar />
				<section> {children} </section>
				<Toaster position='top-right' />
			</main>
		</Provider>
	)
}

export default LayoutClient
