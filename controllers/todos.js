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

router.post('/new', function(req, res){
    console.log(`req.body: ${req.body.test}`);
    db.none('insert into todo(id, title, started, completed, archived) ' +
            `values( "nextval('todo_id_seq'"), "test", "", "", "", "")`)
    res.send('added new todo');
})

// About page route.
router.get('/about', function (req, res) {
  res.send('About these todos');
})

module.exports = router;