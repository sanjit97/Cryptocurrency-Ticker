//jshint esversion:6
const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){
//  console.log(req.body.crypto);

var crypto=req.body.crypto;
var fiat=req.body.fiat;
var amount = req.body.amount;

//baseURL='https://apiv2.bitcoinaverage.com/indices/global/ticker/';
// finalURL=baseURL+crypto+fiat;

var options={
  url:'https://apiv2.bitcoinaverage.com/convert/global',
  method:"GET",
  qs:{
    from:crypto,
    to:fiat,
    amount:amount
  }

};

request(options, function (error, response, body) {
//  console.log('error:', error); // Print the error if one occurred
//  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  var data = JSON.parse(body);
  var lastPrice = data.price;
  var date= data.time;

  res.write("<p> The current date is "+date+" </p>");
  res.write("<h1> "+amount+" "+crypto+" currently costs  "+lastPrice+" "+fiat+" </h1>");
  res.send();
  // console.log(' Last Price:'+lastPrice); // Print the HTML for the Google homepage.
});
});

app.listen(3000,function(){
  console.log("Console is running on port 3000.");
});
