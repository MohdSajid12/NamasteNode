const express = require("express");
const  app = express();

app.use("/user",(req,res,next)=>{
    if(req.method=='GET')
    {
        res.send ("hello this is updated version of get")
    } else
    {
        next();
    }
})
 
// this will handle only GET call to /USER
app.get("/user" ,(req,res)=>{
     res.send({firstName : "Namste Nodejs" ,city : "kota"})
})
 
app.use("/user" ,(req,res)=>{
    res.send("data is saved to database successfully");
})
 
app.delete("/user" ,(req,res)=>{
    res.send("data is deleted successfuly");
})
 
//this will match all the HTTP Method API Calls to /test
app.use("/test" ,(req,res)=>{
    res.send("hello from the server");
})
 
 
//because of question mark /ac will work and it will work /abc also  by the use of question mark
//b make optional
 
app.get("/ab?c" ,(req,res)=>{
    res.send("hello from the routing")
})
 
 
 
//WHAT if i will change this ? to + . this means /abc will work
//what will be  means route run on abc and abbbbbbc means you can write b as you want to is should
//match the pattern  but a and c should b in last and b should be presend in middle
//b+ means you can add b  as many you want to add
 
app.get("/ab+c" ,(req,res)=>{
    res.send("hello from the routing plus")
})
 
 
//This will work for /abcd
//this star means if you write /ab and you write anything and in the last /cd = /ab+anything+cd
//this will work
//you have to make sure route should be start with ab and star means anything and in the end should be cd
//if you remove th cd in the last this will not work because this will mismatch the pattern
 
 
app.get("/ab*cd" ,(req,res)=>{
    res.send("hello from the routing star")
})
app.get("/ab*cd" ,(req,res)=>{
    res.send("hello from the routing star")
})

 
 
//this will work for abcd , /a(bc)?d this means bc will be optional if you write acd this will not work
//because this will break the pattern
app.get("/a(bc)?d" ,(req,res)=>{
    res.send("hello from the routing optional")
})
 
//this is the regex
//if any of a contain in the path it will work ifi will write /b this will not work
//if i write /cab this will work because this coantains a
//akhadjh this will work also because a contains in the route
app.get(/a/ ,(req,res)=>{
    res.send("hello from the Regex")
})
 
 
// http://localhost:7777/user?userId=7&busiessId =34
//by this we can send user id and or something we want to  send by to use of &;
//and in console.log(req.query); everything will be printed
//but this is doing manually how to make route dynamic
app.get("/user" ,(req,res)=>{
    console.log(req.query);
    res.send("connectec successfully");
})
 
 
//Dynamic route that can handle evry query paramenter
//but in this e have to  use req.params
//COLONS MEANS IT IS A DYNAMIC ROUTE
//http://localhost:7777/user/444
app.get("/user/:userId" ,(req,res)=>{
    console.log(req.params);
    res.send("connectec successfully");
})
 
//BUT ABOve code is one dynamic we can add more things like
// http://localhost:7777/user/444/123456
app.get("/user/:name/:userId/:password" ,(req,res)=>{
    console.log(req.params);
     console.log(req.params.name);  //if you want to extract only one thing in the route
    res.send("connectec successfully");
})

app.listen(7777,()=>{
    console.log(`server is listen at the port of ${7777}`)
})

