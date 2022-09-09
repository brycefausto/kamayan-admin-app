import Footer from '@/components/Footer'
import SidebarLayout from '@/layouts/SidebarLayout'
import Head from 'next/head'

import { Container, Grid } from '@mui/material'

import PageTitleWrapper from '@/components/PageTitleWrapper'
import ImportCategoriesForm from '@/content/Management/Categories/ImportCategories'
import FormPageHeader from '@/content/Management/Common/FormPageHeader'
import { ReactElement } from 'react'

function ImportCategories() {
    return (
        <>
            <Head>
                <title>Categories</title>
            </Head>
            <PageTitleWrapper>
                <FormPageHeader title="Import Categories" />
            </PageTitleWrapper>
            <Container maxWidth="lg">
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={3}>
                    <Grid item xs={12}>
                        <ImportCategoriesForm />
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    )
}

ImportCategories.getLayout = (page: ReactElement) => (
    <SidebarLayout>{page}</SidebarLayout>
)

export default ImportCategories
