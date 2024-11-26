const express = require("express");
const  app = express();

app.get("/",(req,res)=>{
    res.send("hello from the newly created server")
})

app.listen(7777,()=>{
    console.log(`server is listen at the port of ${7777}`)
})

