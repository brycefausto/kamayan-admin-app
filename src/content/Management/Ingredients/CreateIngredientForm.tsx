import ImageSelector, { ImageChangeHandler } from '@/components/ImageSelector'
import axios from '@/lib/axios'
import { uploadImage } from '@/lib/imagekit'
import { getParentDirectory, yupImageValidator } from '@/lib/utils'
import { Box, Button, Card, CssBaseline, Grid, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import * as yup from 'yup'
import FormErrorText from '../Common/FormErrorText'

const validationSchema = yup.object({
    name: yup
        .string()
        .min(2, 'Recipe Name should be of minimum 3 characters length')
        .required('Recipe Name is required'),
    image_file: yupImageValidator
})

export default function CreateIngredientForm() {
    const router = useRouter()
    const formik = useFormik({
        initialValues: {
            name: '',
            image_file: undefined,
        },
        validationSchema: validationSchema,
        onSubmit: async ({ name, image_file }) => {
            try {
                let uploadedImageName = ''

                if (image_file) {
                    const uploadedImage = await uploadImage(
                        image_file as File,
                        'ingredients',
                        [name, 'ingredient'],
                    )
                    uploadedImageName = uploadedImage.name
                }

                const result = await axios.post('/api/ingredients', {
                    name,
                    image_name: uploadedImageName,
                })

                console.log('result', result)

                alert("Ingredient successfully saved")
                router.push(getParentDirectory(router.pathname))
            } catch (error: any) {
                console.error(error.message)
            }
        },
    })

    const handleImageChange: ImageChangeHandler = (event, image_file) => {
        if (image_file) {
            console.log('image file changed')
            formik.setFieldValue('image_file', image_file)
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
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                name="name"
                                required
                                fullWidth
                                id="name"
                                label="Name"
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
                        <Grid item xs={12}>
                            <ImageSelector onChange={handleImageChange} />
                            <FormErrorText>{formik.touched.image_file && formik.errors.image_file}</FormErrorText>
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
