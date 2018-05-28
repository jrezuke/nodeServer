const express    = require('express');        // call express
const app        = express();                 // define our app using express
const bodyParser = require('body-parser');

const cors = require('cors');
const db = require('./pgDb');

var corsOptions = {
  origin: 'http://localhost',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}
app.use(cors(corsOptions))

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3200;        // set our port

var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('req method:', req.method);
    console.log('req url:', req.url);
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here
app.route('/todos')
    .get(function(req, res, ){
        db.any('select * from todo')
        .then(function(data){
            res.status(200).json({status: 'success', data: data})
        })
        .catch(function(err){
            console.log('error', err);
        });
    })
    .post(function(req, res, ){
        res.send('todos post');
    })

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/', router);

app.listen(port, function(){
    console.log("listening on port " + port);
})
