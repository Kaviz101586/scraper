var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./../models");

module.exports = function(app) {

  app.get("/", function(req,res) {
    res.render("index",{})
  })
  
  app.get("/view", function(req, res) {
    let responseObj = {};
    db.Article.find({})
        .populate("notes")
        .then(function(populated) {
        responseObj.articles = populated;
        res.render("index",responseObj);
      })
        .catch(function(err) {
        res.json(err);
        });
    });

  app.get("/scrape", function (req, res) {
    axios.get("https://hbr.org/").then(function (response) {
      var $ = cheerio.load(response.data);

    $("stream-item").each(function (i, element) {
        var result = {};
  
        result.title = $(this).attr('data-title')
        result.url = $(this).attr('data-url')
        result.summary = $(this).attr('data-summary')
  
        db.Article.create(result)
          .then(function (populated) {
            console.log(populated);
          })
          .catch(function (err) {
            console.log(err);
          });
      });
  
          res.send("Scrape Complete");
        });
    });

}