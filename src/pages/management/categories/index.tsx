import Footer from '@/components/Footer';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import PageHeader from '@/content/Management/Common/PageHeader';
import SidebarLayout from '@/layouts/SidebarLayout';
import { Container, Grid } from '@mui/material';
import Head from 'next/head';

import CategoriesTable from '@/content/Management/Categories/CategoriesTable';
import { ReactNode } from 'react';

function Categories() {
  return (
    <>
      <Head>
        <title>Categories</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader title="Categories" createButtonLabel="Create Category" />
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
            <CategoriesTable />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

Categories.getLayout = (page: ReactNode) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default Categories;
