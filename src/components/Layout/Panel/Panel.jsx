import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const Panel = (props) => {
    const headings = props.headings || [props.heading] || []; // Add null check and initialize as empty array
    // const levels = props.hLevels || props.hLevel || ['h2']; // not sure why this doesn't work
    let levels;
    if (props.hLevels) {
        levels = props.hLevels;
    } else if (props.hLevel) {
        levels = [props.hLevel];
    } else {
        levels = ['h2'];
    }

    const headingElems = headings.map((heading, i) => (
        <Typography
            variant={levels[i]}
            sx={{
                m: 1,
            }}
            key={i}
        >
            {heading}
        </Typography>
    ));

    const footerElem = props.footer ? (
        <Typography
            variant='caption'
            as='div'
        >
            {props.footer}
        </Typography>
    ) : null;
    return (
        <Paper
            variant='outlined'
            sx={{
                p: 1,
                m: 1,
                ...props.sx
            }}
        // {...props}
        >
            {headingElems}

            {props.children}

            {footerElem}
        </Paper>
    )
};

export default Panel;
