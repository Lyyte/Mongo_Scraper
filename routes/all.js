// Routes
const express = require('express'),
      cheerio = require('cheerio'),
      db = require('../models'),
      axios = require('axios');

module.exports = function(app) {
app.get('/scrape', function(req, res) {
    axios.get('https://www.nytimes.com/section/us').then(function(response) {
      var $ = cheerio.load(response.data);
        $('article h2').each(function(i, element) {
        var result = {};
          result.title = $(this)
          .children('a')
          .text();
        result.link = $(this)
          .children('a')
          .attr('href');
  
        db.Article.create(result)
          .then(function(dbArticle) {
            console.log(dbArticle);
          })
          .catch(function(err) {
            console.log(err);
          });
      });
      res.send('Scraped');
    });
  });

app.get('/articles', function(req, res) {
    db.Article.find({})
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

app.get('/articles/:id', function(req, res) {
  db.Article.findOne({ _id: req.params.id})
    .populate('Note')
    .then(function(dbArticle){
      res.json (dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.post('/articles/:id', function(req, res){
  db.Note.create(req.body)
  .then(function(dbNote){
    return db.Article.findOneAndUpdate({}, {$push: {_id: req.params.id}}, {note: dbNote._id}, {new: true});
  })
  .then(function(dbArticle) {
    res.json(dbArticle);
  })
  .catch(function(err){
    res.json(err);
  });
});

app.get('/notes/:id', function(req, res){
  db.Note.find({_id: req.parms.id})
  .then(function(dbNote) {
    res.json(dbNote);
  })
  .catch(function(err){
    res.json(err);
  });
});

}
