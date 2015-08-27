var express = require('express');
var exphbs  = require('express-handlebars');
var mysql = require('mysql'),
cookieParser = require('cookie-parser');
bodyParser = require('body-parser'),
myConnection = require('express-myconnection');
session = require('express-session');
var cookieSession =require('cookie-session');
//bcrypt = require('bcrypt');
 //var problems = require('./routes/Problems');
 //var user = require('./routes/user')
 var login = require('./routes/login')
// var Solution = require('./routes/solution');
 
 

 var dbOptions = {
   host: 'localhost',
   user: 'root',
   password: 'coder123',
   port: 3306,
   database: 'uberApp'
 };

 //dbOptions.connect();

   // create a route
var app = express();
app.use(express.static('public'));
app.use(myConnection(mysql, dbOptions, 'single'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({secret : 'coder123', resave : true, cookie: { maxAge: 60000 },saveUninitialized: true}))

var fs = require('fs');
var user = {};
var checkUser = function(req, res, next){
  if (req.session.username){
    return next();
    res.render("index",{layout: false})
  }
  else{// the user is not logged in redirect him to the login page
    res.redirect('/login');
  }
};

//user sign up
app.get("/signup", function(req, res){
  res.render("signup");

})

app.get("/signup", function(req, res){
  res.render("home");

})

app.get("/login", function(req, res){
  res.render("index", {layout: false});

})

app.post("/home", function(req, res){
  res.render("home");

})

app.post("/", function(req, res){
  res.render("index",{layout: false});

})

app.post("/index", function(req, res){
  res.render("index", {layout: false});

})

app.get("/demo", function(req, res){
  res.render("demo",{layout: false});

})

app.post("/index", function(req, res){
  res.render("demo");

});

app.post("/signup", function(req, res){
  res.render("index", {layout: false});

})
 app.post('/signup', login.signup);

app.get('/', function(req, res) {

    console.log(req.query.status);  

    res.render('login')
      
});app.post("/login", login.userLogin); 


app.use(login.userCheck);

app.get('/home', function(req, res) {
    res.render('home');
});

app.get('/index', function(req, res) {
    res.render('index');
});

app.get('/', function(req, res) {
    res.render('signup');
});


app.get('/logout', function(req, res){ 
     delete req.session.user
     res.redirect("/"); 
});

//app.get('/problemz', problems.ProblmCateg);

  app.get('/', function(req, res){  res.render('login', {layout: false})
 });

app.get('/logout', function(req, res){
  delete req.session.user;
  res.redirect('/login');
});


app.listen(5000);