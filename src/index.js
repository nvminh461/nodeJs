const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars').engine;
const path = require("node:path");
const app = express();
const port = 3000;
const routes = require('./routes');

// Static file
app.use(express.static(path.join(__dirname, 'public')));

// Body parser
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());

// HTTP logger
app.use(morgan('combined'));

// Template engine
app.engine('hbs', handlebars({
    extname: '.hbs',
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));
//Home, search, contact

// Route init
routes(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
