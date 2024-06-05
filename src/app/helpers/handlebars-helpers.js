const Handlebars = require('handlebars');
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
const sortable = (field, sort, path = null) => {
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
    console.log(path)
    const href = path ? `${path}?_sort=${field}&order=${type}` : `?_sort=${field}&order=${type}`;
    const html = `<a href="${href}">
        <span class="${icon}"></span>
    </a>`;

    return new Handlebars.SafeString(html);
}

// Menu render
const renderMenu = (menus) => {
    let result = '';
    for (let i = 0; i < menus.length; i++) {
        const menu = menus[i];
        result += `<li class="nav-item">
            <a href="${menu.path}" class="nav-link" id="${menu.id}">
                <i class="nav-icon ${menu.icon}"></i>
                <p>${menu.name}</p>`
        if (menu.subMenus) {
            result += `<i class="fas fa-angle-left right"></i>`
        }
        result += `</a>`;
        if (menu.subMenus) {
            result += `<ul class="nav nav-treeview">${renderMenu(menu.subMenus)}</ul>`;
        }
        result += '</li>';
    }
    return new Handlebars.SafeString(result);
};

const parseJson = (json) => {
    console.log(json, JSON.parse(json))
    return JSON.parse(json);
}

module.exports = {
    sum,
    formatDateTime,
    greater,
    equal,
    sortable,
    renderMenu,
    parseJson,
};
