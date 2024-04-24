const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars').engine;
const path = require("node:path");
const app = express();
const port = 3000;

app.use(morgan('combined'));

// Template engine
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources/views'));

app.get('/', (req, res) => {
   return res.render('home');
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})
