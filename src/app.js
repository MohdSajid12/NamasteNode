const express = require("express");
const  app = express();

//always use try catch because it handles everything
//routes handles every call one by one
app.use("/",(err,req,res,next)=>{
    if(err)
    {
        res.status(500).send("something went wrong");
    }
})
 
app.get("/getUserData" ,(req,res)=>{
    //   res.send("user has passed ")
    try{
    //   throw new Error("dddsd");
      res.send("user data has been sent");
    }
    catch(err)
    {
        res.status(401).send("hello something went wrong");
    }  
})
 

//first of all when request is call it will app.use("/") if any error dont occur then we will move ahead
// if any error occurs then we will not move ahead
//if will use at the end
app.use("/",(err,req,res,next)=>{
 
    if(err)
    {
        res.status(500).send("something went wrong");
    }
 
})
 
app.get("/admin/getAllData" , (req,res)=>{
    res.send("catching all the user data");
})

 
 
app.listen(7777,()=>{
    console.log(`server is listening at the port of ${7777}`)
})
