import { WEBSITE, WEBSITE_LINK } from '@/config';
import { Link, Typography } from '@mui/material';

function CopyrightDetails(props: any) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href={WEBSITE_LINK}>
          {WEBSITE}
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

export default CopyrightDetails;
