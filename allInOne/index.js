var http=require("http");
var express=require('express');
var app=express();
var mysql=require("mysql");
var bodyparser=require("body-parser");
 
var connection=mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:"",
    port:"3306",
    database:"resort"
});

connection.connect(function(err){
    if(err)
        throw err
    console.log('you are now connected..!');
});
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended:true
}));
// creating app server
var server=app.listen(3000,"127.0.0.1",function(){
    var host=server.address().address;
    var port=server.address().port;
    console.log("your app listing at http://%s:%s",host,port);
});
//gettinh all books
app.get('/getAllBooks',function(){
    console.log("hi");
    connection.query("select * from books",(error,results,fields)=>{
        if(error)
            throw error;
        res.setHeader('Content-Type', 'application/json');
        
        res.send({error:"false",data:results,message:"list of Books"})
    });
});