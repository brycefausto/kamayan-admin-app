import AsynchronousAutocomplete from '@/components/AsynchronousAutocomplete'
import ImageSelector from '@/components/ImageSelector'
import MultiSelect from '@/components/MultiSelect'
import { yupImageValidator } from '@/lib/utils'
import {
    Box,
    Button,
    Card,
    CssBaseline,
    FormControl,
    Grid,
    InputLabel, TextField
} from '@mui/material'
import { useFormik } from 'formik'
import { ChangeEvent } from 'react'
import * as yup from 'yup'

const validationSchema = yup.object({
    name: yup
        .string()
        .min(2, 'Name should be of minimum 3 characters length')
        .required('Name is required'),
    tags: yup.array().of(yup.string()),
    contributorId: yup.string().required('Contributor is required'),
    image_file: yupImageValidator
})

// TODO simulate loading data
function sleep(delay = 0) {
    return new Promise(resolve => {
        setTimeout(resolve, delay)
    })
}

export default function CreateRecipeForm() {
    const formik = useFormik({
        initialValues: {
            recipeName: '',
            favorite: '',
            tags: [],
            contributorId: '',
            image_file: undefined,
        },
        validationSchema: validationSchema,
        onSubmit: ({ recipeName, favorite, tags, contributorId, image_file }) => {
            // TODO submit data here
        },
    })

    const handleOnTagsChange = (
        _e: ChangeEvent<HTMLInputElement>,
        value: string[],
    ) => {
        formik.setFieldValue('tags', value, true)
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
                                name="recipeName"
                                required
                                fullWidth
                                id="recipeName"
                                label="Recipe Name"
                                autoFocus
                                value={formik.values.recipeName}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.recipeName &&
                                    Boolean(formik.errors.recipeName)
                                }
                                helperText={
                                    formik.touched.recipeName &&
                                    formik.errors.recipeName
                                }
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="favorite">
                                    Favorite
                                </InputLabel>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                        </Grid>
                        <Grid item xs={12}>
                            <ImageSelector />
                        </Grid>
                        <Grid item xs={12}>
                            <AsynchronousAutocomplete label="Choose Contributor" />
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
