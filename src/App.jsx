import { useState } from 'react';
// helper functions
import {
    prepHouses,
    prepIndicators,
    prepTopics,
    getMappable,
    getDistricts,
    prepDistricts,
    prepProfile,
    prepTable,
    prepChart,
    prepMap,
    prepNotes,
    getTableRows,
    getFormatter,
    findDistrict,
    getBounds,
    makeGeoLayers,
    makeChoroScale,
    makeTooltip,
    districtInfo,
    districtCleanShort,
    houseName,
} from './utils';

// library components
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import MapIcon from '@mui/icons-material/Map';
import BarChartIcon from '@mui/icons-material/BarChart';

// styling
import 'leaflet/dist/leaflet';
import './App.scss'

// data
import fullData from './data/legis_wide_2022.json';
import fullNotes from './data/notes.json';
import members from './data/members.json';
import meta from './data/indicators.json';

// bespoke components
import Row from './components/Layout/Row/Row';
import ControlPanel from './components/ControlPanel/ControlPanel';
import Profile from './components/Profile/Profile';
import DataTable from './components/DataTable/DataTable';
import VizPanel from './components/VizPanel/VizPanel';
import Footer from './components/Layout/Footer/Footer';
import Header from './components/Layout/Header/Header';

import shapes from './data/shapes';

function App({ scheme }) {
    const theme = useTheme();

    const houses = Object.keys(fullData);
    const topics = Object.keys(meta);
    const views = [
        { value: 'map', icon: <MapIcon fontSize='small' /> },
        { value: 'chart', icon: <BarChartIcon fontSize='small' /> }
    ];

    // state
    const defaultPage = { pageSize: 10, page: 0 };
    const [house, setHouse] = useState(houses[0]);
    const [topic, setTopic] = useState(topics[0]);
    const [indicator, setIndicator] = useState(getMappable(meta[topic])[0]);
    const [view, setView] = useState(views[0].value);
    const [page, setPage] = useState(defaultPage);

    const data = fullData[house][topic];
    let districts = getDistricts(data);

    const notes = prepNotes(fullNotes, house);

    const [district, setDistrict] = useState(districts[0]);

    // menu options
    const [houseOptions,] = prepHouses(houses);
    const [topicOptions, topicLookup] = prepTopics(meta);
    const districtOptions = prepDistricts(districts);

    let [indicatorOptions, indicatorLookup] = prepIndicators(meta[topic]);
    let indicators = getMappable(meta[topic]);

    // event handling
    const handleHouse = (value) => {
        setHouse(value);
        districts = getDistricts(fullData[value][topic]);
        setDistrict(districts[0]);
        setPage(defaultPage);
    };

    // depends on city
    const handleDistrict = (value) => {
        setDistrict(value);
    };

    const handleTopic = (value) => {
        setTopic(value);
        indicators = getMappable(meta[value]);
        setIndicator(indicators[0]);
        setPage(defaultPage);
    };

    // depends on topic
    const handleIndicator = (value) => {
        setIndicator(value);
    };

    const handleView = (e, newValue) => {
        setView(newValue);
    };

    const controlProps = {
        location: [
            { key: 'house', items: houseOptions, label: 'Select a chamber', selected: house, changeHandler: handleHouse },
            { key: 'district', items: districtOptions, label: 'Select a district / location to highlight', selected: district, changeHandler: handleDistrict }
        ],
        topic: [
            { key: 'topic', items: topicOptions, label: 'Select a topic', selected: topic, changeHandler: handleTopic },
            { key: 'indicator', items: indicatorOptions, label: 'Select an indicator', selected: indicator, changeHandler: handleIndicator }
        ]
    };

    const chartData = prepChart(data, indicator, district);
    const mapData = prepMap(data, indicator);
    const districtIdx = findDistrict(chartData, district);

    const barColors = {
        base: theme.palette.grey[500],
        hilite: theme.palette.primary.main,
    };

    const member = district === 'Connecticut' ? null : members[house][district];
    const distInfo = districtInfo(member, district);

    return (
        <div className='App'>
            <Container fixed>

                <Header heading={`Connecticut State Legislative District Profiles`} />

                <ControlPanel controlGrps={controlProps} />

                <Row xs={12} md={[7, 5]}>
                    <VizPanel
                        title={indicatorLookup[indicator]}
                        indicator={indicator}
                        chartData={chartData}
                        mapData={mapData}
                        house={house}
                        houseLbl={houseName(house)[0]}
                        district={district}
                        layers={makeGeoLayers(shapes[house])}
                        bbox={getBounds(shapes[house])}
                        views={views}
                        view={view}
                        viewChangeHandler={handleView}
                        districtChangeHandler={handleDistrict}
                        formatter={getFormatter(meta[topic].indicators, indicator)}
                        formatDists={districtCleanShort}
                        barColors={barColors}
                        colorscale={makeChoroScale(mapData, scheme)}
                        districtIdx={districtIdx}
                        makeTooltip={makeTooltip}
                    />
                    <Profile
                        topic={topicLookup[topic]}
                        distInfo={distInfo}
                        data={prepProfile(data, district, meta[topic].indicators)}
                    />
                </Row>
                <DataTable
                    topic={topicLookup[topic]}
                    district={district}
                    data={prepTable(data, meta[topic].indicators)}
                    pages={getTableRows(data)}
                    paginationModel={page}
                    pageChangeHandler={setPage}
                    districtChangeHandler={handleDistrict}
                />

                <Footer
                    house={house}
                    dwBase={'https://data.world/ctdatahaven/datahaven-profiles-2022'}
                    ghBase={'https://github.com/CT-Data-Haven/legis_profile_data22/blob/main/to_distro'}
                    csvFn={`${house}_legis_2022_acs_health_comb.csv`}
                    {...notes}
                />
            </Container>
        </div>
    );
}

export default App
