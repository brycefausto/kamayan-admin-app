import Footer from '@/components/Footer'
import SidebarLayout from '@/layouts/SidebarLayout'
import Head from 'next/head'

import { Container, Grid } from '@mui/material'

import PageTitleWrapper from '@/components/PageTitleWrapper'
import FormPageHeader from '@/content/Management/Common/FormPageHeader'
import CreateIngredientForm from '@/content/Management/Ingredients/CreateIngredientForm'
import { ReactElement } from 'react'

function CreateIngredient() {
    return (
        <>
            <Head>
                <title>Ingredients</title>
            </Head>
            <PageTitleWrapper>
                <FormPageHeader title="Create Ingredient" />
            </PageTitleWrapper>
            <Container maxWidth="lg">
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={3}>
                    <Grid item xs={12}>
                        <CreateIngredientForm />
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    )
}

CreateIngredient.getLayout = (page: ReactElement) => (
    <SidebarLayout>{page}</SidebarLayout>
)

export default CreateIngredient
