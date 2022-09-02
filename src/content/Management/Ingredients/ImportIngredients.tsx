import LoadingProgress from '@/components/LoadingProgress'
import MultipleImageSelector, {
    ImagesChangeHandler,
} from '@/components/MultipleImageSelector'
import axios from '@/lib/axios'
import { uploadImage } from '@/lib/imagekit'
import { getParentDirectory, sleep, yupMultipleImageValidator } from '@/lib/utils'
import { Alert, Box, Button, Card, CssBaseline, Grid } from '@mui/material'
import { useFormik } from 'formik'
import { isArray } from 'lodash'
import { useRouter } from 'next/router'
import { useState } from 'react'
import * as yup from 'yup'

const validationSchema = yup.object({
    image_files: yupMultipleImageValidator,
})

export default function ImportIngredientsForm() {
    const router = useRouter()
    const [showProgress, setShowProgress] = useState(true)
    const [progress, setProgress] = useState(0)
    const formik = useFormik<{ image_files: File[] | undefined }>({
        initialValues: {
            image_files: undefined,
        },
        validationSchema: validationSchema,
        onSubmit: async ({ image_files }) => {
            try {
                let uploadedImageName = ''

                if (image_files && isArray(image_files)) {
                    const total = image_files.length
                    let uploadedCount = 0
                    setShowProgress(true)

                    for (let image_file of image_files as File[]) {
                        const name = image_file.name.replace(/\.[^/\\.]+$/, '')
                        const uploadedImage = await uploadImage(
                            image_file as File,
                            'ingredients',
                            [name, 'ingredient'],
                        )
                        uploadedImageName = uploadedImage.name

                        const result = await axios.post('/api/ingredients', {
                            name,
                            image_name: uploadedImageName,
                        })

                        console.log('result', result)

                        uploadedCount++

                        setProgress((uploadedCount / total) * 100)
                    }
                }

                await sleep(500)

                alert('Ingredients successfully uploaded')
                setProgress(0)
                setShowProgress(false)

                router.push(getParentDirectory(router.pathname))
            } catch (error: any) {
                console.error(error.message)

                alert('Error: ' + error.message)
            }
        },
    })

    const handleImageChange: ImagesChangeHandler = (event, image_files) => {
        if (image_files) {
            formik.setFieldValue('image_files', image_files)
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
                        <Grid item xs={12}>
                            Import ingredients using image files. The name of
                            the image will be used as display name of the
                            uploaded ingredient.
                        </Grid>
                        <Grid item xs={12}>
                            <MultipleImageSelector
                                onChange={handleImageChange}
                            />
                        </Grid>
                        {showProgress && (
                            <Grid item xs={12}>
                                <Box>Uploading images</Box>
                                <LoadingProgress value={progress} />
                                <Alert severity="warning">
                                    Please do not close the page while the images are
                                    being uploaded.
                                </Alert>
                            </Grid>
                        )}
                    </Grid>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}>
                        Upload
                    </Button>
                </Box>
            </Box>
        </Card>
    )
}
