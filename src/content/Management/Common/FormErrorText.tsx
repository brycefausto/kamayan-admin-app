import { FormHelperText } from '@mui/material'
import React from 'react'

export default function FormErrorText({ children }: React.PropsWithChildren) {
  return (
    <>
        {children && <FormHelperText error>{children}</FormHelperText>}
    </>
  )
}
