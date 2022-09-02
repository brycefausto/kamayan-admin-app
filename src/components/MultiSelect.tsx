import { CircularProgress } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { ChangeEvent, Fragment, useEffect, useState } from 'react'

interface MultiSelectProps {
    label: string
    value?: string[]
    onChange?: {
        (e: ChangeEvent<any>, value: string[]): void
    }
    asyncOptions?: {
        (): Promise<string[]>
    }
}

export default function MultiSelect({
    label,
    value,
    onChange,
    asyncOptions,
}: MultiSelectProps) {
    const [open, setOpen] = useState(false)
    const [options, setOptions] = useState<readonly string[]>([])
    const loading = open && options.length === 0

    useEffect(() => {
        let active = true

        if (!loading) {
            return undefined
        }

        if (asyncOptions) {
            ;(async () => {
                let data = await asyncOptions()

                if (active) {
                    setOptions([...data])
                }
            })()
        }

        return () => {
            active = false
        }
    }, [asyncOptions, loading])

    useEffect(() => {
        if (!open) {
            setOptions([])
        }
    }, [open])

    return (
        <Autocomplete
            multiple
            limitTags={3}
            id="multiSelect"
            open={open}
            onOpen={() => {
                setOpen(true)
            }}
            onClose={() => {
                setOpen(false)
            }}
            options={options}
            loading={loading}
            value={value}
            onChange={onChange}
            renderInput={params => (
                <TextField
                    {...params}
                    label={label}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <Fragment>
                                {loading ? (
                                    <CircularProgress
                                        color="inherit"
                                        size={20}
                                        sx={{ m: 1 }}
                                    />
                                ) : null}
                                {params.InputProps.endAdornment}
                            </Fragment>
                        ),
                    }}
                />
            )}
            sx={{ width: '500px' }}
        />
    )
}
