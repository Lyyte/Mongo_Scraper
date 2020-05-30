// Dependencies
const express = require('express');
const bodyParser = require('body-parser'); 
const mongoose = require('mongoose'); 
const cheerio = require('cheerio'); 
const axios = require('axios')

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true })); 
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const PORT = process.env.PORT || process.argv[2] || 8080;

app.listen(PORT, function () {
    console.log(`http://localhost:${PORT}`); 
});