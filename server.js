// Dependencies
const express = require('express');
const bodyParser = require('body-parser'); 
const mongoose = require('mongoose'); 
const cheerio = require('cheerio'); 
const axios = require('axios');
const logger = require('morgan');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true })); 
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(logger("dev"));
app.use(express.json());

const db = require('./models')

const PORT = process.env.PORT || process.argv[2] || 8080;

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/Scraper", { useNewUrlParser: true });

require('./routes/all.js')(app)

app.listen(PORT, function () {
    console.log(`http://localhost:${PORT}`); 
});