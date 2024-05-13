const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars').engine;
const path = require("node:path");
const app = express();
const routes = require('./routes');
const methodOverride = require('method-override');
const handlebarsHelpers = require(path.join(__dirname, 'app', 'helpers', 'handlebars-helpers'));

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
    defaultLayout: 'main',
    partialsDir: path.join(__dirname, 'resources', 'views', 'partials'),
    helpers: handlebarsHelpers,
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Route init
routes(app);

app.listen(process.env.PORT, () => {
    console.log(`App listening at http://localhost:` + process.env.PORT);
});
