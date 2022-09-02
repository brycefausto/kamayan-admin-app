import BaseLayout from '@/layouts/BaseLayout'
import {
    Box, Button, Container, styled, Typography
} from '@mui/material'
import type { ReactElement } from 'react'
import { useState } from 'react'

import RefreshTwoToneIcon from '@mui/icons-material/RefreshTwoTone'
import LoadingButton from '@mui/lab/LoadingButton'
import Head from 'next/head'


const MainContent = styled(Box)(
    () => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`,
)

const TopWrapper = styled(Box)(
    ({ theme }) => `
  display: flex;
  width: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing(6)};
`,
)

function Status500() {
    const [pending, setPending] = useState(false)
    function handleClick() {
        setPending(true)
    }

    return (
        <>
            <Head>
                <title>Status - 500</title>
            </Head>
            <MainContent>
                <TopWrapper>
                    <Container maxWidth="md">
                        <Box textAlign="center">
                            <Typography variant="h2" sx={{ my: 2 }}>
                                Error 500
                            </Typography>
                            <Typography variant="h2" sx={{ my: 2 }}>
                                There was an error, please try again later
                            </Typography>
                            <Typography
                                variant="h4"
                                color="text.secondary"
                                fontWeight="normal"
                                sx={{ mb: 4 }}>
                                The server encountered an internal error and was
                                not able to complete your request
                            </Typography>
                            <LoadingButton
                                onClick={handleClick}
                                loading={pending}
                                variant="outlined"
                                color="primary"
                                startIcon={<RefreshTwoToneIcon />}>
                                Refresh view
                            </LoadingButton>
                            <Button href="/" variant="contained" sx={{ ml: 1 }}>
                                Go back
                            </Button>
                        </Box>
                    </Container>
                </TopWrapper>
            </MainContent>
        </>
    )
}

export default Status500

Status500.getLayout = function getLayout(page: ReactElement) {
    return <BaseLayout>{page}</BaseLayout>
}
