import { Box, Tooltip, IconButton, Typography } from '@mui/material'
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone'
import _ from 'lodash'
import { useRouter } from 'next/router'

export type FormPageHeaderProps = {
    title: string
    description?: string
}

function FormPageHeader({
    title,
    description,
}: FormPageHeaderProps) {
    const router = useRouter()
    const handleBackButton = () => {
        router.back()
    }
    return (
        <Box display="flex">
            <Tooltip arrow placement="top" title="Go back">
                <IconButton color="primary" sx={{ p: 1, mr: 2 }} onClick={handleBackButton}>
                    <ArrowBackTwoToneIcon />
                </IconButton>
            </Tooltip>
            <Box>
                <Typography variant="h3" component="h3" gutterBottom>
                    {title}
                </Typography>
                {description && <Typography variant="subtitle2">{description}</Typography>}
            </Box>
        </Box>
    )
}

export default FormPageHeader
