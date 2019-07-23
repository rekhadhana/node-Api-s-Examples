var http=require("http");
var express=require("express");
var app=express();
var mysql=require("mysql");
var bodyParser=require('body-parser');

var connection=mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'',
    port:'3306',
    database:'cafeday'
});

connection.connect(function(err){
    if(err) throw err
        console.log('you are connected');
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));

var server=app.listen(3000,"127.0.0.1",function(){
   var host=server.address().address
   var port=server.address().port
   
    console.log('your app listening at http://%s:%s',host,port);
    
});

app.get('/getAllcafe',function(req,res){
    console.log("hi");
    connection.query("SELECT * FROM coffee",function(error,results,fields){
        if(error) throw error;
        res.setHeader('Content-Type', 'application/json');
        res.send({error:"false",data:results,message:"list of products"});

    });
})
