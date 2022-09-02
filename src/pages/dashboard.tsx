import Head from 'next/head'

import SidebarLayout from '@/layouts/SidebarLayout'

import PageHeader from '@/content/Dashboards/PageHeader'
import PageTitleWrapper from '@/components/PageTitleWrapper'
import { Container, Grid, Typography } from '@mui/material'
import Footer from '@/components/Footer'

import { ReactNode } from 'react'
import DashboardContent from '@/content/Dashboards/DashboardContent'

const Dashboard = () => {
    return (
        <>
            <Head>
                <title>Admin Dashboard</title>
            </Head>
            <PageTitleWrapper>
                <PageHeader />
            </PageTitleWrapper>
            <Container maxWidth="lg">
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={4}>
                    <Grid item xs={12}>
                        <DashboardContent />
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    )
}

Dashboard.getLayout = (page: ReactNode) => <SidebarLayout>{page}</SidebarLayout>

export default Dashboard
