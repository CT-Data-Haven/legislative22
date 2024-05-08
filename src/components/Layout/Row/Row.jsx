import React from "react";
import Grid from '@mui/material/Grid';

const Row = ({ children, xs, md }) => (
    <Grid container>
        {children.map((child, i) => (
            <Grid item key={i} xs={xs[+i] || xs} md={md[+i] || md}>
                {child}
            </Grid>
        ))}
    </Grid>
);

export default Row;