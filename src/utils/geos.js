import _ from 'lodash';
import { bbox, feature, mesh, merge } from 'topojson-client';
import { scaleQuantile, } from 'd3-scale';
import { districtCleanShort } from './strings';

export const getBounds = (geo) => {
    const b = bbox(geo);
    return [[b[1], b[0]], [b[3], b[2]]];
};

export const makeGeoLayers = (shp) => {
    const cityName = Object.keys(shp.objects)[0];
    const nhoods = feature(shp, shp.objects[cityName]);
    const meshed = mesh(shp, shp.objects[cityName], (a, b) => a.town !== b.town);
    const merged = merge(shp, shp.objects[cityName].geometries);
    return { nhoods, meshed, merged };
};

const quantBreaks = (data) => {
    // decide how many breaks to use depending on number of unique values
    const unique = _.uniq(data);
    const n = unique.length || 5;
    return n < 5 ? 3 : 5;
};

export const makeChoroScale = (data, scheme) => {
    const vals = _.values(data);
    const nBrks = quantBreaks(vals);
    const palette = scheme[nBrks];
    return scaleQuantile()
        .domain([_.min(vals), _.max(vals)])
        .range(palette)
        .unknown('#ddd');
};

export const makeTooltip = (data, district, formatter) => {
    const label = districtCleanShort(district);
    return `${label}: <strong>${formatter(data[district])}</strong>`;
};