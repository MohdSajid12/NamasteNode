const express = require("express");
const  app = express();


//a route has many route handler like this
app.use("/user" ,(req,res,next)=>{
    // res.send("route handler 1");
    console.log("hello from the response 1");
    next();
},(req,res,next)=>{
    console.log("hello from the response 2");
    // res.send("hello from the response 2");
    next();
}, (req,res,next)=>{
    console.log("hello from the response 3");
    // res.send("hello from the response 3")
})

app.listen(7777,()=>{
    console.log(`server is listen at the port of ${7777}`)
})

