import { Alert, Snackbar } from '@mui/material'
import { PropsWithChildren, useState } from 'react'
import {
    AlertOptions,
    AlertTemplateProps,
    positions,
    Provider,
    transitions,
} from 'react-alert'

const options: AlertOptions = {
    position: positions.TOP_CENTER,
    timeout: 2000,
    offset: '30px',
    transition: transitions.SCALE,
}

export function AlertTemplate({
    style,
    options,
    message,
    close,
}: AlertTemplateProps) {
    const [open, setOpen] = useState(true)
    const handleClose = (_e: any) => {
        close()
        setOpen(false)
    }

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open}
            onClose={handleClose}
            key="alert"
            style={style}>
            <Alert
                onClose={handleClose}
                severity={options.type}
                sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    )
}

export function AlertProvider({ children }: PropsWithChildren) {
    return (
        <Provider template={AlertTemplate} {...options}>
            {children}
        </Provider>
    )
}
