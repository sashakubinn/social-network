import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react'
import cn from 'clsx'
import s from './Button.module.css'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	onClickButton?: () => void
	className?: string
}

const Button: FC<PropsWithChildren<IButton>> = ({
	children,
	className = '',
	onClickButton,
	...rest
}) => {
	return (
		<button
			className={cn(s.default, className)}
			onClick={onClickButton}
			{...rest}
		>
			{children}
		</button>
	)
}

export default Button
