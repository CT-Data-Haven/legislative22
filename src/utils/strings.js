import _ from 'lodash';
import { formatLocale } from 'd3-format';

// convert snakecase to title case
export const titleCase = (text) => {
    const words = _.words(text);
    const titleWords = words.map((word) => _.upperFirst(word));
    return titleWords.join(' ');
};

export const makeFormatter = (formatStr) => {
    const locale = formatLocale({
        decimal: '.',
        thousands: ',',
        grouping: [3],
        currency: ['$', ''],
        nan: 'N/A',
    });
    return locale.format(formatStr);
};

export const getFormatter = (meta, indicator) => {
    const m = _.find(meta, { indicator });
    return makeFormatter(m.format);
};

// replace multiple patterns in single string
const abbr = (x, max) => {
    // const max = 20;
    const patts = [/South/g];
    const repls = ['S.'];
    if (x.length > max) {
        return _.reduce(patts, (acc, patt, i) => {
            return _.replace(acc, patt, repls[i]);
        }, x);
    } else {
        return x;
    }
};

export const abbreviate = (max) => {
    return (x) => abbr(x, max);
};

export const wordsAnd = (x) => {
    // make array if not already one
    x = _.isArray(x) ? x : [x];
    if (x.length < 2) {
        return x[0];
    } else if (x.length === 2) {
        return x.join(' and ');
    } else {
        const last = _.last(x);
        const others = _.initial(x);
        return others.join(', ') + ', and ' + last;
    }
};

export const houseName = (district) => {
    const lookup = { U: 'Senate', L: 'House', upper: 'Senate', lower: 'House' };
    const [house, num] = _.split(district, /(?<=[A-Z])\B(?=\d)/);
    return [lookup[house], num];
};

export const districtCleanShort = (district) => {
    const [house, num] = houseName(district);
    return num ? `${house} ${_.parseInt(num)}` : district;
}

export const districtCleanLong = (district) => {
    const [house, num] = houseName(district);
    return num ? `State ${house} District ${_.parseInt(num)}` : district;
}


export const labelMember = (member, house) => {
    const titles = { upper: 'Sen', lower: 'Rep', U: 'Sen', L: 'Rep', Senate: 'Sen', House: 'Rep' };
    const title = titles[house];
    return `${title}. ${member.first_name} ${member.last_name} (${member.party})`;
};
