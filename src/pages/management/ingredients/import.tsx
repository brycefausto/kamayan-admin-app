import Footer from '@/components/Footer'
import SidebarLayout from '@/layouts/SidebarLayout'
import Head from 'next/head'

import { Container, Grid } from '@mui/material'

import PageTitleWrapper from '@/components/PageTitleWrapper'
import FormPageHeader from '@/content/Management/Common/FormPageHeader'
import ImportIngredientsForm from '@/content/Management/Ingredients/ImportIngredients'
import { ReactElement } from 'react'

function ImportIngredients() {
    return (
        <>
            <Head>
                <title>Ingredients</title>
            </Head>
            <PageTitleWrapper>
                <FormPageHeader title="Import Ingredient" />
            </PageTitleWrapper>
            <Container maxWidth="lg">
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={3}>
                    <Grid item xs={12}>
                        <ImportIngredientsForm />
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    )
}

ImportIngredients.getLayout = (page: ReactElement) => (
    <SidebarLayout>{page}</SidebarLayout>
)

export default ImportIngredients
