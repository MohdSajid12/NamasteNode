const express = require("express");
const  app = express();


app.get("/user",(req,res,next)=>{
    //  res.send("hello from the second response");
    console.log("hello chechikng")
     next();
})    
 
app.get("/user" ,(req,res,next)=>{
    console.log("this is the first response");
    next();
})    
 
 
// how express works
// basically a request comes to express js servers the job of expressJS server is to go one by one
// and goes from the top to bottom to all the handlers and all the app.function and try to send the response back if
// it does not fine matching url if he does not able the send the response back it just will hang thats how express works
 
//GET users => middleware chain  => response handle request

app.listen(7777,()=>{
    console.log(`server is listen at the port of ${7777}`)
})

