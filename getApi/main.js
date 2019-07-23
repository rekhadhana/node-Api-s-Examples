/*Importing the modules*/
var http = require("http");
var express = require('express');
var app = express();
var mysql      = require('mysql');
var bodyParser = require('body-parser');

//start mysql connection
var connection = mysql.createConnection({
  host     : '127.0.0.1', //mysql database host name
  user     : 'root', //mysql database user name
  password : '', //mysql database password
  port:'3306',
  database : 'rcni' //mysql database name
});

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
var server = app.listen(3000,  "127.0.0.1", function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Your app listening at http://%s:%s", host, port)

});

/*Writing the rest apis*/
//rest api to get all results
app.get('/getAll', function (req, res) {
  console.log('hi');
   connection.query('select * from department', function (error, results, fields) {
	  if (error) throw error;
     res.setHeader('Content-Type', 'application/json');
	   //res.send(JSON.stringify(results));
      res.send({error:"false",data:results,message:"list of employees"});
	});
});
