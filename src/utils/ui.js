import _ from 'lodash';
import { districtCleanLong } from './strings';

// houses come in in snakecase---convert to title for label
export const prepHouses = (houses) => {
    const lookup = { upper: 'Upper chamber (State Senate)', lower: 'Lower chamber (State House)' };
    // const options = houses.map((house) => ({ label: titleCase(house), value: house }));
    const options = houses.map((house) => ({ label: lookup[house], value: house }));
    return [options, lookup];
};

// topics come in json with snakecase key, display string, list of indicators
// return array of objects for selectItems
export const prepTopics = (json) => {
    const topics = _.keys(json);
    const labels = topics.map((topic) => json[topic].display);
    const options = topics.map((topic) => ({ label: json[topic].display, value: topic }));
    const lookup = _.zipObject(topics, labels);
    return [options, lookup];
};


export const prepDistricts = (districts) => {
    // return districts.map((district) => ({ label: district, value: district }));
    return _.chain(districts)
        .map((district) => ({ label: districtCleanLong(district), value: district }))
        .sortBy('value')
        .value();
};

// similar to topics. indicators in 'indicators' slot
// pass e.g. indicators['age']
// return array of objects for selectItems
export const prepIndicators = (json) => {
    const indicators = json.indicators; // array of objects
    const mappable = indicators.filter((d) => d.type === 'm');
    const labels = _.map(mappable, 'display');
    const values = _.map(mappable, 'indicator');
    const options = mappable.map((indicator) => ({ label: indicator.display, value: indicator.indicator }));
    const lookup = _.zipObject(values, labels);
    return [options, lookup];
};

export const getDistricts = (data) => {
    return _.chain(data)
        // .reject({ level: 'state' })
        .map('location')
        .uniq()
        .value();
};

export const findDistrict = (data, district) => {
    return _.findIndex(data, { location: district }) + 1;
};