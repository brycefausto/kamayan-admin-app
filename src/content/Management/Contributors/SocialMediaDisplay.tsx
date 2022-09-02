import { Grid } from '@mui/material'
import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TiktokIcon from '@/components/customIcons/TiktokLogo';

export default function SocialMediaDisplay() {
    return (
        <Grid container columns={10} width={150} >
            <Grid item xs={2}>
                <FacebookIcon sx={{ color: '#1B74E4' }} />
            </Grid>
            <Grid item xs={2}>
                <TwitterIcon sx={{ color: '#1DA1F2' }} />
            </Grid>
            <Grid item xs={2}>
                <InstagramIcon sx={{ color: '#262626' }} />
            </Grid>
            <Grid item xs={2}>
                <YouTubeIcon sx={{ color: '#FF0000' }} />
            </Grid>
            <Grid item xs={2}>
                <TiktokIcon />
            </Grid>
        </Grid>
    )
}
