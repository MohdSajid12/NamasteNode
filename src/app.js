const express = require("express");
const  app = express();
const connectDb = require("./config/database");
const User =  require("./model/user");
const {validateSignupData ,validateLoginData} =  require("./utils/validation");
const bcrypt = require("bcrypt");
 
app.use(express.json());
 
app.post("/signup" ,async (req,res,next)=>{
//NEVER trust the req.body we should always do validation of data
//if the data is not correc throw an error data should be validated all data should be present
//then we have to encrypt the password
//USE utils/validate.js file all validation should be in this file
 
//the salt should be applied to create the password the more number of salt round the tougher to password
//to decrypt
 
//PROCESS OF ENCRYPTION OF PASSWORD - suppose your password is akshay@123 now you want to encrypt the akshay
//now you need a salt and salt is a random string (eg-kdadsagg#^53765) now you will take the password and
//the salt and you do a multiple round of salt encryption 10 rounds is good enough to make a strong password
 
     try{
        //use it in try if req fails catch will catch it and send them error
        validateSignupData(req);    //good way of writing now my code is clean
        const {firstName,lastName,email,password} = req.body;
        const hashedPassword =  await bcrypt.hash(password , 10);
       
        //creating a new instance of the ser
        const user = new User({
            firstName ,
            lastName,
            email,
            password :hashedPassword
        });  
        //if we enter extra field like age or something else it will ignore and allowe only this fields
        //i have written
 
        await user.save();  
        res.send("user created successfully");
     } catch(err){
        res.status(400).send("ERROR : " + err.message);
     }
})
 
 
//Login-API
app.post("/login",async (req,res)=>{
 
   try{
       validateLoginData(req);
      const {email ,password} =  req.body;
   
      //this findOne will return the only one object
     const user = await User.findOne({email : email});
 
     if(!user)
     {
        //this message will good if we show user not found or email is not present
        //this is kind of data leaking this is the bad habit attackers should not know thar this email
        //is present or not
        //no body should know that this email is present or not
        throw new Error("Invalid Credentails");
     }
  //in bcrypt.compare first para should be user password and second the database password
      const isPasswordValid = await bcrypt.compare (password ,user.password);
 
      if(isPasswordValid)
      {
        res.send("login successfull");
      }
      else
      {
        res.send("Invalid Credentails");
      }
 
   }catch(err){
      res.status(400).send("ERROR : " +err.message);
   }
 
})
 
 

//will get All the data from the database first of know which model you have to use
//if you want to get user data you have to use in user data means user model
//model means user table
 
//find by email
app.get("/user" ,async(req,res)=>{
      const userEmail =  req.body.email;    
      try{
        const users = await  User.find({email :userEmail});
       
        if(users.length == 0)
        {
            res.status(404).send("user not found");
        } else
        {
            res.send(users);
        }
      }catch(err){
        res.status(404).send("user not find");
      }
})
 
//GET all the users
app.get("/getalluser" , async (req,res)=>{    
      try
      {
        const users = await User.find({});
        res.send(users);
      } catch(err){
        res.status(400).send("something went wrong");
      }
 
})
 
//if we have same email ,name user this will return only one oldest one
//if same docuemnt(data) it will return always one
app.get("/getOneUserData",async (req,res)=>{  
    const email = req.body.email
    try
    {
        const users= await User.findOne({email:email});
        if(!users)
        {
            res.status(404).send("user not found");
        } else
        {
            res.send(users);
        }
    } catch(err){
        res.status(404).status("users not found")
    }
})
 
 
app.get("/findbyId" ,async(req,res)=>{
    const id = req.body.userId;
    try
    {
        const users = await User.findById(id);
        if(!users)
        {
            res.status(404).send("user not found");
        } else
        {
            res.send(users);
        }
    } catch(err){
        res.send(400).send("something went wrong");
    }
})
 
 
app.delete("/findbyIdAndDelete",async(req,res)=>{
    const userId = req.body.id;
    try
    {
        // both will work
        const user = await User.findByIdAndDelete(userId);
        // await User.findByIdAndDelete({_id : userId});
        res.send("deleted successfully");
    } catch(err){
        res.send("something went wrong");
    }
})
 
//Update-Api - update the data of the user
//in the update  api if you are passing some extra innfromation or some extra line
//which is not present in the document like skills cloumn not present in your database
//and you are passing if not present in the  schema it will not not in the docuemnt
//it will ignore it
 
app.patch("/findAndUpdate" ,async (req,res)=>{
    const id = req.body.id;
    const data = req.body;
    try{
        await User.findByIdAndUpdate({_id:id},data);
        res.send("User updated successfully");
    } catch(err){
       res.status(400).send("Something went wrong"+ err.message);
    }
 
    //{returnDocument:"before"} is option parameter ka mtlb h ki update krne se phle
    //jo old data h use retrun krta h agr isme after lga denge to update ke bad ka data
    //return krega
    //{runValidators:true} this will allow to run validate function that we have defined
    //in the our schema if we will not add then by default validate function should run
    //when we will create  new user not for updating user
 
   
    // try{
    //     const user =await User.findByIdAndUpdate({_id:id},data ,{returnDocument:"before"},
      //            runValidators:true);
    //     console.log(user);
    //     res.send("User updated successfully");
    // } catch(err){
    //    res.status(400).send("Something went wrong");
    // }
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