// Routes
const express = require('express'),
      cheerio = require('cheerio'),
      db = require('../models');
      axios = require('axios')


module.exports = function(app) {
app.get("/scrape", function(req, res) {
    axios.get("https://www.nytimes.com/section/us").then(function(response) {
      var $ = cheerio.load(response.data);
        $("article h2").each(function(i, element) {
        var result = {};
          result.title = $(this)
          .children("a")
          .text();
        result.link = $(this)
          .children("a")
          .attr("href");
  
        db.Article.create(result)
          .then(function(dbArticle) {
            console.log(dbArticle);
          })
          .catch(function(err) {
            console.log(err);
          });
      });
      res.send("Scraped");
    });
  });
  // Route for getting all Articles from the db
app.get("/articles", function(req, res) {
    // Grab every document in the Articles collection
    db.Article.find({})
      .then(function(dbArticle) {
        // If we were able to successfully find Articles, send them back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });


}
