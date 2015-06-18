 var express = require('express');
 var app = express();
 var book = require('./books.js');






 app.get('/getAllBooks',function(req,res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-requested-With, Content-Type, Accept");


   console.log(book.getAllBooks());
   res.json(200,book.getAllBooks());
 });

 app.param('ID',function(res,req,next,value){
  console.log("ID : "+value);
  next();
 });

 app.get('/getBookName/:ID',function(req,res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-requested-With, Content-Type, Accept");

  var ID = req.params.ID;
  if(!(book.getBookNameByID(ID)))
    res.send(404,"Try Again - Choose different number");
  else {
   res.set("header", "bookName is displayed");
   console.log(book.getBookNameByID(ID));
   res.json(200,book.getBookNameByID(ID));
  }

 });
 app.param('NumOfstarsMonth',function(res,req,next,value){

  console.log("NumOfstarsMonth : "+value);
  next();
 });

 app.get('/getBestReviewsForMonth/:NumOfstarsMonth',function(req,res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-requested-With, Content-Type, Accept");

  var bookstars = req.params.NumOfstarsMonth;
  if((book.getBestReviewsForMonthByNumOfStars(bookstars).length)==0)
   res.send(404,"Try Again - Choose different number of stars review");
  else {
   res.set("header", "best star reviews books are displayed");
   console.log(book.getBestReviewsForMonthByNumOfStars(bookstars));
   res.json(200, book.getBestReviewsForMonthByNumOfStars(bookstars));

  }

 });

 app.get('*', function(req, res, next) {
  // An error occurs
  next(err);
 });
 app.use(function(err, req, res, next) {
  // Only handle `next(err)` calls
  res.send(404,"routh error");
 });




 app.listen(process.env.PORT || 3000);
 console.log("port 3000");