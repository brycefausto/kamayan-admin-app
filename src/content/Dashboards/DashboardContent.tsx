import { Box, Button, Card, Divider, Grid, Typography } from '@mui/material'
import NextLink from 'next/link'

function DashboardContent() {
    return (
        <Card style={{ maxWidth: '600px' }}>
            <Grid spacing={0} container>
                <Grid item xs={12} md={12}>
                    <Box p={4}>
                        <Typography sx={{ mb: 2 }} variant="h3">
                            Content
                        </Typography>
                        <Divider />
                        <Grid container spacing={3} sx={{ my: 2 }}>
                            <Grid sm item>
                                <Typography variant="h4" gutterBottom>
                                    Contributors
                                </Typography>
                            </Grid>
                            <Grid sm item container justifyContent="flex-end">
                                <NextLink
                                    href="/management/contributors/create"
                                    passHref>
                                    <Button variant="outlined" sx={{ mr: 1 }}>
                                        Add New
                                    </Button>
                                </NextLink>
                                <NextLink
                                    href="/management/contributors"
                                    passHref>
                                    <Button variant="outlined">Manage</Button>
                                </NextLink>
                            </Grid>
                        </Grid>
                        <Divider />
                        <Grid container spacing={3} sx={{ my: 2 }}>
                            <Grid sm item>
                                <Typography variant="h4" gutterBottom>
                                    Categories
                                </Typography>
                            </Grid>
                            <Grid sm item container justifyContent="flex-end">
                                <NextLink
                                    href="/management/categories/create"
                                    passHref>
                                    <Button variant="outlined" sx={{ mr: 1 }}>
                                        Add New
                                    </Button>
                                </NextLink>
                                <NextLink
                                    href="/management/categories"
                                    passHref>
                                    <Button variant="outlined">Manage</Button>
                                </NextLink>
                            </Grid>
                        </Grid>
                        <Divider />
                        <Grid container spacing={3} sx={{ my: 2 }}>
                            <Grid sm item>
                                <Typography variant="h4" gutterBottom>
                                    Ingredients
                                </Typography>
                            </Grid>
                            <Grid sm item container justifyContent="flex-end">
                                <NextLink
                                    href="/management/ingredients/create"
                                    passHref>
                                    <Button variant="outlined" sx={{ mr: 1 }}>
                                        Add New
                                    </Button>
                                </NextLink>
                                <NextLink
                                    href="/management/ingredients"
                                    passHref>
                                    <Button variant="outlined">Manage</Button>
                                </NextLink>
                            </Grid>
                        </Grid>
                        <Divider />
                        <Grid container spacing={3} sx={{ my: 2 }}>
                            <Grid sm item>
                                <Typography variant="h4" gutterBottom>
                                    Recipes
                                </Typography>
                            </Grid>
                            <Grid sm item container justifyContent="flex-end">
                                <NextLink
                                    href="/management/recipes/create"
                                    passHref>
                                    <Button variant="outlined" sx={{ mr: 1 }}>
                                        Add New
                                    </Button>
                                </NextLink>
                                <NextLink href="/management/recipes" passHref>
                                    <Button variant="outlined">Manage</Button>
                                </NextLink>
                            </Grid>
                        </Grid>
                        <Divider />
                    </Box>
                </Grid>
            </Grid>
        </Card>
    )
}

export default DashboardContent
