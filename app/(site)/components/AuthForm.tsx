"use client";

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import { useCallback, useEffect, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from 'react-icons/bs'
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from "next/navigation";

const AuthForm = () => {

    const session = useSession()
    const router = useRouter()
    type Variant = 'LOGIN' | 'REGISTER'
    const [variant, setVariant] = useState<Variant>("LOGIN")
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (session?.status === 'authenticated') {
            router.push('/users')
        }
    }, [session?.status, router])


    const toggleVariant = useCallback(() => {
        if (variant === 'LOGIN') {
            setVariant('REGISTER')
        }
        else {
            setVariant('LOGIN')
        }
    }, [variant])

    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        if (variant === 'REGISTER') {
            axios.post('/api/register', data)
                .then(() => signIn('credentials', data))
                .catch((err) => toast.error("Something went wrong!"))
                .finally(() => setIsLoading(false))
        }
        if (variant === 'LOGIN') {
            signIn('credentials', {
                ...data,
                redirect: false,
            })
                .then((res) => {
                    if (res?.error) {
                        toast.error("Invalid credentials")
                    }
                    if (res?.ok && !res?.error) {
                        toast.success("Logged in!")
                        router.push('/users')
                    }
                }
                )
                .finally(() => setIsLoading(false))
        }
    }

    const socialAction = (action: string) => {
        setIsLoading(true)
        signIn(action, { redirect: false })
            .then((res) => {
                if (res?.error) {
                    toast.error("Something went wrong!")
                }
                if (res?.ok && !res?.error)
                    toast.success("Logged in!")
            }
            )
            .finally(() => setIsLoading(false))

    }

    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white px-4 py-8 sm:shadow:rounded-lg sm:px-10">
                <form
                    className="space-y-6"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {variant === 'REGISTER' && (

                        <Input label="Name" register={register} id="name" errors={errors} disabled={isLoading} />
                    )}
                    <Input label="Email address " register={register} id="email" errors={errors} type="email" disabled={isLoading} />
                    <Input label="Password " register={register} id="password" errors={errors} type="password" disabled={isLoading} />
                    <div>
                        <Button
                            disabled={isLoading}
                            fullWidth
                            type="submit"
                        >
                            {variant === 'LOGIN' ? 'Sign in' : 'Register'}
                        </Button>
                    </div>
                </form>
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 items-center flex">
                            <div className="w-full border-t border-gray-300" />

                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">
                                Or continue with
                            </span>
                        </div>
                    </div>
                    <div className="mt-6 flex gap-2">
                        <AuthSocialButton
                            icon={BsGithub}
                            onClick={() => socialAction('github')}
                        />
                        <AuthSocialButton
                            icon={BsGoogle}
                            onClick={() => socialAction('google')}
                        />
                    </div>
                </div>
                <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
                    <div>
                        {variant === 'LOGIN' ? "New to Messenger?" : "Already have an account?"}
                    </div>
                    <div
                        onClick={toggleVariant}
                        className="underline cursor-pointer"
                    >
                        {variant === 'LOGIN' ? "Create an account" : "Sign in"}

                    </div>
                </div>

            </div>
        </div>
    )
}
export default AuthForm