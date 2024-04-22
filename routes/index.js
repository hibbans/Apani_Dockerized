var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
   res.status(200).render('index', { title: 'Express' });
});

router.get('/index', (req, res) => {
    res.status(200).json({    
    message: 'ok' 
    });
});

module.exports = router;
