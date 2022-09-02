import useSWR from 'swr'
import axios from '@/lib/axios'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { useRouter } from 'next/router'
import { emptyUser, User } from '@/models/user'

export interface UseAuthProps {
    middleware?: 'guest' | 'auth'
    redirectIfAuthenticated?: string
}

export interface AuthProps {
    [x: string]: any
    setErrors: Dispatch<SetStateAction<any[]>>
    setStatus: Dispatch<SetStateAction<any>>
}

export interface RegisterProps {
    [x: string]: any
    setErrors: Dispatch<SetStateAction<any[]>>
}

export interface EmailVerificationProps {
    [x: string]: any
    setStatus: Dispatch<SetStateAction<any>>
}

export const useAuth = ({
    middleware,
    redirectIfAuthenticated,
}: UseAuthProps = {}) => {
    const router = useRouter()

    let {
        data: user,
        error,
        mutate,
    } = useSWR<User>('/api/user', () =>
        axios
            .get('/api/user')
            .then(res => {
                if (res.status === 200) {
                    return res.data
                } else {
                    throw new Error(res.data.message)
                }
            })
            .catch(error => {
                if (error.response.status !== 409) throw error

                router.push('/verify-email')
            }),
    )

    const isLoaded = !!user
    const isAuth = !!user && !!user.id

    if (!user) {
        user = emptyUser
    }

    user.roleTitle = 'Super Admin'

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const register = async ({ setErrors, ...props }: RegisterProps) => {
        await csrf()

        setErrors([])

        axios
            .post('/register', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(Object.values(error.response.data.errors).flat())
            })
    }

    const login = async ({ setErrors, setStatus, ...props }: AuthProps) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/login', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(Object.values(error.response.data.errors).flat())
            })
    }

    const forgotPassword = async ({
        setErrors,
        setStatus,
        email,
    }: AuthProps) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/forgot-password', { email })
            .then(response => setStatus(response.data.status))
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(Object.values(error.response.data.errors).flat())
            })
    }

    const resetPassword = async ({
        setErrors,
        setStatus,
        ...props
    }: AuthProps) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/reset-password', { token: router.query.token, ...props })
            .then(response =>
                router.push('/login?reset=' + btoa(response.data.status)),
            )
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(Object.values(error.response.data.errors).flat())
            })
    }

    const resendEmailVerification = ({ setStatus }: EmailVerificationProps) => {
        axios
            .post('/email/verification-notification')
            .then(response => setStatus(response.data.status))
    }

    const logout = async () => {
        if (!error) {
            await axios.post('/logout').then(() => mutate())
        }

        window.location.pathname = '/login'
    }

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && isAuth)
            router.push(redirectIfAuthenticated)
        if (middleware === 'auth' && error) logout()
    }, [user, error])

    return {
        user,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
        isLoaded,
        isAuth
    }
}
