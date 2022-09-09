import ImageSelector, { ImageChangeHandler } from '@/components/ImageSelector'
import axios from '@/lib/axios'
import { uploadImage } from '@/lib/imagekit'
import { getParentDirectory, yupImageValidator } from '@/lib/utils'
import { EditIngredientProps } from '@/pages/management/ingredients/[id]/edit'
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

export default function EditIngredientForm({ ingredient }: EditIngredientProps) {
    const router = useRouter()
    const formik = useFormik({
        initialValues: {
            name: ingredient.name,
            image_file: undefined,
            image_url: ingredient.image_url
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

                const result = await axios.put('/api/ingredients/' + ingredient.id, {
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

    const handleImageChange: ImageChangeHandler = (_event, file) => {
        if (file) {
            formik.setFieldValue('image_file', file)
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
                            <ImageSelector value={formik.values.image_url} onChange={handleImageChange} />
                            <FormErrorText>{formik.touched.image_url && formik.errors.image_url}</FormErrorText>
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
