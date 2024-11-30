const express = require("express");
const  app = express();
const connectDb = require("./config/database");
const User =  require("./model/user")


app.get("/signup" ,async (req,res,next)=>{
     const userObj = {
        firstName : "Akshat",
        lastName : "yadav",
        email : "ak@gmail.com",
        password:"ak@gmail.com"
     }

     const user  = new User(userObj);
    try
    {
    await user.save();
       res.send("user created successfully");
    }catch(err){
       res.status(400).send("something went wrong" +err.message);    }
})

app.post("/" ,(err,req,res,next)=>{
    if(err)
    {
        res.status(500).send("Something went wrong");
    }
})


connectDb().then(()=>{
    console.log("database is connected successfully");

    app.listen(7777,()=>{
         console.log(`server is listening at the port ${7777}`);
    })
}).catch(err=>{
    console.log("Something went wrong"+err.message);
})

