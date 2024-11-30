const express = require("express");
const  app = express();

//if middleware folder out of src folder then we have to write
// require('../middleware/auth') this reflects root folder
const {adminAuth, userAuth} = require('./middleware/auth')
//this is middle ware
 app.use("/admin" , adminAuth);
 
//if any user route will come first i will go to is userAuth this will check user is authenicated or not
//if not then ww will send status code and this route never go ahed
app.get("/user",  userAuth ,(req,res)=>{
      res.send("user has passed all the authentication")
})
 
app.get("/admin/getAllData" , (req,res)=>{
    res.send("catching all the user data");
})
 
 
 
app.listen(7777,()=>{
    console.log(`server is listening at the port of ${7777}`)
})
