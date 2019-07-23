var http = require("http");
var express = require('express');
var app = express();
var mysql      = require('mysql');
var bodyParser = require('body-parser');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);


//start mysql connection
var connection = mysql.createConnection({
  host     : '127.0.0.1', //mysql database host name
  user     : 'root', //mysql database user name
  password : '', //mysql database password
  port:'3306',
  database : 'expenses' //mysql database name
});


var sessionStore = new MySQLStore(connection);

app.use(session({
   key: 'login',
   secret: '123abbc',
   store: sessionStore,
   resave: false,
   saveUninitialized: false
}));
/*verifyin the db connection*/
connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')
});

//start body-parser configuration
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
//end body-parser configuration
//create app server
var server = app.listen(3000,"127.0.0.1", function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Your app listening at http://%s:%s", host, port)

});

app.get('/getAll', function (req, res) {
    console.log('hi');
    // SELECT p.id,p.pname,p.style,p.imagePath,p.amount,p.colour,p.qty,s.small,s.medium ,s.large,s.extralarge,s.extrasmall FROM products p LEFT JOIN size s on p.id=s.proId
    
//SELECT p.id,p.pname,p.style,p.imagePath,p.amount,p.colour,p.qty,s.size FROM products p INNER JOIN sizes s on p.id=s.Id
// SELECT p.id,p.pname,p.style,p.imagePath,p.amount,p.colour,p.qty,s.size FROM products p INNER JOIN sizes s on p.id=s.Id
   
     connection.query("SELECT * FROM expense",function (error, results, fields) {
        if (error) throw error;
       res.setHeader('Content-Type', 'application/json');
         //res.send(JSON.stringify(results));
        res.send({error:"false",data:results,message:"list of expenses"});
      });
  });
  app.get('/getLoginDetails',function(req,res){
      connection.query("SELECT * FROM Login",function(error,results,fields){
          if(error) throw error;
          res.setHeader('Content-Type','application/json');
          res.send({error:"false",data:results,message:"login details"})
      })
  })
app.post("/login",function(req,res){
    req.session.userid=req.body.userid;
    req.session.password=req.body.password;
    res.end("done");
})