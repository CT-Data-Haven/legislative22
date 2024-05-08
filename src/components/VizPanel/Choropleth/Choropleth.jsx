import Box from '@mui/material/Box';
import { MapContainer } from 'react-leaflet/MapContainer';
import { TileLayer } from 'react-leaflet/TileLayer';
import { GeoJSON } from 'react-leaflet/GeoJSON';
import { LayerGroup } from 'react-leaflet/LayerGroup';
import Legend from '../Legend/Legend';

// following Nathan's lead of using inner & outer components to avoid using state
// since react-leaflet doesn't update geography on prop change
const baseStyles = {
    // weight: 0.5,
    // color: '#555',
    fillOpacity: 0.75,
};

const getStyle = (feature, district, data, colorscale) => {
    const name = feature.properties.name;
    const fillColor = data[name] ? colorscale(data[name]) : '#ccc';
    // const style = district === name ? hiliteStyles : baseStyles;
    const weight = district === name ? 1.5 : 0.5;
    const color = district === name ? 'black' : '#555';

    return {
        fillColor,
        weight,
        color,
        opacity: 1,
        ...baseStyles,
    };
};

const houseStyle = {
    fillColor: 'transparent',
    color: '#333',
    pointerEvents: 'none',
    weight: 1.5,
    fillOpacity: 0,
};

const featureHilite = ({ sourceTarget }) => {
    sourceTarget.setStyle({
        fillOpacity: 0.95,
        weight: 1,
    });
};

const featureUnhilite = ({ target }) => {
    target.setStyle(baseStyles);
};

const ChoroInner = ({
    layers,
    house,
    district,
    data,
    colorscale,
    makeTooltip,
    clickHandler,
    formatter,
    indicator
}) => {

    const handleFeature = (feature, layer) => {
        layer.bindTooltip(() => {
            return makeTooltip(data, feature.properties.name, formatter);
        }, {
            direction: 'top',
            offset: [0, -20],
            className: `custom-tip MuiPaper-elevation2`,
        });
    };

    return (
        <>
            <TileLayer
                key={`tile-${house}`}
                opacity={0.4}
                attribution='&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
                url="https://tiles.stadiamaps.com/tiles/stamen_toner_background/{z}/{x}/{y}{r}.png"
            />
            <LayerGroup key={`layers-${house}-${indicator}`}>
                <GeoJSON
                    key={`nhood-layer-${house}-${indicator}`}
                    data={layers.nhoods}
                    style={(feature) => getStyle(feature, district, data, colorscale)}
                    onEachFeature={handleFeature}
                    eventHandlers={{
                        click: (e) => clickHandler(e.sourceTarget.feature.properties.name),
                        mouseover: (e) => featureHilite(e),
                        mouseout: (e) => featureUnhilite(e),
                    }}
                />

                <GeoJSON
                    key={'merge-layer-${house}'}
                    data={layers.merged}
                    style={houseStyle}
                    interactive={false}
                />

            </LayerGroup>
        </>
    );
};

const Choropleth = ({
    data,
    layers,
    house,
    district,
    colorscale,
    indicator,
    formatter,
    bbox,
    makeTooltip,
    clickHandler,
}) => {
    // need everything to have house-indicator keys to force rerender
    return (
        <Box minHeight={400}>
            {layers ? (
                <MapContainer
                    id={`map-div-${house}-${indicator}`}
                    key={`map-key-${house}-${indicator}`}
                    bounds={bbox}
                    scrollWheelZoom={false}
                    style={{ height: '400px', }}
                    minZoom={8}
                    maxZoom={13}
                >
                    <ChoroInner
                        layers={layers}
                        house={house}
                        district={district}
                        data={data}
                        colorscale={colorscale}
                        makeTooltip={makeTooltip}
                        clickHandler={clickHandler}
                        formatter={formatter}
                        indicator={indicator}
                    />
                    <Legend colorscale={colorscale} formatter={formatter} />
                </MapContainer>
            ) : <div />}
        </Box>
    );
};

export default Choropleth;
