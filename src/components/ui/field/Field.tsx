import { forwardRef } from 'react'
import cn from 'clsx'
import s from './Field.module.css'
import { TypeInputProps } from './field.types'

const Field = forwardRef<HTMLInputElement, TypeInputProps>(
	(
		{ Icon, style, placeholder, error, classNameInput, className, ...rest },
		ref
	) => {
		return (
			<div className={cn(s.field, className)} style={style}>
				<input
					ref={ref}
					className={cn(s.input, classNameInput)}
					placeholder={placeholder}
					{...rest}
				/>
				{Icon && (
					<div className={s.icon}>
						<Icon size={20} />
					</div>
				)}
				{error && <div className={s.error}> {error.message} </div>}
			</div>
		)
	}
)

Field.displayName = 'Field'

export default Field
