var express = require('express');
var exphbs  = require('express-handlebars');
var app = express();
bodyParser = require('body-parser');
    http = require('http');
    app = module.exports.app = express()
    io = require('socket.io')

    var server = http.createServer(app);
    var io = require('socket.io').listen(server);  //pass a http.Server instance
    server.listen(5002);  //


app.use(express.static('public'));
var users = {};
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/users', function(req, res){
  res.send(users);
});


io.sockets.on('connection', function(socket){
  //socket.broadcast.emit('hi');

  
  socket.on('chat message', function(msg){
     io.emit('chat message', msg);
       console.log('message: ' + msg);
  });
 

  socket.on('login', function(msg){

      console.log("username : " + msg.username);
      users[msg.username] = socket.id
      //msg.username
      socket.join(msg.username, function(err){
        console.log("joined : " + err)
      });

  });

  socket.on('msg-to', function(msg){

    try {

      console.log('send to : =' + msg.username + "=");
      console.log(msg.msg);

      //
      socket.in(msg.username).emit('too', msg.msg);

    }
    catch(e){
      console.log("error : " + e);
    }

    

  });

});

app.get("/signup", function(req, res){
  res.render("signup");

})

app.get("/back", function(req, res){
  res.render("index",{layout:false});

})

app.post("/signup", function(req, res){
  res.render("index",{layout: false});

})

app.get("/login", function(req, res){
  res.render("login", {layout: false});

})

app.post("/login", function(req, res){
  res.render("home");

})

app.get("/", function(req, res){
  res.render("login",{layout: false});

})

app.get("/devices", function(req, res){
  res.render("devices",{layout: false});

})

app.post("/", function(req, res){
  res.render("index",{layout: false});

})

app.get('/more',function(req,res){
	res.render("demo",{layout: false});
})

app.post("/home", function(req, res){
  res.render("home");

});

