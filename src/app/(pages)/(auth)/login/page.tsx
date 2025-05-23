'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useActionState, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { signIn } from 'next-auth/react'
import { motion } from 'framer-motion'

import { AuthForm } from '@/components/auth-form'
import { SubmitButton } from '@/components/SubmitButton'

import { login, type LoginActionState } from '@/app/actions/login/actions'

export default function Page() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSuccessful, setIsSuccessful] = useState(false)

  const [state, formAction] = useActionState<LoginActionState, FormData>(
    login,
    {
      status: 'idle',
    }
  )

  useEffect(() => {
    console.log('state', state)
    if (state.status === 'failed') {
      toast.error(
        'Incorrect email or password! Please check and try again.'
      )
    } else if (state.status === 'invalid_data') {
      toast.error('Failed validating your submission!')
    } else if (state.status === 'success') {
      setIsSuccessful(true)
      toast.success('Login successful')
      signIn('credentials', {
        redirect: false,
        email: email,
        password: password,
      }).then(() => {
        router.push('/')
      })
    }
  }, [state, router, email, password])

  const handleSubmit = (formData: FormData) => {
    setEmail(formData.get('email') as string)
    setPassword(formData.get('password') as string)
    formAction(formData)
  }

  return (
    <div className="flex h-dvh w-screen items-start pt-12 md:pt-0 md:items-center justify-center bg-background">
      <motion.div
        className="w-full max-w-md overflow-hidden rounded-2xl flex flex-col gap-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16">
          <h3 className="text-xl font-semibold dark:text-zinc-50">
            Sign In
          </h3>
          <p className="text-sm text-gray-500 dark:text-zinc-400">
            Use your email and password to sign in
          </p>
        </div>
        <AuthForm action={handleSubmit} defaultEmail={email}>
          <SubmitButton isSuccessful={isSuccessful}>
            Sign in
          </SubmitButton>
          <p className="text-center text-sm text-gray-600 mt-4 dark:text-zinc-400">
            {"Don't have an account? "}
            <Link
              href="/register"
              className="font-semibold text-gray-800 hover:underline dark:text-zinc-200"
            >
              Sign up
            </Link>
            {' for free.'}
          </p>
        </AuthForm>
      </motion.div>
    </div>
  )
}
