var express = require('express');
var router = express.Router();

router.get('/:name', function(req,
                              res, next) {
    const name = req.params.name;
    res.status(200).json({
        message: `no siema ${name}, robimy mikroserwis w Expressie`
        // message: `Nie wymagam od was niewiadomo czego - G. Rogus`
    });
});

module.exports = router;
