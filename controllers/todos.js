var express = require('express');
var router = express.Router();
const db = require('../pgDb');
// Home page route.
router.get('/', function (req, res) {
    db.any('select * from todo')
    .then(function(data){
        res.status(200).json({status: 'success', data: data})
    })
    .catch(function(err){
        console.log('error', err);
    });
});

router.post('/new', function(req, res, next){
    
    let sql = 'INSERT INTO todo(id, title, started, completed, archived)';
    let values = 'VALUES(nextval(\'todo_id_seq\'), $1, $2, null, null) RETURNING id';
    
    db.one(sql + values, [req.body.title, req.body.started])
        .then(data => {
            console.log(data.id);
            res.status(200)
                  .json({
                    status: 'success',
                    id: data.id
                  });
              })
              .catch(function (err) {
                return next(err);
              });
    
})

// About page route.
router.get('/about', function (req, res) {
  res.send('About these todos');
})

module.exports = router;