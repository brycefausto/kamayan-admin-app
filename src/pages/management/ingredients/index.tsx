import Footer from '@/components/Footer';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import PageHeader from '@/content/Management/Common/PageHeader';
import IngredientsTable from '@/content/Management/Ingredients/IngredientsTable';
import SidebarLayout from '@/layouts/SidebarLayout';
import { Container, Grid } from '@mui/material';
import Head from 'next/head';

import { ReactNode } from 'react';

function Ingredients() {
  return (
    <>
      <Head>
        <title>Ingredients</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader title="Ingredients" createButtonLabel="Create Ingredient" importButtonLabel="Import Ingredients" />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <IngredientsTable />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

Ingredients.getLayout = (page: ReactNode) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default Ingredients;
