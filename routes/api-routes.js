var db = require("./../models");

module.exports = function(app) {
    
    app.get("/articles/:id", function(req, res) {
    db.Article.findOne({ _id: req.params.id })
        .populate("notes")
        .then(function(populated) {
        res.json(populated);
        })
        .catch(function(err) {
        res.json(err);
        });
    });

    app.post("/articles/:id", function(req, res) {
    db.Comment.create(req.body)
        .then(function(dbComment) {
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { $push: {comment: dbComment._id }} , { new: true });
        })
        .then(function(populated) {
        res.json(populated);
        })
        .catch(function(err) {
        res.json(err);
        });
    });


    app.delete("/articles/:id", function(req, res) {
        var thisId = req.params.id
        db.Comment.findOneAndDelete({_id: thisId})
        .then(function(dbComment) {
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { $pull: {comment: dbComment._id }}, { new: true });
        })
        .then(function(populated) {
            res.json(populated);
        })
        .catch(function(err) {
            res.json(err);
        });
    });

}