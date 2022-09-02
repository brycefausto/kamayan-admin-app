import ImageSelector, { ImageChangeHandler } from '@/components/ImageSelector'
import { MAX_FILE_SIZE } from '@/config'
import { uploadImage } from '@/lib/imagekit'
import { formatBytes, yupImageValidator } from '@/lib/utils'
import {
    Box,
    Button,
    Card,
    CssBaseline,
    Divider,
    Grid,
    styled,
    TextField,
    Typography,
} from '@mui/material'
import { useFormik } from 'formik'
import { useAlert } from 'react-alert'
import * as yup from 'yup'

const validationSchema = yup.object({
    name: yup.string().required('Name is required'),
    imageFile: yupImageValidator
})

const LabelWrapper = styled('label')(
    ({ theme }) => `
          font-weight: bold;
          margin-top: ${theme.spacing(1)};
          margin-right: ${theme.spacing(1)};
  `,
)

export default function CreateContributorForm() {
    const alert = useAlert()
    const formik = useFormik({
        initialValues: {
            name: '',
            imageFile: undefined,
            facebook: undefined,
            twitter: undefined,
            instagram: undefined,
            youtube: undefined,
            tiktok: undefined,
        },
        validationSchema: validationSchema,
        onSubmit: async ({ imageFile, ...values }) => {
            // TODO submit data here

            alert.show("Contributor successfully created")

            if (imageFile) {
                try {
                    const uploadedImageUrl = await uploadImage(
                        imageFile as File,
                        'contributors',
                        ['contributor'],
                    )
                } catch (error: any) {
                    console.log(error.message)
                }
            }
        },
    })

    const handleImageChange: ImageChangeHandler = (event, file) => {
        if (file) {
            formik.setFieldValue('imageFile', file)
        }
    }

    return (
        <Card sx={{ px: 2 }}>
            <CssBaseline />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left',
                }}>
                <Box
                    component="form"
                    noValidate
                    onSubmit={formik.handleSubmit}
                    sx={{ mt: 3 }}>
                    <Grid container spacing={2} sx={{ mb: 1 }}>
                        <Grid item xs={6}>
                            <TextField
                                name="name"
                                required
                                fullWidth
                                id="name"
                                label="name"
                                autoFocus
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.name &&
                                    Boolean(formik.errors.name)
                                }
                                helperText={
                                    formik.touched.name && formik.errors.name
                                }
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <ImageSelector onChange={handleImageChange} />
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid container sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <Typography
                                variant="body1"
                                fontWeight="bold"
                                color="text.primary"
                                sx={{ mb: 2 }}
                                noWrap>
                                Add Social Media Links
                            </Typography>
                        </Grid>
                        <Grid item container xs={12} mb={1}>
                            <Grid xs={1}>
                                <LabelWrapper htmlFor="facebook">
                                    Facebook:
                                </LabelWrapper>
                            </Grid>
                            <Grid xs={10}>
                                <TextField
                                    name="facebook"
                                    required
                                    id="facebook"
                                    autoFocus
                                    value={formik.values.facebook}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.facebook &&
                                        Boolean(formik.errors.facebook)
                                    }
                                    helperText={
                                        formik.touched.facebook &&
                                        formik.errors.facebook
                                    }
                                    size="small"
                                    sx={{ width: '600px' }}
                                />
                            </Grid>
                        </Grid>
                        <Grid item container xs={12} mb={1}>
                            <Grid xs={1}>
                                <LabelWrapper htmlFor="twitter">
                                    Twitter:
                                </LabelWrapper>
                            </Grid>
                            <Grid xs={10}>
                                <TextField
                                    name="twitter"
                                    required
                                    id="twitter"
                                    autoFocus
                                    value={formik.values.twitter}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.twitter &&
                                        Boolean(formik.errors.twitter)
                                    }
                                    helperText={
                                        formik.touched.twitter &&
                                        formik.errors.twitter
                                    }
                                    size="small"
                                    sx={{ width: '600px' }}
                                />
                            </Grid>
                        </Grid>
                        <Grid item container xs={12} mb={1}>
                            <Grid xs={1}>
                                <LabelWrapper htmlFor="instagram">
                                    Instagram:
                                </LabelWrapper>
                            </Grid>
                            <Grid xs={10}>
                                <TextField
                                    name="instagram"
                                    required
                                    id="instagram"
                                    autoFocus
                                    value={formik.values.instagram}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.instagram &&
                                        Boolean(formik.errors.instagram)
                                    }
                                    helperText={
                                        formik.touched.instagram &&
                                        formik.errors.instagram
                                    }
                                    size="small"
                                    sx={{ width: '600px' }}
                                />
                            </Grid>
                        </Grid>
                        <Grid item container xs={12} mb={1}>
                            <Grid xs={1}>
                                <LabelWrapper htmlFor="youtube">
                                    Youtube:
                                </LabelWrapper>
                            </Grid>
                            <Grid xs={10}>
                                <TextField
                                    name="youtube"
                                    required
                                    id="youtube"
                                    autoFocus
                                    value={formik.values.youtube}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.youtube &&
                                        Boolean(formik.errors.youtube)
                                    }
                                    helperText={
                                        formik.touched.youtube &&
                                        formik.errors.youtube
                                    }
                                    size="small"
                                    sx={{ width: '600px' }}
                                />
                            </Grid>
                        </Grid>
                        <Grid item container xs={12} mb={1}>
                            <Grid xs={1}>
                                <LabelWrapper htmlFor="tiktok">
                                    TikTok:
                                </LabelWrapper>
                            </Grid>
                            <Grid xs={10}>
                                <TextField
                                    name="tiktok"
                                    required
                                    id="tiktok"
                                    autoFocus
                                    value={formik.values.tiktok}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.tiktok &&
                                        Boolean(formik.errors.tiktok)
                                    }
                                    helperText={
                                        formik.touched.tiktok &&
                                        formik.errors.tiktok
                                    }
                                    size="small"
                                    sx={{ width: '600px' }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}>
                        Save
                    </Button>
                </Box>
            </Box>
        </Card>
    )
}
