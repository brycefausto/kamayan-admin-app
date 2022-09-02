import Footer from '@/components/Footer'
import SidebarLayout from '@/layouts/SidebarLayout'
import Head from 'next/head'

import { Container, Grid } from '@mui/material'

import PageTitleWrapper from '@/components/PageTitleWrapper'
import CreateCategoryForm from '@/content/Management/Categories/CreateCategoryForm'
import FormPageHeader from '@/content/Management/Common/FormPageHeader'
import { ReactElement } from 'react'

function CreateCategories() {
    return (
        <>
            <Head>
                <title>Categories</title>
            </Head>
            <PageTitleWrapper>
                <FormPageHeader title="Create Category" />
            </PageTitleWrapper>
            <Container maxWidth="lg">
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={3}>
                    <Grid item xs={12}>
                        <CreateCategoryForm />
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    )
}

CreateCategories.getLayout = (page: ReactElement) => (
    <SidebarLayout>{page}</SidebarLayout>
)

export default CreateCategories
