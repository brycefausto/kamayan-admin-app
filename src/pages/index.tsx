import { Typography, Box, Card, Container, Button, styled } from '@mui/material'
import type { ReactElement } from 'react'
import BaseLayout from '@/layouts/BaseLayout'

import Link from '@/components/Link'
import Head from 'next/head'

import Logo from '@/components/LogoSign'
import Hero from 'content/Overview/Hero'
import { useAuth } from '@/hooks/auth'

const HeaderWrapper = styled(Card)(
    ({ theme }) => `
    width: 100%;
    display: flex;
    align-items: center;
    height: ${theme.spacing(10)};
    margin-bottom: ${theme.spacing(10)};
  `,
)

const OverviewWrapper = styled(Box)(
    ({ theme }) => `
      overflow: auto;
      background: ${theme.palette.common.white};
      flex: 1;
      overflow-x: hidden;
  `,
)

function Overview() {
    const { isAuth } = useAuth({
        middleware: 'guest',
    })

    return (
        <OverviewWrapper>
            <Head>
                <title>Admin Dashboard</title>
            </Head>
            <HeaderWrapper>
                <Container maxWidth="lg">
                    <Box display="flex" alignItems="center">
                        <Logo />
                        <Box sx={{ ml: 2 }}>
                            <Button
                                component={Link}
                                href="/dashboard"
                                variant="contained"
                                sx={{ ml: 2 }}>
                                Dashboard
                            </Button>
                        </Box>
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            flex={1}>
                            <Box />
                            {!isAuth && (
                                <Box>
                                    <Button
                                        component={Link}
                                        href="/login"
                                        variant="contained"
                                        sx={{ ml: 2 }}>
                                        Login
                                    </Button>
                                    <Button
                                        component={Link}
                                        href="/register"
                                        variant="contained"
                                        sx={{ ml: 2 }}>
                                        Register
                                    </Button>
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Container>
            </HeaderWrapper>
            <Hero />
            <Container maxWidth="lg" sx={{ mt: 8 }}>
                <Typography textAlign="center" variant="subtitle1">
                    Crafted by{' '}
                    <Link
                        href="https://bloomui.com"
                        target="_blank"
                        rel="noopener noreferrer">
                        BloomUI.com
                    </Link>
                </Typography>
            </Container>
        </OverviewWrapper>
    )
}

export default Overview

Overview.getLayout = function getLayout(page: ReactElement) {
    return <BaseLayout>{page}</BaseLayout>
}
