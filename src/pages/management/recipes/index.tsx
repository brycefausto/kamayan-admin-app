import Footer from '@/components/Footer'
import PageTitleWrapper from '@/components/PageTitleWrapper'
import PageHeader from '@/content/Management/Common/PageHeader'
import SidebarLayout from '@/layouts/SidebarLayout'
import { Container, Grid, Typography } from '@mui/material'
import Head from 'next/head'

import { ReactNode } from 'react'

function Ingredients() {
    return (
        <>
            <Head>
                <title>Recipes</title>
            </Head>
            <PageTitleWrapper>
                <PageHeader title="Recipes" createButtonLabel="Recipes" />
            </PageTitleWrapper>
            <Container maxWidth="lg">
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={3}>
                    <Grid item xs={12}>
                        <Typography
                            variant="body1"
                            fontWeight="bold"
                            color="text.primary"
                            gutterBottom
                            noWrap>
                            Work in progress
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    )
}

Ingredients.getLayout = (page: ReactNode) => (
    <SidebarLayout>{page}</SidebarLayout>
)

export default Ingredients
