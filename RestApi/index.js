var http = require("http");
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');

var connection = mysql.createConnection({
    host     : '127.0.0.1', //mysql database host name
    user     : 'root', //mysql database user name
    password : '', //mysql database password
    port:'3306',
    database : 'dbusers' //mysql database name
  });
  connection.connect(function(err) {
    if (err) throw err
    console.log('You are now connected...')
  });

  app.use( bodyParser.json() );       // to support JSON-encoded bodies
  app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
  }));

  var server = app.listen(3000, "127.0.0.1", function () {
    
      var host = server.address().address
      var port = server.address().port
    
      console.log("Your app listening at http://%s:%s", host, port)
    
    });
    app.get('/getAll', function (req, res) {
        console.log('hi');
         connection.query('select * from users', function (error, results, fields) {
            if (error) throw error;
           res.setHeader('Content-Type', 'application/json');
             //res.send(JSON.stringify(results));
            res.send({error:"false",data:results,message:"list of employees"});
          });
      });