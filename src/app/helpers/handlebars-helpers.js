// Sum two numbers
const sum = (a, b) => a + b;

// Format date time
const formatDateTime = (date) => {
    if (!date) {
        return '';
    }
    return date.toLocaleString();
};

// Compare two values for greater than
const greater = (a, b) => {
    return a > b;
};

// Compare two values for equality
const equal = (a, b) => {
    return a === b;
};

//sortMiddleware
const sortable = (field, sort) => {
    const sortType = field === sort.sort ? sort.order : 'default';
    const icons = {
        default: 'fa fa-sort',
        asc: 'fa fa-sort-alpha-down',
        desc: 'fa fa-sort-alpha-up',
    };
    const types = {
        default: 'desc',
        asc: 'desc',
        desc: 'asc',
    };
    const icon = icons[sortType];
    const type = types[sortType];
    return `<a href="?_sort=${field}&order=${type}">
        <span class="${icon}"></span>
    </a>`;

}

module.exports = {
    sum,
    formatDateTime,
    greater,
    equal,
    sortable,
};
