import React from 'react';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Panel from '../Layout/Panel/Panel';

const Control = ({
    items,
    label,
    selected,
    changeHandler,
    id,
}) => (
    <FormControl fullWidth variant='filled'>
        <InputLabel id={`${id}-select-label`}>{label}</InputLabel>
        <Select
            labelId={`${id}-select-label`}
            id={`${id}-select`}
            value={selected}
            label={label}
            onChange={(e) => changeHandler(e.target.value)}
        >
            {items.map((d) => <MenuItem key={d.value} value={d.value}>{d.label}</MenuItem>)}
        </Select>
    </FormControl>
);

const ControlRow = ({ controls }) => (
    controls.map(({ key, items, label, selected, changeHandler }) => (
        <Grid item xs={12} md={6} key={`controlgrid-${key}`}>
            <Control
                key={`control-${key}`}
                id={key}
                items={items}
                label={label}
                selected={selected}
                changeHandler={changeHandler}
            />
        </Grid>
    )
    )
);


const ControlPanel = ({ controlGrps }) => (
    <Panel>
        <Grid container columnSpacing={2} rowSpacing={2}>
            <ControlRow controls={controlGrps.location} />
            <ControlRow controls={controlGrps.topic} />
        </Grid>
    </Panel>
);

export default ControlPanel;
