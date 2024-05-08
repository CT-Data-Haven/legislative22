import _ from 'lodash';
import { min, max, quantile } from 'simple-statistics';
import {
    titleCase,
    makeFormatter,
    districtCleanLong,
    houseName,
    labelMember,
    wordsAnd,
} from './strings';

// filter for indicators with type m
export const getMappable = (json) => {
    const indicators = json.indicators; // array of objects
    const mappable = indicators.filter((d) => d.type === 'm');
    return mappable.map((indicator) => indicator.indicator);
};

export const prepProfile = (data, district, meta) => {
    const districtData = _.chain(data)
        .find({ location: district })
        .omit(['level', 'location'])
        .value();
    return meta.map((indicator, i) => {
        const value = districtData[indicator.indicator];
        const fmt = makeFormatter(indicator.format);
        const valType = indicator.format === ',' ? 'count' : 'percent';
        return {
            id: i,
            indicator: indicator.display,
            value: fmt(value),
            type: valType,
        };
    });
};


export const prepTable = (data, meta) => {
    const columns = _.chain(data[0])
        .keys()
        .without('level')
        .map((key) => {
            const m = _.find(meta, { indicator: key }) || { indicator: key, display: titleCase(key) };
            // isNumeric is true if m.format is defined
            const isNumeric = m.format ? true : false;

            const col = {
                field: m.indicator,
                headerName: m.display,
                valueFormatter: isNumeric ? makeFormatter(m.format) : districtCleanLong,
                type: isNumeric ? 'number' : 'string',
                flex: 1,
                renderHeader: (params) => {
                    return (params.headerName)
                },
            };
            col.minWidth = m.indicator === 'location' ? 180 : 100;

            return col;
        })
        .value();
    const rows = _.chain(data)
        .map((d) => _.omit(d, 'level'))
        .map((d) => ({ id: d.location, ...d }))
        .value();
    return { columns, rows };
};

// order by indicator column descending
// filter for just district, state, highest, lowest
export const prepChart = (data, indicator, district) => {
    const values = _.chain(data)
        .reject({ location: 'Connecticut' })
        .map(indicator)
        .value();
    const subset = _.filter(data, (d) => d.location === 'Connecticut' || d.location === district);
    const quants = [
        { location: '25th percentile', [indicator]: quantile(values, 0.25) },
        { location: '75th percentile', [indicator]: quantile(values, 0.75) }
    ];

    const middle = _.chain(subset)
        .concat(quants)
        .sortBy([indicator])
        .reverse()
        .value();

    // order like this to make sure highest always on top, lowest always on bottom, even if tied with dist
    const df = [
        { location: 'Highest', [indicator]: max(values) },
        middle,
        { location: 'Lowest', [indicator]: min(values) },
    ];
    return _.flatten(df);
};

export const prepMap = (data, indicator) => {
    return _.chain(data)
        .filter((d) => _.endsWith(d.level, 'legis'))
        .keyBy('location')
        .mapValues(indicator)
        .value();
};

export const prepNotes = (notes, house) => {
    const dwSlug = notes.dwurls[house];
    // const geography = notes.geography[house];
    const sources = notes.sources;
    return {
        dwSlug,
        // geography, 
        sources
    };
};

// split into series for chart
export const splitSeries = (data, district) => {
    return _.partition(data, (d) => d.location === district);
};

export const getTableRows = (rows) => {
    const n = rows.length;
    let pages = [10];
    if (n > 25) {
        pages.push(25);
    }
    pages.push({ value: n, label: 'All' });
    return pages;
};


export const districtInfo = (member, district) => {
    if (!member) {
        return { district };
    } else {
        const [house, ] = houseName(district);
        const distLabel = districtCleanLong(district);
        const memberLabel = labelMember(member, house);

        const townsLabel = wordsAnd(member.towns);
        return {
            district: distLabel,
            member: memberLabel,
            towns: townsLabel,
            website: member.website,
            bills: member.bills,
        };
    }
};