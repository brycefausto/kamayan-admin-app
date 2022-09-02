import Footer from '@/components/Footer'
import SidebarLayout from '@/layouts/SidebarLayout'
import Head from 'next/head'

import { Container, Grid } from '@mui/material'

import PageTitleWrapper from '@/components/PageTitleWrapper'
import CreateContributorForm from '@/content/Management/Contributors/CreateContributorForm'
import FormPageHeader from '@/content/Management/Common/FormPageHeader'
import { ReactElement } from 'react'

function CreateContributors() {
    return (
        <>
            <Head>
                <title>Contributors</title>
            </Head>
            <PageTitleWrapper>
                <FormPageHeader title="Create Contributors" />
            </PageTitleWrapper>
            <Container maxWidth="lg">
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={3}>
                    <Grid item xs={12}>
                        <CreateContributorForm />
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    )
}

CreateContributors.getLayout = (page: ReactElement) => (
    <SidebarLayout>{page}</SidebarLayout>
)

export default CreateContributors
