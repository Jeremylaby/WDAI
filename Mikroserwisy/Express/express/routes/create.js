var express = require('express');
var router = express.Router();
var models = require("../db")
router.post('/', function(req, res, next) {
    models.PersonSchema.create(req.body).then(person => res.json({
        person
    }))
});
module.exports = router;