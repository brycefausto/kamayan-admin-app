import type { ReactElement, ReactNode } from 'react'
import '../styles/globals.css'

import { CacheProvider, EmotionCache } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { SidebarProvider } from 'contexts/SidebarContext'
import createEmotionCache from 'createEmotionCache'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Router from 'next/router'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import ThemeProvider from 'theme/ThemeProvider'
import { AlertProvider } from '@/components/Alert'

const clientSideEmotionCache = createEmotionCache()

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
}

interface AdminAppProps extends AppProps {
    emotionCache?: EmotionCache
    Component: NextPageWithLayout
}

function AdminApp(props: AdminAppProps) {
    const {
        Component,
        emotionCache = clientSideEmotionCache,
        pageProps,
    } = props
    const getLayout = Component.getLayout ?? (page => page)

    Router.events.on('routeChangeStart', nProgress.start)
    Router.events.on('routeChangeError', nProgress.done)
    Router.events.on('routeChangeComplete', nProgress.done)

    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <title>Admin Dashboard</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
            </Head>
            <AlertProvider>
                <SidebarProvider>
                    <ThemeProvider>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <CssBaseline />
                            {getLayout(<Component {...pageProps} />)}
                        </LocalizationProvider>
                    </ThemeProvider>
                </SidebarProvider>
            </AlertProvider>
        </CacheProvider>
    )
}

export default AdminApp
