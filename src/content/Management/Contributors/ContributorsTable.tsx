import BulkActions from '@/content/Management/Common/BulkActions'
import { Contributor } from '@/models/contributor'
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
import { contributors } from './ContributorData'
import SocialMediaDisplay from './SocialMediaDisplay'

const applyPagination = (
    it: Contributor[],
    page: number,
    limit: number,
): Contributor[] => {
    return it.slice(page * limit, page * limit + limit)
}

const items = contributors

const ContributorsTable: FC = () => {
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

    const paginatedItems = applyPagination(contributors, page, limit)
    const selectedSomeItems =
        selectedItems.length > 0 && selectedItems.length < contributors.length
    const selectedAllItems = selectedItems.length === contributors.length
    const theme = useTheme()

    const handleDeleteItem = async (id: string) => {
        // if (confirm('Are you sure you want to delete this item?')) {
        //     await axios.delete('/api/contributors/' + id)
        //     mutate()
        // }
    }

    const handleBulkDeleteItems = async () => {
        // if (confirm('Are you sure you want to delete these items?')) {
        //     for (let id of selectedItems) {
        //         await axios.delete('/api/contributors/' + id)
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
                    title="Contributors"
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
                            <TableCell>Name</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Social Media</TableCell>
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
                                            {item.name}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Avatar variant="rounded" alt="image" src={item.image_url} />
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            variant="body1"
                                            fontWeight="bold"
                                            color="text.primary"
                                            gutterBottom
                                            noWrap>
                                            <SocialMediaDisplay />
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

export default ContributorsTable
