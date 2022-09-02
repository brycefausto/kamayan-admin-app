import AsynchronousAutocomplete from '@/components/AsynchronousAutocomplete'
import ImageSelector from '@/components/ImageSelector'
import MultiSelect from '@/components/MultiSelect'
import { MAX_FILE_SIZE } from '@/config'
import { formatBytes, yupImageValidator } from '@/lib/utils'
import {
    Box,
    Button,
    Card,
    CssBaseline,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from '@mui/material'
import { useFormik } from 'formik'
import { ChangeEvent } from 'react'
import * as yup from 'yup'
import { favorites, tags } from './CategoryData'

const validationSchema = yup.object({
    recipeName: yup
        .string()
        .min(2, 'Recipe Name should be of minimum 3 characters length')
        .required('Recipe Name is required'),
    favorite: yup.string().required('Favorite is required'),
    tags: yup.array().of(yup.string()),
    contributorId: yup.string().required('Contributor is required'),
    imageFile: yupImageValidator
})

// TODO simulate loading data
function sleep(delay = 0) {
    return new Promise(resolve => {
        setTimeout(resolve, delay)
    })
}

export default function CreateCategoryForm() {
    const formik = useFormik({
        initialValues: {
            recipeName: '',
            favorite: '',
            tags: [],
            contributorId: '',
            imageFile: undefined,
        },
        validationSchema: validationSchema,
        onSubmit: ({ recipeName, favorite, tags, contributorId, imageFile }) => {
            // TODO submit data here
        },
    })

    const tagsOptions = async () => {
        await sleep(1e3)

        return tags
    }

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
                                <Select
                                    labelId="favorite"
                                    id="favorite"
                                    name="favorite"
                                    value={formik.values.favorite}
                                    label="Favorite"
                                    onChange={formik.handleChange}>
                                    {Object.entries(favorites).map(
                                        ([key, value]) => (
                                            <MenuItem key={key} value={value}>
                                                {key}
                                            </MenuItem>
                                        ),
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <MultiSelect
                                label="Tags"
                                onChange={handleOnTagsChange}
                                asyncOptions={tagsOptions}
                            />
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
