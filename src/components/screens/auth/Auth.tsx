'use client'
import Button from '@/components/ui/button/Button'
import Field from '@/components/ui/field/Field'
import { AtSign, KeyRound } from 'lucide-react'
import { FC, useState } from 'react'
import { toast } from 'react-hot-toast'
import { signIn, useSession } from 'next-auth/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IAuthFormState } from './auth.types'
import { getRandomFullName } from '@/utils/get-random-full-name.utils'
import { useRouter } from 'next/navigation'

interface IAuth {
	type?: 'Register' | 'Login'
}

const Auth: FC<IAuth> = ({ type = 'Login' }) => {
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors },
	} = useForm<IAuthFormState>({
		mode: 'onChange',
	})
	const { push } = useRouter()
	const onSubmit: SubmitHandler<IAuthFormState> = async data => {
		const response = await signIn(
			'credentials',
			type === 'Login'
				? {
						redirect: false,
						...data,
				  }
				: {
						redirect: false,
						username: getRandomFullName(),
						...data,
				  }
		)
		if (response?.error) toast.error(response.error)
	}
	return (
		<div className='flex w-screen h-screen'>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='m-auto block w-96 border rounded-lg p-10 border-border'
			>
				<h1 className='uppercase text-center text-4xl pb-6 tracking-widest mb-4'>
					{type}
				</h1>
				<Field
					{...register('email', {
						required: true,
					})}
					placeholder='Your Email ...'
					Icon={AtSign}
					type='email'
					className='mb-2 p-2'
				/>
				<Field
					{...register('password', {
						required: true,
						minLength: {
							value: 6,
							message: 'Min length 6 symbols',
						},
					})}
					placeholder='Your Password ...'
					className='mb-4 p-2'
					Icon={KeyRound}
					type='password'
				/>
				<div className='text-center mb-2'>
					<Button type='submit'>{type}</Button>
				</div>
			</form>
		</div>
	)
}

export default Auth
