import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import Typography from '@mui/material/Typography';
import Tooltip from '../Tooltip/Tooltip';

// coloring happens across series array but that's a weird way to shape this data
// instead get the index of nhood within the series, then use css to color
const Chart = ({
    data,
    indicator,
    formatter,
    formatDists,
    colors,
    districtIdx,
    houseLbl,
}) => {

    const hiliteKey = `& .MuiBarElement-root:nth-of-type(${districtIdx})`;

    return (
        <>
            <BarChart
                dataset={data}
                series={[{
                    dataKey: indicator,
                    valueFormatter: formatter,
                }]}
                xAxis={[{
                    id: 'value',
                    valueFormatter: formatter,
                    tickNumber: 5,
                }]}
                yAxis={[{
                    id: 'location',
                    dataKey: 'location',
                    scaleType: 'band',
                    valueFormatter: formatDists,
                }]}
                leftAxis={{
                    axisId: 'location',
                    tickFontSize: 13,
                    tickLabelStyle: { fontFamily: 'Barlow Semi Condensed' },
                    disableTicks: true,
                }}
                layout="horizontal"
                sx={{
                    width: '100%',
                    '& .MuiBarElement-root:hover': {
                        stroke: 'black',
                        strokeWidth: 1,
                    },
                    '& .MuiBarElement-root': {
                        fill: colors.base,
                        transitionDuration: '0.1s',
                    },
                    [hiliteKey]: {
                        fill: colors.hilite
                    },

                }}
                height={380}
                margin={{ top: 10, right: 20, bottom: 30, left: 90 }}
                grid={{ vertical: true }}
                tooltip={{ trigger: 'axis' }}
                slots={{
                    axisContent: Tooltip,
                }}
            />
            <Typography variant='caption' as='div'>
                {`With lowest, 25th percentile, 75th percentile, and highest CT ${houseLbl} district values`}
            </Typography>
        </>
    );
};

export default Chart;
