import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

const Tooltip = ({ axis, axisData, series }) => {
    const idx = axisData.y.index;
    const value = series[0].data[idx];
    const loc = axisData.y.value;
    const locLbl = axis.valueFormatter(loc);
    const formatter = series[0].valueFormatter;

    return (
        <Stack
            sx={{
                p: 1,
                ml: 2,
                fontFamily: 'Barlow Semi Condensed',
                fontSize: 13,
            }}
            elevation={2}
            component={Paper}
            direction='row'
            spacing={1}
        >
            <Box>{locLbl}: </Box>
            <Box sx={{ fontWeight: 'bold', }}>{formatter(value)}</Box>
        </Stack>
    );
};

export default Tooltip;