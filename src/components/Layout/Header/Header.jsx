import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

const Header = ({ heading }) => (
    <Box sx={{ p: 1 }}>
        <Typography variant='h1'>{heading}</Typography>
        <Alert severity='info' icon={false}>
            Select a topic and indicator to view the map. Clicking a district on the map or table, or selecting it in the district menu, will bring up detailed information on that district. See all districts in the table below, or download data at bottom.
        </Alert>
    </Box>
);

export default Header;
