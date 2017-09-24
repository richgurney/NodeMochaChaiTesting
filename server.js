var express       = require('express');
var path          = require('path');
var app           = express();
var bodyParser    = require('body-parser');
var mongoose      = require('mongoose'); // DB control program
var server        = require('http').createServer(app);
var port          = process.env.PORT || 3333;
var methodOVR     = require('method-override');
var ejsLayouts    = require('express-ejs-layouts');

//Database setup and connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/cars');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('DATABASE CONNECTED!!');
  db.dropDatabase();
});

// Layout manager
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.set('views', './views');

// Creates an absolute path to your public folder so you can run
// script from anywhere
app.use(express.static(path.join(__dirname,'public')));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
app.use(methodOVR('_method'))

// Setting up routes
var routes = require('./config/routes');
app.use(routes);

server.listen(port, function(){
  console.log('APP LISTENING');
});
