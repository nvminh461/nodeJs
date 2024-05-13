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

module.exports = {
    sum,
    formatDateTime,
    greater,
    equal,
};
