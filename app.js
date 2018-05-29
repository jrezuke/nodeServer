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

var todos = require('./controllers/todos');
app.use('/todos', todos);



// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
var router = express.Router();
app.use('/', router);

app.listen(port, function(){
    console.log("listening on port " + port);
})
