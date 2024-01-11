import { LucideIcon } from 'lucide-react'
import { ComponentType, InputHTMLAttributes } from 'react'
import { FieldError } from 'react-hook-form'

export interface IFieldProps {
	placeholder: string
	error?: FieldError
	Icon?: LucideIcon
	classNameInput?: string
}
export type TypeInputProps = InputHTMLAttributes<HTMLInputElement> & IFieldProps
export interface IField extends TypeInputProps {}
