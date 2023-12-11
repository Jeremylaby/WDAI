var express = require('express');
var router = express.Router();
var models = require("../db")
router.put('/:id', function(req, res, next) {
    models.PersonSchema.findByPk(req.params.id).then(person => {
        person.update(req.body).then(person => res.json({
            person
        }));
    })
});
module.exports = router;