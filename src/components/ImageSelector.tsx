import AddPhotoAlternateTwoToneIcon from '@mui/icons-material/AddPhotoAlternateTwoTone'
import {
    Avatar, Button, Grid
} from '@mui/material'
import { styled } from '@mui/material/styles'

import { InsertPhoto } from '@mui/icons-material'
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

export interface ImageChangeHandler {
    (e: ChangeEvent<HTMLInputElement>, value: File): void
}

interface ImageSelectorProps {
    value?: string
    onChange?: ImageChangeHandler
}


export default function ImageSelector({ value, onChange }: ImageSelectorProps) {
    const [image, setImage] = useState('' || value)
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files

        if (files && files.length) {
            const file = files[0]
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onloadend = function (_e) {
                setImage(reader.result as string)
            }

            if (onChange) {
                onChange(event, file)
            }
        }
    }
    return (
        <AvatarWrapper>
            <Grid container>
                <Grid item xs={6}>
                    <Avatar variant="rounded" alt="upload" src={image} sx={{ minWidth: 150, minHeight: 150, mr: 2 }}>
                        <InsertPhoto />
                    </Avatar>
                </Grid>
                <Grid item xs={6}>
                    <Button
                        variant="contained"
                        component="label"
                        endIcon={<AddPhotoAlternateTwoToneIcon />}
                        sx={{
                            mt: 5
                        }}>
                        Select an image
                        <input
                            hidden
                            accept="image/*"
                            id="icon-button-file"
                            name="icon-button-file"
                            type="file"
                            onChange={handleChange}
                        />
                    </Button>
                </Grid>
            </Grid>
        </AvatarWrapper>
    )
}
