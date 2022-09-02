import Footer from '@/components/Footer';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import PageHeader from '@/content/Management/Common/PageHeader';
import SidebarLayout from '@/layouts/SidebarLayout';
import { Container, Grid } from '@mui/material';
import Head from 'next/head';

import { ReactNode } from 'react';
import ContributorsTable from '@/content/Management/Contributors/ContributorsTable';

function Contributors() {
  return (
    <>
      <Head>
        <title>Contributors</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader title="Contributors" createButtonLabel="Contributors" />
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
            <ContributorsTable />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

Contributors.getLayout = (page: ReactNode) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default Contributors;
