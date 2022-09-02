import BulkActions from '@/content/Management/Common/BulkActions'
import { Category } from '@/models/category'
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
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Tooltip,
    Typography,
    useTheme
} from '@mui/material'
import { ChangeEvent, FC, useState } from 'react'
import { categories } from './CategoryData'

const applyPagination = (
    it: Category[],
    page: number,
    limit: number,
): Category[] => {
    return it.slice(page * limit, page * limit + limit)
}

const items = categories

const CategoriesTable: FC = () => {
    const [selectedItems, setSelectedItems] = useState<string[]>([])
    const selectedBulkActions = selectedItems.length > 0
    const [page, setPage] = useState<number>(0)
    const [limit, setLimit] = useState<number>(5)

    const handleSelectAllItems = (
        event: ChangeEvent<HTMLInputElement>,
    ): void => {
        setSelectedItems(
            event.target.checked ? items.map(it => it.id) : [],
        )
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
        setPage(newPage)
    }

    const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setLimit(parseInt(event.target.value))
    }

    const getTags = (tags: string[]) => {
        return tags.join(', ')
    }

    const paginatedItems = applyPagination(items, page, limit)
    const selectedSomeItems =
        selectedItems.length > 0 && selectedItems.length < categories.length
    const selectedAllItems = selectedItems.length === categories.length
    const theme = useTheme()

    const handleDeleteItem = async (id: string) => {
        // if (confirm('Are you sure you want to delete this item?')) {
        //     await axios.delete('/api/categories/' + id)
        //     mutate()
        // }
    }

    const handleBulkDeleteItems = async () => {
        // if (confirm('Are you sure you want to delete these items?')) {
        //     for (let id of selectedItems) {
        //         await axios.delete('/api/categories/' + id)
        //     }
        //     mutate()
        // }
    }

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
                    title="Categories"
                />
            )}
            <Divider />
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
                            <TableCell>Recipe Name</TableCell>
                            <TableCell>Favorite</TableCell>
                            <TableCell>Tags</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Contributor</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedItems.map(item => {
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
                                            {item.recipeName}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            variant="body1"
                                            fontWeight="bold"
                                            color="text.primary"
                                            gutterBottom
                                            noWrap>
                                            {item.favorite}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            variant="body1"
                                            fontWeight="bold"
                                            color="text.primary"
                                            gutterBottom
                                            noWrap>
                                            {getTags(item.tags)}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Avatar variant="rounded" alt="image" src={item.imageUrl} />
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            variant="body1"
                                            fontWeight="bold"
                                            color="text.primary"
                                            gutterBottom
                                            noWrap>
                                            {item.contributor_name}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="Edit Item" arrow>
                                            <IconButton
                                                sx={{
                                                    '&:hover': {
                                                        background:
                                                            theme.colors.primary
                                                                .lighter,
                                                    },
                                                    color: theme.palette.primary
                                                        .main,
                                                }}
                                                color="inherit"
                                                size="small">
                                                <EditTwoToneIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete Item" arrow>
                                            <IconButton
                                                sx={{
                                                    '&:hover': {
                                                        background:
                                                            theme.colors.error
                                                                .lighter,
                                                    },
                                                    color: theme.palette.error
                                                        .main,
                                                }}
                                                color="inherit"
                                                size="small">
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
            <Box p={2}>
                <TablePagination
                    component="div"
                    count={items.length}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleLimitChange}
                    page={page}
                    rowsPerPage={limit}
                    rowsPerPageOptions={[5, 10, 25, 30]}
                />
            </Box>
        </Card>
    )
}

export default CategoriesTable
