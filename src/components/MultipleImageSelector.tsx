import AddPhotoAlternateTwoToneIcon from '@mui/icons-material/AddPhotoAlternateTwoTone'
import { Button, Grid } from '@mui/material'
import { styled } from '@mui/material/styles'

import { min } from 'lodash'
import { ChangeEvent, useState } from 'react'

const AvatarWrapper = styled('div')(
    ({ theme }) => `
      overflow: visible;
      display: inline-block;

      .MuiAvatar-root {
        width: ${theme.spacing(10)};
        height: ${theme.spacing(10)};
      }
  `,
)

export interface ImagesChangeHandler {
    (e: ChangeEvent<HTMLInputElement>, file: File[]): void
}

interface MultipleImageSelectorProps {
    name?: string
    value?: string
    onChange?: ImagesChangeHandler
    onBlur?: (e: ChangeEvent<HTMLInputElement>) => void
}

function joinFileNames(files: File[]) {
    let textDisplay = ''
    let limitFileCount = min([files.length, 3]) as number
    for (let i = 0; i < limitFileCount; i++) {
        textDisplay += files[i]?.name

        if (i < limitFileCount - 1) {
            textDisplay += ', '
        }
    }

    if (files.length > 3) {
        textDisplay += '...'
    }

    return textDisplay
}

export default function MultipleImageSelector({
    name,
    onChange,
    onBlur
}: MultipleImageSelectorProps) {
    const [textDisplay, setTextDisplay] = useState('')
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files as FileList)

        if (files.length) {
            setTextDisplay(joinFileNames(files))

            if (onChange) {
                onChange(event, files)
            }
        }
    }
    return (
        <AvatarWrapper>
            <Grid container>
                <Grid item xs={12}>
                    {textDisplay}
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        component="label"
                        endIcon={<AddPhotoAlternateTwoToneIcon />}
                        sx={{
                            mt: 1,
                        }}>
                        Select images
                        <input
                            hidden
                            accept="image/*"
                            id="icon-button-file"
                            type="file"
                            multiple
                            name={name || 'multiple-image-selector'}
                            onChange={handleChange}
                            onBlur={onBlur}
                        />
                    </Button>
                </Grid>
            </Grid>
        </AvatarWrapper>
    )
}
