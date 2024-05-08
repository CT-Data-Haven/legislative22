import React from 'react';
import Paper from '@mui/material/Paper';
import { LegendThreshold } from '@visx/legend';

const Legend = ({ colorscale, formatter }) => (
    <Paper
        variant='outlined'
        sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            zIndex: 1000,
            m: 1,
            p: 1 / 2,
            fontFamily: 'Barlow, sans-serif',
        }}>
        <LegendThreshold
            scale={colorscale}
            labelFormat={formatter}
            labelAlign='right'
        />
    </Paper>
);

export default Legend;
