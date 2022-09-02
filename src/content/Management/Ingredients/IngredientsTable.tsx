import Loader from '@/components/Loader'
import BulkActions from '@/content/Management/Common/BulkActions'
import axios from '@/lib/axios'
import { getPaginatedData } from '@/lib/pagination'
import { fetcher } from '@/lib/utils'
import { Ingredient } from '@/models/ingredient'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone'
import {
    Avatar,
    Box,
    Card,
    CardHeader,
    Checkbox,
    Divider,
    FormControl,
    IconButton,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead, TableRow,
    Tooltip,
    Typography,
    useTheme
} from '@mui/material'
import { useRouter } from 'next/router'
import { ChangeEvent, FC, useState } from 'react'
import useSWR from 'swr'

const IngredientsTable: FC = () => {
    const router = useRouter()
    const page = (router.query.page || 1) as number
    const { data, error, mutate } = useSWR(`/api/ingredients?page=${page}`, fetcher)
    const [selectedItems, setSelectedItems] = useState<string[]>([])
    const selectedBulkActions = selectedItems.length > 0
    const loading = !data && !error
    const { items, limit, count } = getPaginatedData<Ingredient>(data)

    const handleSelectAllItems = (
        event: ChangeEvent<HTMLInputElement>,
    ): void => {
        setSelectedItems(event.target.checked ? items.map(it => it.id) : [])
    }

    const handleSelectOneItem = (
        _event: ChangeEvent<HTMLInputElement>,
        itemId: string,
    ): void => {
        if (!selectedItems.includes(itemId)) {
            setSelectedItems(prevSelected => [...prevSelected, itemId])
        } else {
            setSelectedItems(prevSelected =>
                prevSelected.filter(id => id !== itemId),
            )
        }
    }

    const handlePageChange = (_event: any, newPage: number): void => {
        router.push(
            {
                pathname: '/',
                query: { page: newPage },
            },
            undefined,
            { shallow: true },
        )
    }

    const handleEditItem = (id: string) => {
        router.push({
            pathname: router.pathname + '/[id]/edit',
            query: { id }
        })
    }

    const handleDeleteItem = async (id: string) => {
        if (confirm('Are you sure you want to delete this item?')) {
            await axios.delete('/api/ingredients/' + id)
            mutate()
        }
    }

    const handleBulkDeleteItems = async () => {
        if (confirm('Are you sure you want to delete these items?')) {
            for (let id of selectedItems) {
                await axios.delete('/api/ingredients/' + id)
            }
            mutate()
        }
    }

    const selectedSomeItems =
        selectedItems.length > 0 && selectedItems.length < items.length
    const selectedAllItems = selectedItems.length === items.length
    const theme = useTheme()

    return (
        <Card>
            {selectedBulkActions && (
                <Box flex={1} p={2}>
                    <BulkActions onDelete={handleBulkDeleteItems} />
                </Box>
            )}
            {!selectedBulkActions && (
                <CardHeader
                    action={
                        <Box width={150}>
                            <FormControl
                                fullWidth
                                variant="outlined"></FormControl>
                        </Box>
                    }
                    title="Ingredients"
                />
            )}
            <Divider />
            {loading ? (
                <Loader />
            ) : (
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        color="primary"
                                        checked={selectedAllItems}
                                        indeterminate={selectedSomeItems}
                                        onChange={handleSelectAllItems}
                                    />
                                </TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Image</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map(item => {
                                const isItemSelected = selectedItems.includes(
                                    item.id,
                                )
                                return (
                                    <TableRow
                                        hover
                                        key={item.id}
                                        selected={isItemSelected}>
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                onChange={(
                                                    event: ChangeEvent<HTMLInputElement>,
                                                ) =>
                                                    handleSelectOneItem(
                                                        event,
                                                        item.id,
                                                    )
                                                }
                                                value={isItemSelected}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                variant="body1"
                                                fontWeight="bold"
                                                color="text.primary"
                                                gutterBottom
                                                noWrap>
                                                {item.name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Avatar
                                                variant="rounded"
                                                alt="image"
                                                src={item.image_url}
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Tooltip title="Edit Item" arrow>
                                                <IconButton
                                                    sx={{
                                                        '&:hover': {
                                                            background:
                                                                theme.colors
                                                                    .primary
                                                                    .lighter,
                                                        },
                                                        color: theme.palette
                                                            .primary.main,
                                                    }}
                                                    color="inherit"
                                                    size="small"
                                                    onClick={() => {
                                                        handleEditItem(item.id)
                                                    }}>
                                                    <EditTwoToneIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete Item" arrow>
                                                <IconButton
                                                    sx={{
                                                        '&:hover': {
                                                            background:
                                                                theme.colors
                                                                    .error
                                                                    .lighter,
                                                        },
                                                        color: theme.palette
                                                            .error.main,
                                                    }}
                                                    color="inherit"
                                                    size="small"
                                                    onClick={() => {
                                                        handleDeleteItem(
                                                            item.id,
                                                        )
                                                    }}>
                                                    <DeleteTwoToneIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            <Box p={2}>
                <Pagination
                    count={count}
                    page={page}
                    onChange={handlePageChange}
                />
            </Box>
        </Card>
    )
}

export default IngredientsTable

// export const getServerSideProps: GetServerSideProps = async ({ query: { page = 1 } }) => {
//     const res = await axios.get(`/api/ingredients?page=${page}`)
//     const ingredients: Ingredient[] = res.data.data
//     return { props: { ingredients, page } }
//   }
