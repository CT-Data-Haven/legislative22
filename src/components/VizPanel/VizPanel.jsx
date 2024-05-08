import React from "react";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Panel from '../Layout/Panel/Panel';
import Chart from './Chart/Chart';
import Choropleth from "./Choropleth/Choropleth";

const VizPanel = ({
    title,
    indicator,
    chartData,
    mapData,
    house,
    houseLbl,
    district,
    layers,
    bbox,
    views,
    view,
    viewChangeHandler,
    districtChangeHandler,
    formatter,
    formatDists,
    barColors,
    colorscale,
    districtIdx,
    makeTooltip,
}) => {
    const panelProps = {
        minHeight: 200,
        p: 2,
    };
    return (
        <Panel heading={title}>
            <TabContext value={view}>
                <TabList
                    onChange={viewChangeHandler}
                    aria-label="Tabs to change visualization type"
                    textColor="secondary"
                    selectionFollowsFocus
                >
                    {views.map((v) => (
                        <Tab
                            key={`view-tab-${v.value}`}
                            label={v.value}
                            value={v.value}
                            icon={v.icon}
                            iconPosition='start'
                            sx={{
                                fontWeight: 'bold',
                                '&.MuiTab-labelIcon': {
                                    minHeight: 'unset',
                                }
                            }}
                        />
                    ))}
                </TabList>
                <TabPanel value='map' sx={panelProps}>
                    <Choropleth
                        data={mapData}
                        layers={layers}
                        house={house}
                        district={district}
                        colorscale={colorscale}
                        indicator={indicator}
                        formatter={formatter}
                        bbox={bbox}
                        makeTooltip={makeTooltip}
                        clickHandler={districtChangeHandler}
                    />
                </TabPanel>
                <TabPanel value='chart' sx={panelProps}>
                    <Chart
                        data={chartData}
                        indicator={indicator}
                        formatter={formatter}
                        formatDists={formatDists}
                        colors={barColors}
                        houseLbl={houseLbl}
                        districtIdx={districtIdx}
                    />
                </TabPanel>
            </TabContext>
        </Panel>
    );
};

export default VizPanel;
