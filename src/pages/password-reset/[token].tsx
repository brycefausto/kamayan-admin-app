import AuthSessionStatus from '@/components/AuthSessionStatus'
import AuthValidationErrors from '@/components/AuthValidationErrors'
import CopyrightDetails from '@/components/CopyrightDetails'
import Logo from '@/components/Logo'
import { useAuth } from '@/hooks/auth'
import { onChangeSetState } from '@/lib/utils'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'

export default function PasswordReset() {
    const router = useRouter()

    const { resetPassword } = useAuth({ middleware: 'guest' })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState<any[]>([])
    const [status, setStatus] = useState<any>(null)

    const submitForm = (event: FormEvent) => {
        event.preventDefault()

        resetPassword({
            email,
            password,
            password_confirmation: passwordConfirmation,
            setErrors,
            setStatus,
        })
    }

    useEffect(() => {
        const queryEmail = (router.query.email || '') as string
        setEmail(queryEmail)
    }, [router.query.email])

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                <Logo />
                {/* Session Status */}
                <AuthSessionStatus className="mb-4" status={status} />

                {/* Validation Errors */}
                <AuthValidationErrors className="mb-4" errors={errors} />
                <Typography component="h1" variant="h5">
                    Reset Password
                </Typography>
                <Box
                    component="form"
                    noValidate
                    onSubmit={submitForm}
                    sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={onChangeSetState(setEmail)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                onChange={onChangeSetState(setPassword)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="passwordConfirmation"
                                label="Password Confirmation"
                                type="password"
                                id="passwordConfirmation"
                                onChange={onChangeSetState(
                                    setPasswordConfirmation,
                                )}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}>
                        Reset Password
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Back to Login page
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <CopyrightDetails sx={{ mt: 5 }} />
        </Container>
    )
}
