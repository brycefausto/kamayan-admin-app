import AddTwoToneIcon from '@mui/icons-material/AddTwoTone'
import UploadTwoTone from '@mui/icons-material/UploadTwoTone'
import { Button, Grid, Typography } from '@mui/material'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

export type PageHeaderProps = {
    title: string
    description?: string
    createButtonLabel: string
    importButtonLabel?: string
}

function PageHeader({
    title,
    description,
    createButtonLabel,
    importButtonLabel,
}: PageHeaderProps) {
    const router = useRouter()

    return (
        <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
                <Typography variant="h3" component="h3" gutterBottom>
                    {title}
                </Typography>
                {description && (
                    <Typography variant="subtitle2">{description}</Typography>
                )}
            </Grid>
            <Grid item>
                <NextLink href={router.pathname + '/create'} passHref>
                    <Button
                        sx={{ mt: { xs: 2, md: 0 }, mr: 1 }}
                        variant="contained"
                        startIcon={<AddTwoToneIcon fontSize="small" />}>
                        {createButtonLabel}
                    </Button>
                </NextLink>
                {importButtonLabel && (
                    <NextLink href={router.pathname + '/import'} passHref>
                        <Button
                            sx={{ mt: { xs: 2, md: 0 } }}
                            variant="contained"
                            startIcon={<UploadTwoTone fontSize="small" />}>
                            {importButtonLabel}
                        </Button>
                    </NextLink>
                )}
            </Grid>
        </Grid>
    )
}

export default PageHeader
