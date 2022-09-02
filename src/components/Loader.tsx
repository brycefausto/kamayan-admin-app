import {
    Box,
    CircularProgress, styled,
    Typography
} from '@mui/material'


const LoaderBox = styled(Box)(
    () => `
        position: fixed;
     top: 20%;
     left: 50%;
     display: flex;
     justify-content: center;
     align-items: center;
  `,
)

function Loader() {
    return (
        <LoaderBox>
            <Box flex="1" flexDirection="column">
                <Box>
                    <CircularProgress size={100} />
                </Box>
                <Box>
                    <Typography variant="h3" component="h3">
                        Loading...
                    </Typography>
                </Box>
            </Box>
        </LoaderBox>
    )
}

export default Loader
