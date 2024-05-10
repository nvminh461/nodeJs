const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars').engine;
const path = require("node:path");
const app = express();
const port = 3000;
const routes = require('./routes');
const methodOverride = require('method-override');

// Static file
app.use(express.static(path.join(__dirname, 'public')));

// Body parser
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());

// Method override
app.use(methodOverride('_method'));

// HTTP logger
app.use(morgan('combined'));

// Template engine
app.engine('hbs', handlebars({
    extname: '.hbs',
    helpers: {
        sum: (a, b) => a + b,
        //format date time
        formatDateTime: (date) => {
            if (!date) {
                return '';
            }
            return date.toLocaleString();
        },
        //Greater comparison
        greater: (a, b) => {
            if (a > b) {
                return true;
            }
        },
    },
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));
//Home, search, contact

// Route init
routes(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
