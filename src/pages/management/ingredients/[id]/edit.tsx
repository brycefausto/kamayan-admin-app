import Footer from '@/components/Footer'
import SidebarLayout from '@/layouts/SidebarLayout'
import Head from 'next/head'

import { Container, Grid } from '@mui/material'

import PageTitleWrapper from '@/components/PageTitleWrapper'
import FormPageHeader from '@/content/Management/Common/FormPageHeader'
import { Ingredient } from '@/models/ingredient'

import LoaderWrapper from '@/components/LoaderWrapper'
import EditIngredientForm from '@/content/Management/Ingredients/EditIngredientForm'
import { fetcher } from '@/lib/utils'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import useSWR from 'swr'
import { useLoadSingleData } from '@/hooks/loadSingleData'

export interface EditIngredientProps {
    ingredient: Ingredient
}

function EditIngredient() {
    const router = useRouter()
    const id = router.query.id as string
    const { loading, data, error } = useLoadSingleData<Ingredient>(id, '/api/ingredients')

    useEffect(() => {
        if (error) {
            router.push('/404')
        }
    })

    return (
        <LoaderWrapper loading={loading}>
            <Head>
                <title>Ingredients</title>
            </Head>
            <PageTitleWrapper>
                <FormPageHeader title="Edit Ingredient" />
            </PageTitleWrapper>
            <Container maxWidth="lg">
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={3}>
                    <Grid item xs={12}>
                        <EditIngredientForm ingredient={data as Ingredient} />
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </LoaderWrapper>
    )
}

EditIngredient.getLayout = (page: ReactElement) => (
    <SidebarLayout>{page}</SidebarLayout>
)

export default EditIngredient
